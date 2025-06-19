FROM node:20-alpine
WORKDIR /app
COPY package.json .
COPY tsconfig.json .
COPY ./src ./src
COPY ./prisma ./prisma
RUN npm install
RUN npx prisma generate
RUN npm run build
CMD ["npm", "start"] 