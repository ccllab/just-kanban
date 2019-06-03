# just-kanban

## Using Docker deploy development environment

### clone this project

```sh
git clone https://github.com/shengLin-alex/just-kanban.git
```

### Create .env file

```sh
$ cd just-kanban
$ touch .env
```

#### project .env file example

```
PORT=8080
NODE_ENV=development
SECRET_KEY=9913c4d1-5d90-4ccc-87e9-706cf709ba0bn
ENCRYPTED_KEY=3445768f48481eeb9c8304ce0b48481eeb9c8304ce0a5e3cb5e3cb58479fff32
COOKIE_SECRET=VIuctNka6U6KtIhTBCmUlQ==
LONG_EXPIRATION=604800
NORMAL_EXPIRATION=86400
TOKEN_LIFE_USING_REFRESH=300
DB_TYPE=mongodb
DB_HOST=localhost
DB_PORT=27017
DB_DATABASE=nodeapp
```

#### docker .env file example
```sh
$ cd docker-config
$ touch .env
```

```
APP_HOST_PORT=8080
MONGODB_PORT=27017
MONGODB_HOST_DIR=/path/to/your/host/computer/persistent/data/folder
```

### running

```sh
$ docker-compose up mongodb-docker
$ cd ..
$ npm install
$ npm run build-dev
$ npm run start
$ npm run dev
```

The server running on 8080 port, and vue running on 8081 port
