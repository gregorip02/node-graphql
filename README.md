# ¡Hola!

Esta es una nueva aventura de codigo, en esta ocación estoy construyendo
un API GraphQL con Typescript & Mongoose sobre node.js.

## Requerimientos

- Docker
- Docker Compose

## Ejecuta esto

Crea tu archivo de configuración con el siguiente comando.

```sh
# Create .env file
cp .env.example .env
```

Si estas intentando ejecutar esto en tu maquina, crea un archivo llamado
`docker-compose.override.yml` en la raiz de tu proyecto con el siguiente
contenido.

```yml
# docker-compose.override.yml
version: "3.4"

services:
  graphql:
    # Sobre-escribe el comando por defecto en docker-compose.yml
    command: ["npm", "run", "start:dev"]
```

Levanta el entorno.

```bash
# Using docker
docker-compose up --build --remove-orphans -d

# Using yarn
yarn up

# Using npm
npm run up
```

> En entornos de prouducción no es necesario crear `docker-compose.override.yml`
