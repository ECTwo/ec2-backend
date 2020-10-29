FROM alpine
LABEL maintainer "keyhyuk.kim@gmail.com"

SHELL ["/bin/sh", "-c"]
USER root
WORKDIR /ec2_backend
COPY . .

EXPOSE 80 443

RUN apk update && \
    apk add git && \
    apk add npm && \
    apk add terraform
RUN npm install
CMD ["npm", "run", "start:dev", "2>/dev/null"]


