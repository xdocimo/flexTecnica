import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Articulo from "@/models/articulo-model"
import { CrearArticuloSchema, FiltrosArticuloSchema } from "@/schemas/articulo-schemas"
import { ZodError } from "zod"

/**
 * @swagger
 * /articulos:
 *   get:
 *     summary: Obtener lista de articulos con o sin filtro
 *     description: Retorna lista de articulos, filtrable coincidencias parciales y estado de activacion
 *     tags: [Artículos]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre o parte del nombre del articulo para buscar
 *       - in: query
 *         name: estadoActivacion
 *         schema:
 *           type: boolean
 *           enum: [true, false]
 *         description: Filtrar por estado de activación (true muestra los activos, false los borrados lógicamente vía DELETE)
 *     responses:
 *       200:
 *         description: Lista de articlos obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Articulo'
 *       400:
 *         description: Error en la sintaxis de datos

 *       500:
 *         description: Error interno del servidor.
 *     security:
 *       - ApiKeyAuth: []
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const searchParams = request.nextUrl.searchParams
    const queryParams = Object.fromEntries(searchParams)

    const validationResult = FiltrosArticuloSchema.safeParse(queryParams)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          mensaje: "Error de validación en los parámetros de búsqueda.",
          errores: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const { nombre, estadoActivacion } = validationResult.data
    const filtro: any = {}

    if (nombre) {
      // Usamos Regex para búsqueda parcial e insensible 
      filtro.nombre = { $regex: nombre, $options: "i" }
    }
    if (typeof estadoActivacion === "boolean") {
      filtro.estadoActivacion = estadoActivacion
    }

    const articulos = await Articulo.find(filtro).sort({ fechaModificacion: -1 })
    return NextResponse.json(articulos, { status: 200 })
  } catch (error) {
    console.error("Error al obtener artículos:", error)
    return NextResponse.json({ mensaje: "Error interno al obtener artículos." }, { status: 500 })
  }
}

/**
 * @swagger
 * /articulos:
 *   post:
 *     summary: Crear un nuevo articulo
 *     description: Crea un nuevo articulo, nombre y marca son obligatorias. 
 *     tags: [Artículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearArticulo'
 *     responses:
 *       201:
 *         description: Articulo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulo'
 *       400:
 *         description: Error en los datos ingresados. (Validacion)
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - ApiKeyAuth: []
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const jsonData = await request.json()
    const validationResult = CrearArticuloSchema.safeParse(jsonData)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          mensaje: "Error en validación de los datos",
          errores: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const { nombre, marca } = validationResult.data
    const nuevoArticulo = new Articulo({ nombre, marca })
    const articuloGuardado = await nuevoArticulo.save()

    return NextResponse.json(articuloGuardado, { status: 201 })
  } catch (error) {
    console.error("Error al crear artículo:", error)
    return NextResponse.json(
      { status: 500 },
    )
  }
}