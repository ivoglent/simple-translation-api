FROM node:latest

WORKDIR /app
ADD . /app
COPY ./dockers/nodejs/Start.sh /bin/start
RUN chmod +x /bin/start
RUN npm i -g typescript
CMD ["/bin/start"]



