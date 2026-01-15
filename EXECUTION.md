# Documento Execution
Pasos a seguir para ejecutar y probar el correcto funcionamiento del proyecto.  

## Prerrequisitos
Es importante tener descargadas las siguientes herramientas para poder probar cómodamente este proyecto:  
* Su IDE de preferencia (recomendablemente Visual Studio Code).
* Docker Desktop.
* Postman.
* Node.js
* Git.
* MongoDB Compass.

## Uso del repositorio en local
Para poder usar este proyecto en local, clonaremos el repositorio usando el comando de bash:
```bash
git clone https://github.com/Alvarogg11/devdays-backend2.git
git clone https://github.com/Alvarogg11/devdayfront.git    
```
También podemos simplemente descargar el zip para seguidamente descomprimirlo y usarlo en el IDE preferido.  
*Cabe destacar que el trabajo principal del proyecto ha sido desarrollado en el proyecto de backend, por lo que el frontend no tiene gran contenido más que lo explicado en la clase del 22 de Diciembre de 2025.*
## Instalación de dependencias
Una vez dentro del proyecto, instalaremos las dependencias con el siguiente comando:  
```bash
npm install
```
## Docker y MongoDB
Los siguientes comandos esenciales para poder probar libremente el proyecto.  
Ambos son para trabajar con MongoDB y su respectivo contenedor de Docker, siendo el primero para crear dicha instancia y el segundo para eliminarla por completo, en caso de error o que simplemente quiera eliminar los datos guardados en la base de datos. 
```bash
docker run --name mongodb -d -p 27017:27017 -v mongodb_data:/data/db mongo  

docker stop mongodb && docker rm mongodb && docker volume rm mongodb_data
```
## Postman y pruebas del proyecto
En el repositorio de backend podrá encontrar el archivo ['pruebas.json'](pruebas.json) para importar en la herramienta de postman y probar algunas de las pruebas que se han creado a lo largo del desarrollo del proyecto.  
Una vez importadas deberá usar el siguiente comando antes de intentar probarlas para desplegar el proyecto:
```bash
npm run dev
```
*Tenga en cuenta que para probar estas pruebas el contenedor de Docker debe estar activo para que MongoDB pueda guardar los datos satisfactoriamente usando el comando anteriormente mencionado.*  
Podrá también crear nuevas pruebas ajustadas a su gusto usando las rutas especificadas en la carpeta ['routes'](src/routes/).  
Véase el archivo ['DELIVERABLES.md'](DELIVERABLES.md) para aprender sobre el uso de los parámetros de límite y paginación en las entidades Issues y Commits junto con sus limitaciones.   
(La entidad Issues es mucho más completa que Commits, en caso de que encuentre incongruencias o errores en una y no en otra)