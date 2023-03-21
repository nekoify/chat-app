<script lang="ts">
import { io } from "socket.io-client";
var errorMessage = ""
const socket = io("http://localhost:3087", {
    reconnection: true,
    transports: ['websocket']
})
function submit() {
    const username = (<HTMLInputElement>document.getElementById('username')).value
    const password = (<HTMLInputElement>document.getElementById('password')).value
    socket.emit("signup", {"username": username, "password": password})
}
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
socket.on("signupError", (msg) => {
  errorMessage = msg
});
</script>

<h1>Create a account</h1>
<h3>Username:</h3>
<input id="username">
<h3>Password:</h3>
<input id="password" type="password">
<br>
<button on:click={submit}>Submit</button>
<p id="error" class="error">{errorMessage}</p>
<style>
    button {
        margin-top: 10px !important;
    }
</style>