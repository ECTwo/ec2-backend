variable "access_key" {
  type = string
}
variable "secret_key" {
  type = string
}
variable "region" {
  type = string
}
variable "root" {
  type = string
}

variable "subnet" {
  type = string
}

variable "cidr_block" {
  type = string
}

provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}

module "aws_network" {
  source     = "/home/key/repository/ec2-backend/helper/terraform/modules/aws/network"
  cidr_block = var.cidr_block
  subnet     = var.subnet
}