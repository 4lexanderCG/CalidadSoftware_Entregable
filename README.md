## Instrucciones de Ejecución

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

### Paso 1: Configurar la Base de Datos
1. Abre tu cliente de MySQL (ej. phpMyAdmin en XAMPP, MySQL Workbench, DBeaver, etc.).
2. Importa o ejecuta el archivo `base_de_datos.sql` que se encuentra en la raíz del proyecto. Esto creará la base de datos `crud_v3`, la tabla de usuarios y todos los procedimientos almacenados necesarios.
3. (Opcional) Si tus credenciales de MySQL son distintas al estándar de XAMPP (`root` y sin contraseña), asegúrate de actualizar el archivo `.env` dentro de la carpeta `backend` con tus credenciales correctas.

### Paso 2: Levantar el Backend (Servidor Node.js)
1. Abre una terminal y navega a la carpeta del servidor:
   ```bash
   cd backend
   ```
2. Instala las dependencias del servidor:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   npm run dev
   ```
   *El backend se ejecutará en http://localhost:5000*

### Paso 3: Levantar el Frontend (Next.js)
1. Abre **otra** ventana de terminal y navega a la carpeta del cliente web:
   ```bash
   cd frontend
   ```
2. Instala las dependencias de React/Next.js:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```
4. Ahora abre tu navegador web y visita **[http://localhost:3000](http://localhost:3000)** para ver el sistema funcionando.