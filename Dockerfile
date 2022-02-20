FROM node:12-alpine
MAINTAINER JeongHyeon Kim <jeonghyeon.rhea@gmail.com>
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install
RUN npm install typescript -g
RUN tsc
EXPOSE 8080
CMD ["node", "dist"]
