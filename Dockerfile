FROM node:12.14.1-alpine

ENV WORKDIR=/opt/app

WORKDIR ${WORKDIR}

COPY package.json yarn.lock ${WORKDIR}/

RUN yarn

COPY . .

EXPOSE ${EXTERNAL_PORT}

CMD ["npm", "start"]
