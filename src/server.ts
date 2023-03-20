import express from 'express';
import { Server } from "socket.io";
import * as bodyParser from 'body-parser'
import * as http from 'http'
const app = express();
const server = http.createServer(app);

app.use(express.urlencoded())
app.use(express.json())

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.get('/', (req, res) => {
    res.send('server');
});

io.on('connection', async(socket) => {
  
  socket.on('accountData', async(data) => {

})
})

server.listen(3000, () => {
    console.log('[Server] Websocket server connected on port 3000');
})