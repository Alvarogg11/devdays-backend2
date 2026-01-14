# Documento deliverables
Entregables resueltos y la explicación de su resolución.

## Entregable Nivel 0 (N0-1)
Proyecto base realizado en la clase del 22 de Diciembre de 2025. Se modificaron los TODO (ahora llamados DONE) para realizar la lógica especificada.   
### Explicación de los TODOs pedidos y cómo se hicieron  
- **Añadir máximo de 50 caracteres:** En la clase ['user.middleware.js'](src/middlewares/user.middleware.js) debíamos añadir un isLength + max para indicar el máximo de caracteres permitidos que el nombre de un usario puede tener.
- **Guardar updatedAt de una issue de GitHub:** Debíamos modificar las clases ['issue.model.js'](src/models/issue.model.js) e ['issue.service.js'](src/services/issue.service.js) para guardar el parámetro "updatedAt" de las issues de GitHub añadiendo respectivamente el código necesario en cada una de estas clases.
- **Modificar un usuario/Implementación de PUT**: Para hacer el método PUT, debíamos primero hacer en ['user.service.js'](src/services/user.service.js) el método ['changeUser'](src/services/user.service.js.ts#L24) para poder modificar los datos de un usario específico (usando su id). Seguidamente, creamos el método ['updateUser'](src/controllers/user.controller.js#L74) en el controlador, y ['update'](src/repositories/user.repository.js#L16) en ['user.repository.js](src/repositories/user.repository.js), creando así toda la lógica para implementar una nueva operación CRUD. Finalmente añadiríamos la ruta en ['user.routes.js'](src/routes/user.routes.js) para que se pueda acceder y poder realizar la acción.  
## Entregables de nivel 1 N1-1 y N1-3
### Explicación del entregable N1-1
Pedían una función recursiva para traer todas las issues posibles de un repositorio de GitHub. En este caso he implementado tanto la función recursiva para la entidad de Issues, como los parámetros de 'page' y 'limit' al realizar una petición a un endpoint.  
Es importante destacar la siguiente implementación:  
**No todos los repositorios se pueden minar al completo**, ya que la función parará llegada a las 1000 issues o la décima página, ya que si continúa, nos devuelve un código de estado 422, por eso se ha realizado así la implementación.  
Por otra parte con respecto a los parámetros, es tan simple como levantar la aplicación junto con la base de datos de MongoDB, guardar algunas issues de cualquier repositorio y llamar al endpoint:  
* **Ejemplo de endpoint con parámetros:**  
http://localhost:3000/api/v1/issues?page=6&limit=5  

(Modificando los parámetros a su gusto, cabe destacar que hay valores por defecto, pero no se ha tenido en cuenta cuando el usuario haga un mal uso de estos valores, como por ejemplo poner números enteros muy superiores al número de issues del sistema, decimales, letras o caracteres especiales).  
### Explicación del entregable N1-3
Para este apartado hemos creado las siguientes clases :
* ['ai.controller.js'](src/controllers/ai.controller.js) 
* ['ollama.service.js'](src/services/ollama.service.js)  
* ['ai.routes.js'](src/routes/ai.routes.js)  

*Cuidado con confundir entre las clases ai y openAI, siendo esta última parte del proyecto base y explicación de la clase del 22 de Diciembre del 2025.*  


En este entregable lo esencial era usar ollama y alguno de sus modelos de inteligencia artificial para replicar el comportamiento visto con la API de openAI pero en local.  
Para ello hemos usado el modelo gemma2:2b, modelo más que suficiente para satisfacer nuestras necesidades y comprobar que efectivamente funciona.  
El procedimiento ha sido tan simple como descargar ollama y el modelo que deseabamos y hacer la lógica muy parecida a la de openAI para que nos devuelva un prompt legible en postman.