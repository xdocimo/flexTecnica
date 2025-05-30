import swaggerJsdoc from "swagger-jsdoc"

export const getSwaggerSpec = () => {
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "API Flexxus Articulos",
      version: "1.0.8",
      description:
        "API para realizar operaciones CRUD sobre artículos. \n\n" +
        "**Auth Requerida** Enviar fl3x8s en el header `x-api-key`.",
      contact: {
        name: "Gabriel Olivo",
        email: "gabriel@websoon.com.ar",
      },
    },
    servers: [
      {
        url: "/api",
        description: "flextecnica.websoon.com.ar/api/",
      },
    ],
    tags: [
      {
        name: "Artículos"
      },
    ],
    components: {
      schemas: {
        Articulo: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "ObjectId",
              description: "ID",
              example: "60d0fe4f5311236168a109ca",
            },
            nombre: {
              type: "string",
              description: "Nombre artículo",
              example: "Celular",
            },
            marca: {
              type: "string",
              description: "Marca del articulo",
              example: "Apple",
            },
            fechaModificacion: {
              type: "string",
              format: "date-time",
              description: "Fecha modificación",
              example: "2024-07-30T10:30:00.000Z",
            },
            estadoActivacion: {
              type: "boolean",
              description: "Indica si el artículo está activo (true) o inactivo (false).",
              example: true,
            },
          },
        },
        CrearArticulo: {
          type: "object",
          required: ["nombre", "marca"],
          properties: {
            nombre: {
              type: "string",
              description: "Nombre del articulo",
              example: "Celular",
              minLength: 1,
              maxLength: 100,
            },
            marca: {
              type: "string",
              description: "Marca del articulo",
              example: "Apple",
              minLength: 1,
              maxLength: 50,
            },
          },
        },
        ActualizarArticulo: {
          type: "object",
          description: "Requiere por lo menos un campo",
          properties: {
            nombre: {
              type: "string",
              description: "Nuevo nombre del articulo",
              example: "Celular Premium",
              minLength: 1,
              maxLength: 100,
            },
            marca: {
              type: "string",
              description: "Nueva marca del articulo",
              example: "Samsumg",
              minLength: 1,
              maxLength: 50,
            },
            estadoActivacion: {
              type: "boolean",
              description: "Nuevo estado de activación del articulo",
              example: false,
            },
          },
          minProperties: 1,
        },
      },
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "API Key para autenticar las solicitudes. Usar el valor: `fl3x8s`",
        },
      },
    },
  }

  const options = {
    definition: swaggerDefinition,
    apis: ['./app/api/articulos/**/*.ts'], 
  }

  return swaggerJsdoc(options)
}
