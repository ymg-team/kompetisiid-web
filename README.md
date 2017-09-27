[![Build Status](https://travis-ci.org/idmore/kompetisiid-web.svg?branch=master)](https://travis-ci.org/idmore/kompetisiid-web)

# Kompetisi Indonesia Web
Indonesian Competition Platform

[![ki repo](https://pbs.twimg.com/media/DKtmk3jVwAIXmSt.jpg:large)](https://kompetisi.id)

## Contributing

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

to run build in production version
```
npm run production:build
```

run test (jest supported)
```
npm run test
```

## Staging or Release

### Local

- First build in local using command
    ```
    npm run prod:build
    ```
- Push and Merge to `upstream/master`

### Live (Vultr)

- Pull from master
- unzip and replace `assets.zip` and `dist-server.zip`
- restart pm2 daemon
