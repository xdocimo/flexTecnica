
import { z } from "zod"

export const CrearArticuloSchema = z.object({
  nombre: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre no puede estar vacio")
    .max(100, "El limite de caracteres para el nombre es de 100 caracteres"),
  marca: z
    .string({ required_error: "La marca es obligatoria" })
    .min(1, "La marca no puede estar vacíia")
    .max(50, "El limite de caracteres para la nmarca es de 100 caracteres"),
})

export type CrearArticuloDto = z.infer<typeof CrearArticuloSchema>

export const ActualizarArticuloSchema = z
  .object({
    nombre: z
      .string()
      .min(1, "El nombre no puede estar vacio")
      .max(100, "El nombre no puede exceder los 100 caracteres")
      .optional(),
    marca: z
      .string()
      .min(1, "La marca no puede estar vacíia")
      .max(50, "La marca no puede exceder los 50 caracteres")
      .optional(),
    estadoActivacion: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "No se proporcionó campo a modificar.",
  })

export type ActualizarArticuloDto = z.infer<typeof ActualizarArticuloSchema>

export const FiltrosArticuloSchema = z.object({
  nombre: z.string().optional(),
  estadoActivacion: z
    .preprocess((val) => {
      if (val === "true") return true
      if (val === "false") return false
      return val
    }, z.boolean().optional()),
})

export type FiltrosArticuloDto = z.infer<typeof FiltrosArticuloSchema>
