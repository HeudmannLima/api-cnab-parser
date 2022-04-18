import { createServer } from 'http'

const server = createServer((_request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.end('ok')
})

server.listen(3000, () => console.log('server ok'))