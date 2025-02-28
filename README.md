# Sorteos Fraire

Sorteos Fraire es una plataforma en línea diseñada para la gestión y venta de boletos de sorteos. Permite a los usuarios seleccionar, apartar y comprar boletos en tiempo real, garantizando sincronización entre clientes y manejo de expiración de selección.

## 🚀 Características Principales

- **Selección en tiempo real**: Los usuarios pueden ver la disponibilidad de boletos y reservarlos instantáneamente.
- **Sincronización en múltiples clientes**: Integración con Pusher para reflejar cambios en todos los usuarios conectados.
- **Expiración automática de selección**: Los boletos seleccionados se liberan si no se completan en un tiempo determinado.
- **Expiración automática de apartados**: Los boletos apartados se liberan si no se completan en un tiempo determinado.
- **Base de datos escalable**: Uso de MongoDB Atlas para almacenar la información de sorteos, clientes y boletos.
- **Uso de caché**: Implementación de Redis para mejorar el rendimiento y manejar expiraciones de selección, los boletos seleccionados se almacenan en caché.
- **Optimización de almacenamiento**: Los boletos disponibles no generan registros en la base de datos, lo que permite un uso eficiente del almacenamiento al inferir su disponibilidad por omisión.

## 📌 Flujo del Sistema

1. **Carga Inicial**: Cuando un usuario accede a `/sorteos/[id]`, se obtiene la informacion del sorteo y los boletos disponibles desde MongoDB Atlas y se muestran en la interfaz.
2. **Selección de Boletos**: Al hacer clic en un boleto, este cambia a "Seleccionado" y se notifica a los demás clientes.
3. **Sincronización en Tiempo Real**:
   - Si otro usuario intenta seleccionar el mismo boleto, se le notifica que está ocupado temporalmente.
   - Una vez completado el formulario, los boletos pasan a "Apartados" y la información se actualiza globalmente.
4. **Expiración de Selección**: Si un usuario no finaliza la compra en 1 minuto, el boleto vuelve a estar disponible (gestionado con Redis).

## 🛠 Tecnologías Utilizadas

- **Next.js (App Router)** - Para la interfaz y las rutas de API.
- **MongoDB Atlas** - Base de datos para almacenar sorteos, clientes y boletos.
- **Pusher** - Para la comunicación en tiempo real entre usuarios.
- **Redis (Opcional)** - Usado para caché y gestión de expiración de selecciones.

## 📂 Estructura del Proyecto

```lua
/sorteos-fraire
 ├── /src
 │   ├── /app  <-- App Router (Rutas y APIs)
 │   │   ├── /admin  <-- Panel de administración
 │   │   │   ├── /api <-- Rutas de API para admins
 │   │   │   │   ├── /auth
 │   │   │   │   │   ├── /route.ts  <-- POST: autenticación admin
 │   │   │   │   ├── /sorteos
 │   │   │   │   │   ├── /[id]/boletos/liberar
 │   │   │   │   │   │   ├── /route.ts  <-- DELETE: liberar boletos
 │   │   │   │   │   ├── /[id]/boletos/vender 
 │   │   │   │   │   │   ├── /route.ts  <-- PUT: vender boletos
 │   │   │   │   │   ├── /crear
 │   │   │   │   │   │   ├── /route.ts  <-- POST: crear un sorteo
 │   │   │   │   │   ├── /editar
 │   │   │   │   │   │   ├── /route.ts  <-- PUT: editar un sorteo
 │   │   │   │   │   ├── /eliminar
 │   │   │   │   │   │   ├── /route.ts  <-- DELETE: eliminar un sorteo
 │   │   │   ├── /sorteos
 │   │   │   │   ├── /page.tsx  <-- Vista de administración de sorteos
 │   │   ├── /sorteos
 │   │   │   ├── /[id]
 │   │   │   │   ├── /page.tsx  <-- Página donde los usuarios seleccionan boletos
 │   │   │   ├── /api  <-- Rutas de API publicas
 │   │   │   │   ├── /[id]  <-- API Route para obtener info del sorteo
 │   │   │   │   │   ├── /route.ts  <-- GET: obtener boletos
 │   │   │   │   ├── /apartar
 │   │   │   │   │   ├── /route.ts  <-- POST: reservar un boleto
 │   │   │   │   ├── /liberar
 │   │   │   │   │   ├── /route.ts  <-- POST: liberar boletos expirados
 │   │   │   │   ├── /all
 │   │   │   │   │   ├── /route.ts  <-- GET: obtener todos los sorteos
 │   │   ├── /favicon.ico  <-- Icono de favoritos
 │   │   ├── /layout.tsx  <-- Layout principal
 │   │   ├── /page.tsx  <-- Página principal
 │   ├── /components  <-- Componentes reutilizables
 │   │   ├── ApartarModal.tsx
 │   │   ├── BancoCard.tsx
 │   │   ├── BoletoButton.tsx
 │   │   ├── BoletoCard.tsx
 │   │   ├── SorteoCard.tsx
 │   ├── /lib  <-- Funciones auxiliares
 │   │   ├── auth.ts  <-- Middleware para autenticación admin
 │   │   ├── db.ts  <-- Conexión a MongoDB Atlas
 │   │   ├── pusher.ts  <-- Configuración de Pusher
 │   │   ├── redis.ts  <-- Configuración de Redis
 │   ├── /models  <-- Modelos de Mongoose
 │   │   ├── Cliente.ts
 │   │   ├── Sorteo.ts
 │   ├── /scripts 
 │   │   ├── populateDB.ts  <-- Script para poblar la base de datos
 │   ├── /styles  <-- Estilos globales (opcional)
 │   │   ├── globals.css
 │   ├── /utils  <-- Utilidades generales
 │   │   ├── formatDate.ts
 │   │   ├── helpers.ts
 ├── .env.local           <-- Archivo de configuración de variables de entorno
 ├── .gitignore  
 ├── eslint.config.mjs    <-- Archivo de configuración de ESLint
 ├── next-env.d.ts        <-- Archivo de configuración de tipos de Next.js
 ├── next.config.ts       <-- Archivo de configuración de Next.js
 ├── package-lock.json    <-- Archivo de bloqueo de dependencias de npm
 ├── package.json         <-- Archivo de configuración de dependencias de npm
 ├── postcss.config.mjs   <-- Archivo de configuración de PostCSS
 ├── README.md            <-- Archivo de documentación del proyecto
 ├── tailwind.config.ts   <-- Archivo de configuración de Tailwind CSS
 ├── tsconfig.json        <-- Archivo de configuración de TypeScript
```