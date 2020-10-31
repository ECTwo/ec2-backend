FROM alpine
LABEL maintainer "keyhyuk.kim@gmail.com"

SHELL ["/bin/sh", "-c"]
USER root
WORKDIR /ec2_backend
COPY . .

RUN apk update && \
    apk add git && \
    apk add npm && \
    apk add terraform
RUN npm install
CMD ["npm", "run", "start:dev", "2>/dev/null"]


