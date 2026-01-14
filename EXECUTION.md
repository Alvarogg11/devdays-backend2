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
```
También podemos simplemente descargar el zip para seguidamente descomprimirlo y usarlo en el IDE preferido.  
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
