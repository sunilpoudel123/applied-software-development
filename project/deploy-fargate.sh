#!/bin/bash
set -e

AWS_ACCOUNT_ID=209466560852
AWS_REGION=us-east-1
CLUSTER_NAME=my-qr-payment-system-fargate
SERVICES=("auth-service" "wallet-service" "api-gateway" "mysql-db-init")

SUBNETS="subnet-0fcc91bc7f44017ff,subnet-04762276b2062a4df"
SECURITY_GROUP="sg-0ab1500039f365dd8"

# Build images
docker build -t auth-service ./auth-service
docker build -t wallet-service ./wallet-service
docker build -t api-gateway ./qr-cloud-gateway
docker build -t mysql-db-init ./database

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Create repos if not exist
for repo in "${SERVICES[@]}"; do
  aws ecr create-repository --repository-name $repo --region $AWS_REGION 2>/dev/null || echo "$repo exists"
done

# Tag and push images
for repo in "${SERVICES[@]}"; do
  docker tag $repo:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$repo:latest
  docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$repo:latest
done

# Register new ECS task definitions
for service in "${SERVICES[@]}"; do
  echo "Registering ECS task definition for $service..."

  # Set port based on service
  case $service in
    auth-service) PORT=8081 ;;
    wallet-service) PORT=8082 ;;
    api-gateway) PORT=8080 ;;
    mysql-db-init) PORT=3306 ;;
  esac

  aws ecs register-task-definition \
    --family $service \
    --network-mode awsvpc \
    --requires-compatibilities FARGATE \
    --cpu "256" \
    --memory "512" \
    --execution-role-arn arn:aws:iam::$AWS_ACCOUNT_ID:role/ecsTaskExecutionRole \
    --container-definitions "[
      {
        \"name\": \"$service\",
        \"image\": \"$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$service:latest\",
        \"essential\": true,
        \"portMappings\": [
          {
            \"containerPort\": $PORT,
            \"protocol\": \"tcp\"
          }
        ]
      }
    ]" >/dev/null
done

# Update or create ECS services
for service in "${SERVICES[@]}"; do
  echo "Deploying $service to ECS Fargate..."
  SERVICE_EXISTS=$(aws ecs describe-services --cluster $CLUSTER_NAME --services $service --region $AWS_REGION --query "failures[?reason=='MISSING']" --output text)

  if [ -n "$SERVICE_EXISTS" ]; then
    aws ecs create-service \
      --cluster $CLUSTER_NAME \
      --service-name $service \
      --task-definition $service \
      --desired-count 1 \
      --launch-type FARGATE \
      --network-configuration "awsvpcConfiguration={subnets=[$SUBNETS],securityGroups=[$SECURITY_GROUP],assignPublicIp=ENABLED}" \
      --region $AWS_REGION
  else
    aws ecs update-service \
      --cluster $CLUSTER_NAME \
      --service $service \
      --task-definition $service \
      --force-new-deployment \
      --region $AWS_REGION
  fi
done

echo "Deployment complete."