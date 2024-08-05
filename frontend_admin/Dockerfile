FROM node:20-alpine AS build
RUN mkdir /app
WORKDIR /app
COPY ./ /app
RUN npm install 
EXPOSE 3003

CMD ["npm", "run", "dev"]
