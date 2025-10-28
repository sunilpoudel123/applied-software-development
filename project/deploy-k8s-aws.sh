#!/bin/bash
set -e

# Configuration
export AWS_ACCOUNT_ID=209466560852
export AWS_REGION=us-east-1
export NAMESPACE=microservices
export CLUSTER_NAME=my-qr-payment-system

echo "=== Step 1: Building Docker images ==="
docker build --platform linux/amd64 -t auth-service:latest ./auth-service
docker build --platform linux/amd64 -t wallet-service:latest ./wallet-service
docker build --platform linux/amd64 -t api-gateway:latest ./qr-cloud-gateway


echo "=== Step 2: Create ECR repositories (if not exist) ==="

for repo in auth-service wallet-service api-gateway; do
  echo "Checking $repo..."
  if ! aws ecr describe-repositories --repository-names "$repo" --region "$AWS_REGION" >/dev/null 2>&1; then
    echo "Creating repository: $repo"
    aws ecr create-repository --repository-name "$repo" --region "$AWS_REGION" >/dev/null
  else
    echo "Repository $repo already exists."
  fi
done

echo "All repositories verified or created."


echo "=== Step 3: Authenticate Docker to ECR ==="
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

echo "=== Step 4: Tag and Push images to ECR ==="
for service in auth-service wallet-service api-gateway; do
  echo "Processing $service..."
  docker tag $service:latest ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/$service:latest
  docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/$service:latest
done

echo "=== Step 5: Update kubeconfig for EKS ==="
aws eks update-kubeconfig --region $AWS_REGION --name $CLUSTER_NAME

echo "=== Step 6: Create namespace ==="
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

echo "=== Step 7: Applying Kubernetes manifests ==="
echo "Applying ConfigMap..."
kubectl apply -n $NAMESPACE -f init-scripts-configmap.yaml

echo "Applying MySQL Deployment..."
kubectl apply -n $NAMESPACE -f mysql-deployment.yaml

echo "Waiting for MySQL pod to be ready..."
kubectl wait --for=condition=Ready pod -l app=mysql-db -n $NAMESPACE --timeout=180s || echo "MySQL still starting..."

echo "Applying Microservices Deployments..."
kubectl apply -n $NAMESPACE -f microservices-deployment.yaml

echo "=== Step 8: Verifying Deployments ==="
kubectl get all -n $NAMESPACE

echo "Waiting for pods to be ready (this may take 2-3 minutes)..."
kubectl wait --for=condition=Ready pods --all -n $NAMESPACE --timeout=300s || echo "Some pods may still be starting..."

echo "=== Step 9: Checking Pod Status ==="
kubectl get pods -n $NAMESPACE -o wide

echo "=== Step 10: Checking Logs ==="
echo "Auth Service logs:"
kubectl logs -n $NAMESPACE -l app=auth-service --tail=20 || echo "auth-service logs not available yet"
echo ""
echo "Wallet Service logs:"
kubectl logs -n $NAMESPACE -l app=wallet-service --tail=20 || echo "wallet-service logs not available yet"
echo ""
echo "API Gateway logs:"
kubectl logs -n $NAMESPACE -l app=api-gateway --tail=20 || echo "api-gateway logs not available yet"

echo "=== Step 11: Get LoadBalancer URL ==="
echo "Waiting for LoadBalancer to be provisioned..."
sleep 30
kubectl get svc -n $NAMESPACE api-gateway

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "To get the LoadBalancer URL:"
echo "  kubectl get svc -n $NAMESPACE api-gateway -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'"
echo ""
echo "To test the API:"
echo "  export LB_URL=\$(kubectl get svc -n $NAMESPACE api-gateway -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')"
echo "  curl http://\$LB_URL:8080/actuator/health"
echo ""
echo "To view logs:"
echo "  kubectl logs -n $NAMESPACE -l app=api-gateway -f"
echo ""
echo "To access via port-forward (alternative):"
echo "  kubectl port-forward -n $NAMESPACE svc/api-gateway 8080:8080"