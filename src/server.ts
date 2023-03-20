import * as express from 'express'
const app = express();
import * as http from 'http'
const server = http.createServer(app);
import { Server } from "socket.io";
import * as bodyParser from 'body-parser'
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

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