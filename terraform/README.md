## 테라폼

배포를 위한 테라폼 폴더


```
➜  ec2-backend$ docker-compose run --rm tf init terraform/arch/crud
➜  ec2-backend$ docker-compose run --rm tf apply -var "<region>" -var "cidr_block=<block>" -var "subnet=<subnet>" -var "access_key=<key>" -var "secret_key=<key>" terraform/arch/<원하는 아키텍처>
➜  ec2-backend$ docker-compose run --rm tf destroy -var "<region>" -var "cidr_block=<block>" -var "subnet=<subnet>" -var "access_key=<key>" -var "secret_key=<key>" terraform/arch/<원하는 아키텍처>
```
