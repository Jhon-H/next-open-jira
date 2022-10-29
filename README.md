# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```yaml
docker-compose up -d
```

* El -d significa __detached__

* Mongo URL Local:

```bash
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno

Renombrar el archivo __.env.template__ a __.env__

## Llenar la base de datos con informaciópn de pruebas

```http
http://localhost:3000/api/speed
```
