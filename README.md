[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

# Kompetisi ID Web

Indonesia Competition Platform [https://kompetisi.id](https://kompetisi.id)

[![ki repo](http://res.cloudinary.com/dhjkktmal/image/upload/v1526045249/kompetisi-id/Frame.png)](https://kompetisi.id)

## Env

Source : https://gitlab.com/ymg-team/config/-/blob/master/kompetisiid-web/.env.example

```
NODE_ENV = development
DEBUG = app:*
API_HOST = http://api-host
MEDIA_HOST = http://media-host
FRONT_HOST = http://localhost:1470
FIREBASE_SERVER_KEY = key
KI_PORT = 1470
```

### Using Docker

**Recuirements**

you have to install :

- docker : https://docs.docker.com/engine/installation/
- docker-compose : https://docs.docker.com/compose/install/

only on first time

```
docker compose build && npm install
```

before development

```
docker compose up
```

### Without Docker (local deveopment)

for first time

```
npm install && npm install -g webpack
```

to run the node server

```
npm run dev:server
```

to run build in developer version

```
npm run build
```

run test (jest supported)

```
npm run test
```

## Staging or Release

- Pull from master
- run
  ```
  yarn prod:build
  ```
- restart pm2 process

## Important Links

- Font Awesome : https://fontawesome.com/icons
