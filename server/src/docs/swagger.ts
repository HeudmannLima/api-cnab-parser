import { Express, Request, Response } from 'express'

import swaggerJsDoc from 'swagger-jsdoc' 
import swaggerUi from 'swagger-ui-express'

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CNAB Parser Data - API Documentation',
      version: '1.0.0',
      contact: {
        name: 'Heudmann Lima',
        email: 'heudmannlima@gmail.com',
        url: 'https://www.linkedin.com/in/heudmann'
      },
      description: 'Documentation about CNAB parser API Endpoints'
    }
  },
  apis: ['./src/docs/**/*.yml']
}

const swaggerSpec = swaggerJsDoc(options)

export function swaggerDocs(app: Express, port: number) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get('docs.json', (_request: Request, response: Response) => {
    response.setHeader('Content-Type', 'application/json')
    response.send(swaggerSpec)
  })

  console.warn(`[✔] Docs available at http://localhost:${port}/docs`)
}
