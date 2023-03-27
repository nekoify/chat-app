<script lang="ts">
    export var userInfo
    export var clientId
    function chat() {
        console.log(userInfo)
    }

</script>
{#if userInfo.inRoom == false || userInfo.inChat == false}
{#if userInfo.id == clientId}
<p>{userInfo.username} (You)</p>
{:else}
<p>{userInfo.username} (Online)</p>
    <button on:click={chat}>chat</button>
{/if}
{:else if userInfo.inRoom == true  }
<p>{userInfo.username} (In room)</p>
{:else if userInfo.inChat == true } 
<p>{userInfo.username} (Chatting to someone)</p>
{/if}
<br>

<style>p, button {
    display: inline-block;
}</style>