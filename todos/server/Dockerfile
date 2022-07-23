FROM mhart/alpine-node:16
WORKDIR /srv
COPY ./package.json /srv/package.json
COPY ./yarn.lock /srv/yarn.lock

COPY . .

ENTRYPOINT [ "yarn" ]
CMD [ "start" ]