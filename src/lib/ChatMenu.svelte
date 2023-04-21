<script lang="ts">
    import { io } from "socket.io-client";
    import User from "./User.svelte";
    var usersOnline = "Loading..."
    var clientId
   const socket = io("http://localhost:3087", {
        reconnection: true,
        transports: ['websocket']
    })

    function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
var cookie = getCookie("account")
if (!cookie) {
    alert("Please Sign in or Sign up first")
    window.location.pathname = "/"
}
socket.emit("userOnline", getCookie("account"))

socket.on("connect", () => {
  console.log("connected")
  clientId = socket.id
})

socket.on("getUserList", (data) => {
    console.log(data)
    usersOnline = data.length
    var div = document.getElementById("users")
    for (let i = 0; i < data.length; i++) {
      new User({
      target: div,
      props: {
        userInfo: data[i],
        clientId: clientId
      }
    });
    }
})


</script>
<h1>Chat Menu</h1>
<h2>Current Amount of Users Online: {usersOnline}</h2>
<h3>List of users:</h3>
<div id="users"></div>