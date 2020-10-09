variable subnet {}
variable cidr_block {}
variable region {}
variable access_key {}
variable secret_key {}

provider "aws" {
  region  = var.region
  access_key = var.access_key
  secret_key = var.secret_key
  version = "~> 2.61.0"
}

resource "aws_vpc" "terraform-vpc" {
  cidr_block  = var.cidr_block
}

resource "aws_subnet" "subnet" {
  vpc_id     = aws_vpc.terraform-vpc.id
  cidr_block = var.subnet
}

resource "aws_security_group" "my_app" {
  vpc_id      = aws_vpc.terraform-vpc.id
  name        = "myapp-security-group"
  description = "hello world!"

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

