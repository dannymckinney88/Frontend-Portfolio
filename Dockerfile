FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npx playwright install chromium
RUN npx playwright install-deps chromium

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]