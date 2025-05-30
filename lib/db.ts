import mongoose from "mongoose"

interface GlobalMongo {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: GlobalMongo | undefined
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Falta MONGODB_URI (puede ser Mongo Atlas), solicitame si requerís una BD de prueba +543516522574 (24/7)")
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null }
}

const cached: GlobalMongo = global.mongoose

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "gestion_articulos_test",
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose
    })
  }
  
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
