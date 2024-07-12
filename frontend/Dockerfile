# Use the official Node.js image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 5173
CMD ["npm","start"]
