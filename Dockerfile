FROM alpine:3.10

ENV TERRAFORM_VERSION=0.13.4

LABEL maintainer "keyhyuk.kim@gmail.com"

SHELL ["/bin/sh", "-c"]
USER root
WORKDIR /ec2_backend

COPY . .


RUN apk update && \
    apk add git && \
    apk add npm && \
    apk add curl jq python bash ca-certificates git openssl unzip wget && \
    cd /tmp && \
    wget https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip && \
    unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip -d /usr/bin && \
    wget https://dl.google.com/dl/cloudsdk/channels/rapid/google-cloud-sdk.zip -O /tmp/google-cloud-sdk.zip && \
    cd /usr/local && unzip /tmp/google-cloud-sdk.zip && \
    google-cloud-sdk/install.sh --usage-reporting=false --path-update=true --bash-completion=true && \
    google-cloud-sdk/bin/gcloud config set --installation component_manager/disable_update_check true && \
    rm -rf /tmp/* && \
    rm -rf /var/cache/apk/* && \
    rm -rf /var/tmp/*

ENV PATH = $PATH:/usr/local/google-cloud-sdk/bin/

RUN npm install && \
    git submodule init && \
    git submodule update --remote

ENV SRC /ec2_backend/terraform-boilerplate

CMD ["npm", "run", "start:dev", "2>/dev/null"]


