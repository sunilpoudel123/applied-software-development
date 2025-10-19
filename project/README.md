Step 1: Build Docker images
bash# Build each service image
docker build -t auth-service:latest ./auth-service
docker build -t wallet-service:latest ./wallet-service
docker build -t api-gateway:latest ./qr-cloud-gateway
Step 2: Make images available to Kubernetes
If you're using Docker Desktop with Kubernetes or Minikube:
bash# For Docker Desktop - images are already available
# For Minikube, load images:
minikube image load auth-service:latest
minikube image load wallet-service:latest
minikube image load api-gateway:latest
Step 3: Apply Kubernetes manifests
bash# Apply init scripts ConfigMap first
kubectl apply -f init-scripts-configmap.yaml

# Apply MySQL deployment
kubectl apply -f mysql-deployment.yaml

# Wait for MySQL to be ready (check logs)
kubectl logs -n microservices -l app=mysql-db -f

# Apply microservices
kubectl apply -f microservices-deployment.yaml
Step 4: Verify deployments
bash# Check all resources
kubectl get all -n microservices

# Check pod status
kubectl get pods -n microservices -w

# Check logs
kubectl logs -n microservices -l app=auth-service -f
kubectl logs -n microservices -l app=wallet-service -f
kubectl logs -n microservices -l app=api-gateway -f
Step 5: Test the deployment
bash# Port forward to access API Gateway
kubectl port-forward -n microservices svc/api-gateway 8080:8080 &

# Test the gateway
curl http://localhost:8080/health

# Access auth-service
curl http://localhost:8080/auth/...

# Check MySQL data
kubectl exec -it -n microservices mysql-db-<pod-id> -- mysql -u walletuser -pwalletpass -e "USE auth_db; SELECT * FROM roles;"
Step 6: Get the external IP (if using LoadBalancer)
bashkubectl get svc -n microservices api-gateway
# Note the EXTERNAL-IP (may show "pending" on local clusters, use port-forward instead)
``