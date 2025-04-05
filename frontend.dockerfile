FROM node:20-alpine
WORKDIR /frontend
COPY . .
RUN cp .docker.env .env
RUN npm install
RUN npm ci
