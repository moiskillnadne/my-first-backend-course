const http = require('http');

const helper = require('./helper.js')

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json')

  if(request.url === '/health-check' & request.method === "GET") {
    return response.end('Server is ok!')
  }

  if(request.url === '/analyze' & request.method === 'POST') {
    let body = ''

    request.on('data', chunk => {
      body += chunk.toString()
    })

    return request.on('end', () => {
      const parsedBody = JSON.parse(body)

      if(!parsedBody.text) {
        return response.writeHead(400).end(JSON.stringify({ error: 'Text is required!' }))
      }

      console.log('Text from body:', parsedBody.text)

      const responseObject = {
        wordsCount: helper.getWordsCount(parsedBody.text),
        lettersCount: helper.getLettersCount(parsedBody.text),
        topWords: Object.fromEntries(helper.getTopWords(parsedBody.text))
      }

      response.end(JSON.stringify({ message: 'Body is ok!', statistics: responseObject }))
    })
  }

  return response.writeHead(404).end(JSON.stringify({ error: 'Endpoint not found!' }))
})

server.listen(3000, () => {
  console.log('Сервер запущен на 3000 порту')
})