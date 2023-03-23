<script lang="ts">
function logout() {
    alert("Logging out...")
    document.cookie = "account=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
</script>

<h1>Chat app built with Svelte and Socket.io</h1>
<a href="/signUp"><button >Sign Up</button></a>
<br>
<a href="/signIn"><button >Sign In</button></a>
<br>
<a href="/chatMenu"><button >Chat Menu</button></a>
<br>
<button on:click={logout}>Log Out</button>
<style>
    button {
        margin-bottom: 10px !important;
    }
</style>