<script lang="ts">
    import Chat from "./lib/Chat.svelte";
    import ChatMenu from "./lib/ChatMenu.svelte";
    import Menu from "./lib/Menu.svelte";
    import SignIn from "./lib/SignIn.svelte";
    import SignUp from "./lib/SignUp.svelte";
    import { Router, Route } from "svelte-navigator";
</script>

<main>
    <Router primary={false}>
        <Route path="/">
            <Menu></Menu>
        </Route>
        <Route path="chatMenu">
            <ChatMenu></ChatMenu>
        </Route>
        <Route path="chat">
            <Chat></Chat>
        </Route>
        <Route path="signIn">
            <SignIn></SignIn>
        </Route>
        <Route path="signUp">
            <SignUp></SignUp>
        </Route>
    </Router>
</main>

