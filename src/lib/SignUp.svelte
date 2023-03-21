<script lang="ts">
import { io } from "socket.io-client";
var isConnected
const socket = io("https://3000-nekoify-chatapp-yrjlbpenmgc.ws-us90.gitpod.io/", {
    reconnection: true,
    transports: ['websocket']
})
function submit() {
    const username = (<HTMLInputElement>document.getElementById('username')).value
    const password = (<HTMLInputElement>document.getElementById('password')).value
    console.log(username, password)
    alert(socket.connected)
    socket.emit("signup", {"username": username, "password": password})
}
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
</script>

<h1>Create a account</h1>
<h3>Username:</h3>
<input id="username">
<h3>Password:</h3>
<input id="password" type="password">
<br>
<button on:click={submit}>Submit</button>

<style>
    button {
        margin-top: 10px !important;
    }
</style>