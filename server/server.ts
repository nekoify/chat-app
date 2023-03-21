import express from 'express';
import { Server } from "socket.io";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv'
import * as http from 'http'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { sha256 } from 'js-sha256';

//why is it so hard to load a .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = __dirname.replace("server", "") + ".env"
dotenv.config({path: envPath})

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded())
app.use(express.json())

interface IFuser extends mongoose.Document {
  username: string;
  passwordHash: string;
}

const Userschema = new mongoose.Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.model<IFuser>("User", Userschema);

const usernameCheck =  new RegExp('/^\w{3,20}$/')

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.get('/', (req, res) => {
    res.send('server');
});

io.on('connection', async(socket) => {
  console.log("user connected")
  socket.on('signup', async(data) => {
  if (!usernameCheck.test(data.username)) {

  }
  User.find({ username: data.username}).then((users) => {
    if (users.length != 0) {
     socket.emit("loginUser", "Username Taken, Please try a different one")
  } else {
    var hash = sha256(data.password)
    User.create({username: data.username, passwordHash: hash})
  }
    });

})
})

server.listen(3000, () => {
    console.log('[Server] Websocket server connected on port 3000');
})

mongoose.connect(process.env.URL as string).then(() => {
    console.log("[Server] Successfully connected to database");
  }).catch( (err: any) => {
    console.error(err)
  })
