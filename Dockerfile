FROM node:20-alpine

WORKDIR /usr/app
COPY ./ /usr/app/

COPY package.json /usr/app/
RUN npm install --legacy-peer-deps
COPY . /usr/app

RUN npm run build

CMD ["npm", "run", "start"]
