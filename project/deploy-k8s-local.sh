#!/bin/bash
set -e

NAMESPACE="microservices"

echo "=== Step 1: Building Docker images ==="
docker build -t auth-service:latest ./auth-service
docker build -t wallet-service:latest ./wallet-service
docker build -t api-gateway:latest ./qr-cloud-gateway

echo "=== Step 2: Loading images to Kubernetes (if Minikube) ==="
if command -v minikube &> /dev/null; then
  echo "Detected Minikube, loading images..."
  minikube image load auth-service:latest
  minikube image load wallet-service:latest
  minikube image load api-gateway:latest
else
  echo "Docker Desktop detected, skipping image load."
fi

echo "=== Step 3: Applying Kubernetes manifests ==="
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

echo "Applying ConfigMap..."
kubectl apply -n $NAMESPACE -f init-scripts-configmap.yaml

echo "Applying MySQL Deployment..."
kubectl apply -n $NAMESPACE -f mysql-deployment.yaml

echo "Waiting for MySQL pod to start..."
sleep 10
kubectl get pods -n $NAMESPACE -l app=mysql-db

echo "Applying Microservices Deployments..."
kubectl apply -n $NAMESPACE -f microservices-deployment.yaml

echo "=== Step 4: Verifying Deployments ==="
kubectl get all -n $NAMESPACE
echo "Waiting for pods to be ready..."
kubectl wait --for=condition=Ready pods --all -n $NAMESPACE --timeout=300s

echo "=== Step 5: Checking Logs ==="
kubectl logs -n $NAMESPACE -l app=auth-service --tail=20
kubectl logs -n $NAMESPACE -l app=wallet-service --tail=20
kubectl logs -n $NAMESPACE -l app=api-gateway --tail=20

echo "=== Step 6: Testing the Deployment ==="
echo "Port-forwarding API Gateway to localhost:8080..."
kubectl port-forward -n $NAMESPACE svc/api-gateway 8080:8080 &

sleep 5
echo "Testing health endpoint..."
curl -s http://localhost:8080/health || echo "Health check failed"

echo "=== Step 7: Checking External IP (if LoadBalancer) ==="
kubectl get svc -n $NAMESPACE api-gateway

echo "=== Deployment complete ==="
