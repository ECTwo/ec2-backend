resource "aws_security_group" "my_app" {
  vpc_id      = ${aws_vpc.aws_terraform_vpc.id}
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

