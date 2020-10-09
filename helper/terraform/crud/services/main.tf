variable "access_key" {
    type = string
}
variable "secret_key" {
    type = string
}
variable "region" {
    type = string
}

provider "aws" {
    access_key = var.access_key
    secret_key = var.secret_key
    region = var.region
}

module "aws_network" {
    source = $TERRAFORM_HOME/modules/aws/network
}