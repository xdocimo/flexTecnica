import { type NextRequest, NextResponse } from "next/server"
const API_KEY = process.env.API_KEY
//const API_KEY = "fl3x8s" // Es en pos del Plug And Play. En entorno de Testing para Ud. 

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/documentacion")) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith("/api/articulos")) {
    const requestHeaders = new Headers(request.headers)
    const apiKeyHeader = requestHeaders.get("x-api-key")

    if (apiKeyHeader !== API_KEY) {
      return NextResponse.json(
        { mensaje: "API Key incorrecta o no introducida." },
        { status: 401 },
      )
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/api/articulos/:path*", "/api/documentacion/:path*"],
}
