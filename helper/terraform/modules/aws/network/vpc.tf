variable "cidr_block" {
    type = string
}

resource "aws_vpc" "aws_terraform_vpc" {
  cidr_block  = var.cidr_block
}
