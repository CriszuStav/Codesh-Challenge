FROM node:20.11.1

WORKDIR /usr/app

RUN npm i

# Application
ENV PORT=80

# URLS
ENV FILE_NAMES_URL=https://challenges.coode.sh/food/data/json/index.txt
ENV FILE_CONTENT_URL=https://challenges.coode.sh/food/data/json

#DATABASE
ENV MONGO_HOST=mongodb://mongo:27017
ENV MONGO_DB_NAME=Cron
ENV MONGO_USER=
ENV MONGO_PASSWORD=

COPY . .

EXPOSE 80

CMD ["npm", "start"]