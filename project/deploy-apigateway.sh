#!/bin/bash

set -euo pipefail

# ==========================================
# Configuration
# ==========================================
AWS_ACCOUNT_ID="209466560852"
AWS_REGION="us-east-1"
CLUSTER_NAME="my-qr-payment-system-fargate"

SUBNETS="subnet-0fcc91bc7f44017ff,subnet-04762276b2062a4df"
SECURITY_GROUP="sg-0ab1500039f365dd8"

# ==========================================
# Function: Create or Update ECS Service
# ==========================================
update_or_create_service() {
  local service_name="$1"
  local assign_public_ip="$2"

  echo "→ Checking if service '$service_name' exists..."

  SERVICE_EXISTS=$(aws ecs describe-services \
    --cluster "$CLUSTER_NAME" \
    --services "$service_name" \
    --region "$AWS_REGION" \
    --query "services[?status=='ACTIVE'].serviceName" \
    --output text || true)

  NETWORK_CONFIG="awsvpcConfiguration={subnets=[$SUBNETS],securityGroups=[$SECURITY_GROUP],assignPublicIp=$assign_public_ip}"

  if [[ -z "$SERVICE_EXISTS" ]]; then
    echo "→ Creating service '$service_name'..."
    aws ecs create-service \
      --cluster "$CLUSTER_NAME" \
      --service-name "$service_name" \
      --task-definition "$service_name" \
      --desired-count 1 \
      --launch-type FARGATE \
      --network-configuration "$NETWORK_CONFIG" \
      --region "$AWS_REGION" \
      --enable-execute-command
  else
    echo "→ Updating service '$service_name'..."
    aws ecs update-service \
      --cluster "$CLUSTER_NAME" \
      --service "$service_name" \
      --task-definition "$service_name" \
      --force-new-deployment \
      --region "$AWS_REGION" > /dev/null
  fi
}

# ==========================================
# Function: Get ECS Task IP
# ==========================================
get_service_ip() {
  local service_name="$1"

  echo "→ Fetching IP for '$service_name'..."

  TASK_ARN=$(aws ecs list-tasks \
    --cluster "$CLUSTER_NAME" \
    --service-name "$service_name" \
    --region "$AWS_REGION" \
    --query 'taskArns[0]' \
    --output text 2>/dev/null || true)

  if [[ -n "$TASK_ARN" && "$TASK_ARN" != "None" ]]; then
    ENI_ID=$(aws ecs describe-tasks \
      --cluster "$CLUSTER_NAME" \
      --tasks "$TASK_ARN" \
      --region "$AWS_REGION" \
      --query 'tasks[0].attachments[0].details[?name==`networkInterfaceId`].value' \
      --output text)

    PRIVATE_IP=$(aws ec2 describe-network-interfaces \
      --network-interface-ids "$ENI_ID" \
      --region "$AWS_REGION" \
      --query 'NetworkInterfaces[0].PrivateIpAddress' \
      --output text)

    PUBLIC_IP=$(aws ec2 describe-network-interfaces \
      --network-interface-ids "$ENI_ID" \
      --region "$AWS_REGION" \
      --query 'NetworkInterfaces[0].Association.PublicIp' \
      --output text 2>/dev/null || true)

    echo "  Private IP: ${PRIVATE_IP:-N/A}"
    if [[ -n "$PUBLIC_IP" && "$PUBLIC_IP" != "None" ]]; then
      echo "  Public IP: $PUBLIC_IP"
    fi
  else
    echo "  Status: Not running yet"
  fi
}

# ==========================================
# Deployment Steps
# ==========================================
echo "=========================================="
echo "Step 1: Deploying MySQL Database"
echo "=========================================="
update_or_create_service "mysql-db-init" "DISABLED"

echo ""
echo "⏳ Waiting for MySQL to be ready (60 seconds)..."
sleep 60

echo ""
echo "=========================================="
echo "Step 2: Deploying Backend Services"
echo "=========================================="
update_or_create_service "auth-service" "DISABLED"
update_or_create_service "wallet-service" "DISABLED"

echo ""
echo "⏳ Waiting for backend services to start (30 seconds)..."
sleep 30

echo ""
echo "=========================================="
echo "Step 3: Deploying API Gateway"
echo "=========================================="
update_or_create_service "api-gateway" "ENABLED"

echo ""
echo "⏳ Waiting for API Gateway to stabilize (20 seconds)..."
sleep 20

# ==========================================
# Display IPs
# ==========================================
echo ""
echo "=========================================="
echo "Fetching Service Information"
echo "=========================================="

echo ""
echo "MySQL Database:"
get_service_ip "mysql-db-init"

echo ""
echo "Auth Service:"
get_service_ip "auth-service"

echo ""
echo "Wallet Service:"
get_service_ip "wallet-service"

echo ""
echo "API Gateway:"
TASK_ARN=$(aws ecs list-tasks \
  --cluster "$CLUSTER_NAME" \
  --service-name "api-gateway" \
  --region "$AWS_REGION" \
  --query 'taskArns[0]' \
  --output text 2>/dev/null || true)

if [[ -n "$TASK_ARN" && "$TASK_ARN" != "None" ]]; then
  ENI_ID=$(aws ecs describe-tasks \
    --cluster "$CLUSTER_NAME" \
    --tasks "$TASK_ARN" \
    --region "$AWS_REGION" \
    --query 'tasks[0].attachments[0].details[?name==`networkInterfaceId`].value' \
    --output text)

  PRIVATE_IP=$(aws ec2 describe-network-interfaces \
    --network-interface-ids "$ENI_ID" \
    --region "$AWS_REGION" \
    --query 'NetworkInterfaces[0].PrivateIpAddress' \
    --output text)

  PUBLIC_IP=$(aws ec2 describe-network-interfaces \
    --network-interface-ids "$ENI_ID" \
    --region "$AWS_REGION" \
    --query 'NetworkInterfaces[0].Association.PublicIp' \
    --output text)

  echo "  Private IP: $PRIVATE_IP"
  echo "  Public IP: $PUBLIC_IP"
  echo ""
  echo "============================================"
  echo "✅ Deployment Complete!"
  echo "============================================"
  echo ""
  echo "Access your API at: http://$PUBLIC_IP:8080"
  echo ""
  echo "Frontend Configuration:"
  echo "const API_BASE_URL = 'http://$PUBLIC_IP:8080';"
  echo "============================================"
else
  echo "  Status: Not running yet"
  echo ""
  echo "Check deployment status with:"
  echo "aws ecs describe-services --cluster \"$CLUSTER_NAME\" --services api-gateway auth-service wallet-service mysql-db-init --region \"$AWS_REGION\""
fi
