FROM node:20.11.1

WORKDIR /usr/app

RUN npm i

# Application
ENV PORT=80

# URLS
ENV FILE_NAMES_URL=https://challenges.coode.sh/food/data/json/index.txt
ENV FILE_CONTENT_URL=https://challenges.coode.sh/food/data/json

#DATABASE
ENV MONGO_HOST=mongodb+srv://cluster0.sr0v3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&authSource=admin
ENV MONGO_DB_NAME=TesteCron
ENV MONGO_USER=admin
ENV MONGO_PASSWORD=FbzM1IlZufKF0Ron

COPY . .

EXPOSE 80

CMD ["npm", "start"]