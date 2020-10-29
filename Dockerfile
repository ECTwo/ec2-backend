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
RUN terraform --version
RUN npm install
RUN echo "run server listening 3000"
CMD ["npm", "run", "start:dev", "2>/dev/null"]


