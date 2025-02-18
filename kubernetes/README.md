# How to run this app in a Kubernetes cluster

To start, I'm using Minikube to run this in a desktop environment. So first, run `minikube start --driver=docker` to create the cluster.

Then, build each image (`auth_service/paste_service/new_ui`) with the appropriate name:

```shell
cd ../auth_service
docker build --target production -t auth-service:prod .
```

```shell
cd ../paste_service
docker build --target production -t paste-service:prod .
```

```shell
cd ../new_ui
docker build -t new-ui:prod .
```

After that, apply the deployments and the services one by one:

```shell
kubectl apply -f auth-service-deployment.yaml
kubectl apply -f auth-service-service.yaml
```
