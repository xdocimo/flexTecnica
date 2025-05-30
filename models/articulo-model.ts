import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IArticulo extends Document {
  _id: mongoose.Types.ObjectId // Aseguramos que _id esté tipado
  nombre: string
  marca: string
  fechaModificacion: Date
  estadoActivacion: boolean
}

const ArticuloSchema: Schema<IArticulo> = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "Introducí un nombre"],
      trim: true,
      index: true, // para busquedas por nombre. INDEX.
    },
    marca: {
      type: String,
      required: [true, "La marca es obligatoria"],
      trim: true,
    },
    fechaModificacion: {
      type: Date,
      default: Date.now,
    },
    estadoActivacion: {
      type: Boolean,
      default: true,
      index: true, 
    },
  },
  {
    timestamps: { createdAt: false, updatedAt: "fechaModificacion" },
    versionKey: false,
  },
)

const Articulo: Model<IArticulo> = mongoose.models.Articulo || mongoose.model<IArticulo>("Articulo", ArticuloSchema)

export default Articulo
