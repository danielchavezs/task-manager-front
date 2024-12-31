# Task Manager - Frontend

## Descripción
Este repositorio contiene el frontend para la aplicación **Task Manager**, desarrollada con **React**, empaquetada con **Vite** y empleando **Tailwind CSS** para la implementación de estilos y un comportamiento responsivo. La interfaz permite interactuar con las tareas gestionadas por el backend, proporcionando una experiencia intuitiva para el usuario.

## Requisitos

- Node.js (v16 o superior)
- npm (v8 o superior)

## Configuración

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/danielchavezs/task-manager-front.git
    ```

2. Accede al directorio del proyecto:

    ```bash
    cd task-manager-front
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Conexión al backend. Actualmente el proyecto ya está conectado a a la [API](https://task-manager-back-294x.onrender.com) de producción, pero si prefieres conectarlo un backend local, puedes modificar el archivo `.utils` en la carpeta *assets*, habilitando la siguiente variable:

    ```env
    export const BACKEND_URL = "http://localhost:3001"
    ```

   Asegúrate de solamente tener una de las dos opciones habilitada y comentar la otra, dependiendo si quieres conectarte a la API de producción o a una local. 

5. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

6. Abre tu navegador y accede a `http://localhost:5173` para ver la aplicación en acción.

## Funcionalidades

- Ver todas las tareas
- Filtrar tareas por completadas o pendientes
- Crear nuevas tareas
- Editar tareas existentes
- Eliminar tareas

## Producción

Si deseas acceder a la aplicación desplgeda, puedes hacerlo desde acá ➡ [Task Manager](https://task-manager-eta-opal.vercel.app/). Recuerda que debido a que la API a la que está conectada la aplicación, fue desplegada con un servicio gratuito de Render, las primeras solicitudes al servidor del back-end pueden demorar hasta 50s en generar una respuesta y verse reflejadas en el fron-end.

