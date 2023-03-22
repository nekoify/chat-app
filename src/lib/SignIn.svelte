<script lang="ts">
    import { io } from "socket.io-client";
    var errorMessage = ""
    var successMessage = ""
    const socket = io("https://3087-nekoify-chatapp-yrjlbpenmgc.ws-us90.gitpod.io", {
        reconnection: true,
        transports: ['websocket']
    })
    function submit() {
        const username = (<HTMLInputElement>document.getElementById('username')).value
        const password = (<HTMLInputElement>document.getElementById('password')).value
        socket.emit("signin", {"username": username, "password": password})
    }
    
    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket.on("signinError", (msg) => {
      errorMessage = msg
    });
    socket.on("signinSuccess", (cookie) => {
        console.log("got event")
      setCookie("account", cookie, 30)
      successMessage = "Account signed in successfully!"
      window.location.pathname = "/chatMenu"
    });
    </script>

<h1>Sign In</h1>
<h3>Username:</h3>
<input id="username">
<h3>Password:</h3>
<input id="password" type="password">
<br>
<button on:click={submit}>Submit</button>
<p id="error" class="error">{errorMessage}</p>
<p id="success" class="success">{successMessage}</p>
<style>
    button {
        margin-top: 10px !important;
    }
</style>
    