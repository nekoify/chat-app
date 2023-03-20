<script lang="ts">
function submit() {
    const username = (<HTMLInputElement>document.getElementById('username')).value
    const password = (<HTMLInputElement>document.getElementById('password')).value
    console.log(username, password)
}

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