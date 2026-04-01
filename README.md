# LambdaWorks-Test

Aplicación Full-Stack para la gestión de contactos, construida con **Next.js 15** y **NestJS**.

##  Enlaces del Proyecto
* **Frontend (Vercel):** [https://lambda-works-test.vercel.app/]
* **Backend API (Render):** [https://lambdaworks-backend.onrender.com]

---

## Stack 

### Frontend (Carpeta `/frontend`)
* **Next.js 15 (App Router):** Renderizado eficiente y navegación optimizada.
* **Tailwind CSS:** Estilizado moderno y responsive.
* **TypeScript:** Tipado estricto para componentes y estados.

### Backend (Carpeta `/backend`)
* **NestJS:** Framework modular para una API robusta.
* **Prisma ORM:** Interacción con la base de datos PostgreSQL.
* **Class-Validator:** Validación de datos mediante DTOs.
* **PostgreSQL:** Almacenamiento persistente de datos.

---

##  Cómo correr el proyecto localmente

### 1. Configuración del Backend
1. Entra a la carpeta: `cd backend`
2. Instala las dependencias: `npm install`
3. Crea un archivo `.env` basado en el siguiente ejemplo:
   `env`
   DATABASE_URL="postgresql://test:test@localhost:5432/test?schema=public" 
   PORT=4000
   **Nota importante:** Para desarrollo local, se debe utilizar la URL de conexión de la instancia de PostgreSQL configurada (ej. Docker o Localhost).

## 2. Sincroniza la base de datos con Prisma:
1. `npx prisma generate`
2. `npx prisma db push`

## 3. Inicia Servidor 
1. `npm run start:dev`

## 4. Configuración del Frontend
1. Abre una nueva terminal y entra a: `cd frontend`
2. Instala las dependencias: `npm install`
3. Crea un archivo .env.local con la URL de la API local: `NEXT_PUBLIC_API_URL=http://localhost:4000`

## .5 Inicia el cliente
1. `npm run dev`