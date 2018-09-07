import http from 'http'
import fs from 'fs'
import path from 'path'
import Io from 'socket.io'
const indexHtmlContent = fs.readFileSync(path.join(__dirname, '/../dist/index.html'))

const httpServer = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(indexHtmlContent)
  } else if (req.url === '/bundle.js') {
    const bundleJsContent = fs.readFileSync(path.join(__dirname, '/../dist/bundle.js'))
    res.writeHead(200, { 'Content-Type': 'application/javascript' })
    res.end(bundleJsContent)
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found')
  }
})
var games = {}
var socketServer = new Io(http)
socketServer.on('connection', socket => {
  console.log('connection')
  socket.emit('welcome', 'Welcome to the connection')
  socket.on('message', msg => { socket.emit('welcome', `You typed '${msg}'`) })
  socket.on('find-game', () => {

  })
  socket.on('join', (gameId, playerId) => {
    console.log('join request:', gameId, playerId)
    let game = games[ gameId ]
    if (!game) {
      game = { id: gameId, white: playerId, black: null }
      games[gameId] = game
    }
    if (game.white === playerId) {
      game.whiteSocket = socket
    } else if (game.black === playerId || game.black === null) {
      game.black = playerId
      game.blackSocket = socket
    } else {
      console.log(`game ${gameId} is already full`)
      socket.emit('game-found', 1 + gameId)
      return
    }
    if (!game.blackSocket) {
      game.whiteSocket.emit('welcome', 'Please wait for another player to join')
    } else {
      game.whiteSocket.emit('welcome', 'Starting game, you will play WHITE')
      game.blackSocket.emit('welcome', 'Starting game, you will play BLACK')
    }
  })
})
socketServer.attach(httpServer)
httpServer.listen(8080)
console.log('Server running at http://127.0.0.1:8080/')
