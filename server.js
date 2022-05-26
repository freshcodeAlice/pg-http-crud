/* 
СЛУШАТЬ ПОРТ
РАБОТАТЬ С ЗАПРОСАМИ (ПРИНИМАТЬ, ОБРАБАТЫВАТЬ)
РАБОТАТЬ С БД
*/

const http = require('http')

const server = http.createServer()

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`APP is started on ${PORT}`)
})
