FROM node:18
WORKDIR /discord
COPY server/package.json server/package-lock.json
COPY server .
ENTRYPOINT npm run server