import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      <div>
        <h1>API Prueba Tecnica Flexxus</h1>
        <Link
          href="/api/documentacion/ui"
        >
          Ver Documentación 
        </Link>
        <p>
           API Key: fl3x8s en el header <code>x-api-key</code> para las rutas de /api/articulos.
        </p>
      </div>
    </div>
  )
}
