FROM node:12-alpine
MAINTAINER JeongHyeon Kim <jeonghyeon.rhea@gmail.com>
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install
RUN npm install typescript -g
RUN npm run coverage
EXPOSE 8080
CMD ["node", "dist/main.js"]
