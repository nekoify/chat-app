import express from 'express';
import { Server } from "socket.io";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv'
import * as http from 'http'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { sha256 } from 'js-sha256';
import CryptoJS from 'crypto-js';

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

const usernameCheck =  new RegExp(/^\w{3,20}$/)
var usersOnline = []

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
  if (data.password == "") {
    socket.emit("signupError", "Please fill in all fields")
    return
  }
  if (!usernameCheck.test(data.username)) {
    console.log("no")
    socket.emit("signupError", "Please make sure that your username only contains letters, numbers and underscores and is between 3-20 characters")
    return
  }
  User.find({ username: data.username}).then((users) => {
    if (users.length != 0) {
     socket.emit("signupError", "Username Taken, Please try a different one")
  } else {
    var hash = sha256(data.password)
    User.create({username: data.username, passwordHash: hash})
    var cookie = CryptoJS.AES.encrypt(data.username, process.env.KEY).toString();
    socket.emit("signupSuccess", cookie)
  }
    });

})

socket.on('signin', async(data) => {
  if (data.password == "") {
    socket.emit("signinError", "Please fill in all fields")
    return
  }
  if (!usernameCheck.test(data.username)) {
    socket.emit("signinError", "Please make sure that your username only contains letters, numbers and underscores and is between 3-20 characters")
    return
  }
  User.find({ username: data.username}).then((users) => {
    if (users.length == 0) {
     socket.emit("signinError", "No account found with that username")
  } else {
    var hash = sha256(data.password)
    if (hash != users[0].passwordHash) {
      socket.emit("signinError", "Incorrect password")
    } else {
    var cookie = CryptoJS.AES.encrypt(data.username, process.env.KEY).toString();
    socket.emit("signinSuccess", cookie)
    }
  }
    });

})
socket.on('userOnline', async(data) => {
  console.log(data)
var bytes  = CryptoJS.AES.decrypt(data, process.env.KEY);
var user = bytes.toString(CryptoJS.enc.Utf8);
var userInfo = {
  "username": user,
  "id": socket.id,
  "inRoom": false,
  "inChat": false
}
usersOnline.push(userInfo)
socket.emit("getUserList", usersOnline)
})
socket.on('chatReq', async(data) => {
  console.log(data)
})
socket.on('disconnect', async() => {
  console.log("user disconnected")
  for (let i = 0; i < usersOnline.length; i++) {
    if (usersOnline[i].id == socket.id) {
      usersOnline.splice(i, 1)
    }
    
  }
})
})

server.listen(3087, () => {
    console.log('[Server] Websocket server connected on port 3000');
})

mongoose.connect(process.env.URL as string).then(() => {
    console.log("[Server] Successfully connected to database");
  }).catch( (err: any) => {
    console.error(err)
  })
