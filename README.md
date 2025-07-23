GitHub Repo 
https://github.com/mohamed5adel/hello-eyego
Deploy URL
http://k8s-default-eyegoing-6bbed183fa-1616173608.eu-north-1.elb.amazonaws.com/
# 👁 hello-eyego  A simple Node.js Express app deployed with Docker to AWS Elastic Container Registry (ECR) and then deployed to a Kubernetes cluster using GitHub Actions (CI/CD). 

 ---  ## 📦 Tech Stack  - 🟩 Node.js + Express   - 🐳 Docker   - ☁ AWS ECR   - ☸ Kubernetes (EKS or local)   - 🔁 GitHub Actions    ---  ## 📁 Folder Structure  
hello-eyego/ ├── index.js ├── package.json ├── Dockerfile ├── deployment.yaml └── .github/ └── workflows/ └── ci.yaml
---  ## 🚀 How to Run Locally  ```bash git clone https://github.com/mohamed5adel/hello-eyego.git cd hello-eyego npm install node index.js
Then open your browser at: http://localhost:3000 http://localhost:3000/api/greet

🐳 Run with Docker

docker build -t hello-eyego . docker run -p 3000:3000 hello-eyego 

☁ Push Docker Image to AWS ECR

1. Authenticate with AWS ECR:



aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 351208058482.dkr.ecr.eu-north-1.amazonaws.com 

1. Tag your image:



docker tag hello-eyego:latest 351208058482.dkr.ecr.eu-north-1.amazonaws.com/hello-eyego:latest 

1. Push it:



docker push 351208058482.dkr.ecr.eu-north-1.amazonaws.com/hello-eyego:latest 

☸ Kubernetes Deployment

deployment.yaml

apiVersion: apps/v1 kind: Deployment metadata:   name: hello-eyego spec:   replicas: 2   selector:     matchLabels:       app: hello-eyego   template:     metadata:       labels:         app: hello-eyego     spec:       containers:       - name: hello-eyego         image: 351208058482.dkr.ecr.eu-north-1.amazonaws.com/hello-eyego:latest         imagePullPolicy: IfNotPresent         ports:         - containerPort: 3000 

🔐 GitHub Secrets (CI/CD)

Go to:

Settings → Secrets and variables → Actions → New repository secret

And add the following secrets:

Name

Value

AWS_ACCESS_KEY_ID

your AWS access key

AWS_SECRET_ACCESS_KEY

your AWS secret key

AWS_REGION

eu-north-1

KUBE_CONFIG_DATA
kube config
ECR_REPOSITORY

hello-eyego

CLUSTER_NAME

your-EKS-cluster-name

DEPLOYMENT_NAME

hello-eyego

🔁 GitHub Actions Workflow

.github/workflows/ci.yaml

name: CI/CD Pipeline  on:   push:     branches: [ "main" ]  jobs:   deploy:     runs-on: ubuntu-latest      steps:     - name: Checkout code       uses: actions/checkout@v3      - name: Set up Docker Buildx       uses: docker/setup-buildx-action@v3      - name: Configure AWS credentials       uses: aws-actions/configure-aws-credentials@v2       with:         aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}         aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}         aws-region: ${{ secrets.AWS_REGION }}      - name: Login to Amazon ECR       id: login-ecr       uses: aws-actions/amazon-ecr-login@v1      - name: Build, tag, and push image to ECR       env:         ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}         ECR_REPOSITORY: ${{ secrets.ECR_REPOSITORY }}         IMAGE_TAG: latest       run: |         docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .         docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG      - name: Set up kubectl       uses: azure/setup-kubectl@v3       with:         version: v1.30.0      - name: Update Kubernetes deployment       run: |         kubectl set image deployment/${{ secrets.DEPLOYMENT_NAME }} \         ${{ secrets.DEPLOYMENT_NAME }}=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG 

🧪 API Endpoints

Route

Method

Description

/

GET

Base greeting

/api/greet

GET

Hello Eyego API

👤 Author

GitHub: mohamed5adel



