FROM node:6-onbuild

COPY . /app
WORKDIR /app

RUN npm install

# ENV vars
ENV PORT=5000
ENV DEBUG=*

EXPOSE 5000
#ENTRYPOINT ["node"]
#CMD ["index.js"]


