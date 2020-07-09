FROM node:13.12.0-alpine
COPY ./demo-condenser-script.js .
CMD ["node", "demo-condenser-script.js"]