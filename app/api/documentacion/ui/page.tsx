
"use client"
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

const SwaggerDocsPage = () => {

  const specUrl = "/api/documentacion/swagger.json"

  return (
    <div>
      <SwaggerUI url={specUrl} />
    </div>
  )
}

export default SwaggerDocsPage
