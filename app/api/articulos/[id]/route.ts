import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Articulo from "@/models/articulo-model"
import { ActualizarArticuloSchema } from "@/schemas/articulo-schemas"
import mongoose from "mongoose"
import { ZodError } from "zod"

interface Params {
  params: { id: string }
}

/**
 * @swagger
 * /articulos/{id}:
 *   get:
 *     summary: GET de artículo por ID
 *     description: Retorna el articulo especifico basado en UN ID
 *     tags: [Artículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Articulo obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulo'
 *       404:
 *         description: Artículo no encontrado.
 *       500:
 *         description: Error interno del servidor o ID inválido.
 *     security:
 *       - ApiKeyAuth: []
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    await dbConnect()
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ mensaje: "ID inválido" }, { status: 400 })
    }

    const articulo = await Articulo.findById(id)
    if (!articulo) {
      return NextResponse.json({ mensaje: "Articulo no encontrado" }, { status: 404 })
    }

    return NextResponse.json(articulo, { status: 200 })
  } catch (error) {
    console.error(`Error buscando artículo ${params.id}:`, error)
    return NextResponse.json({ mensaje: "Error interno del sv" }, { status: 500 })
  }
}

/**
 * @swagger
 * /articulos/{id}:
 *   put:
 *     summary: Actualizar un articulo
 *     description: Actualiza campos del articulo existente.
 *     tags: [Artículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarArticulo'
 *     responses:
 *       200:
 *         description: Artículo actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulo'
 *       400:
 *         description: Error de datos o ID invalido.
 *       404:
 *         description: Articulo no existe
 *       500:
 *         description: Error interno
 *     security:
 *       - ApiKeyAuth: []
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await dbConnect()
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ mensaje: "ID invalido" }, { status: 400 })
    }

    const jsonData = await request.json()
    const validationResult = ActualizarArticuloSchema.safeParse(jsonData)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          mensaje: "Error de validacion",
          errores: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const articuloActualizado = await Articulo.findByIdAndUpdate(
      id,
      validationResult.data,
      { new: true, runValidators: true },
    )

    if (!articuloActualizado) {
      return NextResponse.json({ mensaje: "Artículo no encontrado" }, { status: 404 })
    }

    return NextResponse.json(articuloActualizado, { status: 200 })
  } catch (error) {
    console.error(`Error actualizando artículo ${params.id}:`, error)
    if (error instanceof ZodError) {
      return NextResponse.json(
        { mensaje: "Error de validacion", errores: error.flatten().fieldErrors },
        { status: 400 },
      )
    }
    return NextResponse.json({ mensaje: "Error interno" }, { status: 500 })
  }
}

/**
 * @swagger
 * /api/articulos/{id}:
 *   delete:
 *     summary: Borrado logico (Delete / Desactivar)
 *     description: Cambia el estado a inactivo en vez de borrar.
 *     tags: [Artículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del articulo 
 *     responses:
 *       200:
 *         description: Artículo desactivado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Artículo desactivado con exito
 *                 articulo:
 *                   $ref: '#/components/schemas/Articulo'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: No existe el articulo
 *       500:
 *         description: Error interno
 *     security:
 *       - ApiKeyAuth: []
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await dbConnect()
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ mensaje: "ID invalido" }, { status: 400 })
    }

    const articuloDesactivado = await Articulo.findByIdAndUpdate(id, { estadoActivacion: false }, { new: true })

    if (!articuloDesactivado) {
      return NextResponse.json({ mensaje: "No existe el articulo" }, { status: 404 })
    }

    return NextResponse.json(
      {
        mensaje: "Articulo desactivado",
        articulo: articuloDesactivado,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error(`Error desactivando artículo ${params.id}:`, error)
    return NextResponse.json({ mensaje: "Error interno" }, { status: 500 })
  }
}
