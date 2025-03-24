📚 Library


Este proyecto es una aplicación para una librería que permite visualizar los libros disponibles, gestionar empleados y administrar los préstamos realizados. Se podrá observar, por cada préstamo, el empleado que lo realizó y el estado del mismo. Además, se pueden eliminar, agregar o actualizar estos datos.

Tecnologías

-Front-end:
   React con JavaScript
   Tailwind CSS
   Lottie

-Back-end:
   Java con Spring Boot

-Base de Datos:
   MySQL
   
🚀 Cómo desplegar el proyecto:

1.Clonar el repositorio:

git clone https://github.com/July173/library-Spring-boot.git

2.Configuración del Front-end:

Asegúrate de tener Node.js y npm instalados. 
Si no los tienes, instálalos.

2.1 Abre el proyecto en la terminal y navega hasta la carpeta del front-end y luego a la de library.

2.2 Instalación de Dependencias:

Ejecuta el siguiente comando:
npm install

Si tu equipo restringe la ejecución de npm, verifica la política de ejecución con:

Get-ExecutionPolicy
Si aparece que está restringido, ejecuta:

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
y luego vuelve a instalar las dependencias con:
npm install

3. Iniciar el Servidor del Front-end:
Para iniciar el servidor, ejecuta:
npm run

Simulación de Datos Dinámicos (JSON Server):

4. Instala JSON Server globalmente:
npm install -g json-server

Ejecuta el siguiente comando para iniciar el servidor de JSON:
json-server --watch db.json --port 5000
Esto te permitirá visualizar las tarjetas dinámicas con un JSON mientras se consume el back-end.

5.Desplegar el Front-end:
Finalmente, ejecuta:
npm run dev

🎨 Diseño en Figma
Para una mejor visualización del diseño, puedes consultar el siguiente enlace en Figma:
https://www.figma.com/design/tSqJbbLDzpMQOoX9ka12vE/java?node-id=0-1&t=IIH7Qs4jp0Ek5Nbh-1


