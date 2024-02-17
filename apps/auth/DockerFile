FROM node:alpine As development

# Thiết lập thư mục làm việc trong container là /usr/src/app.
WORKDIR /usr/src/app

#  Sao chép các tệp package.json và pnpm-lock.yaml vào thư mục làm việc trong container.
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

# install root package.json
RUN pnpm install
# Sao chép file cần thiết trong thư mục hiện tại của dự án vào thư mục làm việc trong container.
COPY apps/auth apps/auth
COPY libs libs

# install service package.json
RUN cd apps/auth && pnpm install

RUN pnpm run build auth



FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm 

# --prod only dependencies not  devdependencies
RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/auth/main" ]