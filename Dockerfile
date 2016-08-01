FROM node:6-onbuild

COPY . /app
WORKDIR /app

RUN npm install

# ENV vars
ENV PORT=4001
ENV DEBUG=*

EXPOSE 4001
#ENTRYPOINT ["node"]
#CMD ["index.js"]


