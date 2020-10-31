# ec2-backend

## install
```npm install```

## run 
```npm run start:dev```



## terraform
clone 후 처음 1회만 실행

```git submodule init```

이 후 submodule 레포지토리 업데이트를 따라가려면

```git submodule update --remote```


## deploy

* master branch commit 할 때 docker hub 및 aws에 배포

### AWS ECS Fargate 
* 배포 코드 : https://github.com/KimKiHyuk/terraform-boilerplate/tree/main/terraform/arch/ecs_fargate

### Docker (local)
``` 
docker run --name app -d -p 80:3000 keykim/bob-ec2
```