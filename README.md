# Proyecto de nodejs
se instala con npm init -y


# Nodemon
npm i -E -D nodemon

--Este se instala para la ejeccucion de node en cada cambio realizado en el archivo app.js

# Express
npm i -E express

- Este se usa para el enrrutado, los endpionds de la aplicacion y para crear el servidor 

// https://expressjs.com/es/4x/api.html#express

# Dotenv
```
npm i -E -D dotenv
```

- Este es el que me permite manejar las variables de entorno
las colco de forma local usando la funcion config()

```javascript
import dotenv from 'dotenv';
dotenv.config();
```

luego ya puedes acceder a las variables de entorno asi: 
```javascript
let config = JSON.parse(process.env.MY_CONNECT);
```

- https://github.com/motdotla/dotenv

# Mongodb
```
npm i -E -D mongodb
```
- https://github.com/mongo-express/mongo-express

- Este es una interfas para hacer la conexion a la base de datos de mongodb.

// 

# Rutas creadas

### Rutas para la tabla bodegas 

###### Ruta 1 
- Method = GET
http://127.121.12.6:9102/Bodegas/orden

- Lista las bodegas en orden alfabetico

###### Ruta 2
- Method = POST
http://127.121.12.6:9102/bodegas/insertar

- Me inserta una nueba bodega 
- Ejemplo de data a enviar
```json
{
    "id_bodega":1,
    "nombre":"Jhon",
    "id_responsable":1,
    "estado":1
}
```


### Rutas para la tabla productos


###### Ruta 1
- Method = GET
http://127.1.1.1:5312/Productos/cantidad

- Esta ruta me lista la cantidad de producto en cada bodega de forma desendiente



###### Ruta 2
- Method = POST
http://127.1.1.1:5312/Productos/insertar

- Esta ruta me inserta un dato en productos y asu vez asigna una cantidad por defecto en una bodega

- Ejemplo de data:
```json
{
    "id":1,
    "nombre":"peperoni",
    "descripcion":"El mejor peperoni",
    "estado":1,
}-
```


### Rutas para la tabla inventarios 
###### Ruta 1
- Esta ruta me permite pasar o transladar productos de una bodega a otra 
- Ejemplo de data  a enviar

```json
{
    "id_bodega_origen":1,
    "id_bodega_destino":2,
    "id_producto":1,
    "cantidad":1
}
```
- Method: PUT
http://127.121.12.6:9102/Productos/transladar


###### Ruta 2
- Method = POST
http://127.1.1.1:5312/Inventarios/insertar

- Esta ruta me permite insertar un producto a una bodega
- Ejemplo de data
```json
{
    "id_producto":1,
    "id_bodega":1,
    "cantidad":1
}
```

#### Instalamos la libreria para manejar DTO y Configuramos nuestro entorno de desarrollo

``` 
npm init -y
```

<Permite convertir objetos JavaScript/TypeScript en estructuras de datos JSON y viceversa>
npm i -E -D class-transformer

<Una dependencia requerida por class-transformer. Proporciona la capacidad de utilizar metadatos de decoradores en tiempo de ejecución en TypeScript>
npm i -E -D reflect-metadata

<Es un lenguaje de programación basado en JavaScript que agrega características de tipo estático a JavaScript>
npm i -E -D typescript

<Esta libreria es para ejecutar los cambios en el servidor en tiempo real>
npm i -E -D nodemon  

- Como debe estar el package.json
```json
  "scripts": {
    "dev":"nodemon ./app",
    "tsc": "tsc -w"
  },
```
- Creamos el archivo tscongig.json y colocamos lo siguiente
```json
{
    "compilerOptions": {
        "target": "es6", 
        "module": "ES6", 
        "moduleResolution": "node",
        "outDir": "./controller", 
        "esModuleInterop": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```
##### luego hacemos validos los cambios de la siguientre manera
- Agregamos esta linea en el archico package.json
    ```
    "tsc": "tsc -w"
    ```
    - Quedando el archivo asi
y despues tenemos el comando tsc __nombredelArchivo