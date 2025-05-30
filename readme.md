# API Articulos Prueba Técinca.
Puedes acceder a la documentación de Swinger de esta API en:
https://flextecnica.websoon.com.ar/api/documentacion/ui

-----

## Para esta resolución se usó:
- TypeScript
- Next
- MongoDB

## Para runnear:

```bash
npm install
npm run dev
```
-----

# Preparando el entorno:
Es preciso que .env.local tenga una API_KEY (o descomentar linea 3 de middleware.ts para una hardcodeada) y una MONGODB_URI (obténgase en Mongo Atlas Free Cluster) o contactarse vía WhatsApp 24/7 a +543516522574 para que le facilite el mismo servidor de test que está siendo usado en el entorno productivo de flextecnica.websoon.com.ar

# ### Autenticación
Todas las rutas (excepto la documentación) requieren el header `x-api-key`

### Endpoints Principales
* `GET /api/articulos` - Listar artículos (filtros opcionales)
* `POST /api/articulos` - Crear artículo
* `GET /api/articulos/{id}` - Obtener artículo por ID
* `PUT /api/articulos/{id}` - Actualizar artículo
* `DELETE /api/articulos/{id}` - Desactivar artículo 
Ejemplos y demás en https://flextecnica.websoon.com.ar/api/documentacion/ui