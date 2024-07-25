FROM node:20-alpine AS build
RUN mkdir /proxy
WORKDIR /proxy
COPY ./ /proxy
RUN npm install 
EXPOSE 3002

CMD ["node", "/proxy/server.js"]
