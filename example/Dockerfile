FROM node:alpine

WORKDIR /app

COPY package.json package.json
RUN npm i

COPY tsconfig.json tsconfig.json
COPY src src
COPY public public

EXPOSE 8080

CMD npm start