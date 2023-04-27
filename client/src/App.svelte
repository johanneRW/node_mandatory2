<script>
  import { Router, Link, Route } from "svelte-navigator"
  import Dinosaurs from "./pages/dinosaurs/dinosaurs.svelte"
  import SignUp from "./pages/signup/signup.svelte"
  import Login from "./pages/login/login.svelte"
  import { checkIsLoggedIn, logout } from "./store/store.js"
  import { onMount } from "svelte"
  import AuthGuard from "./guards/AuthGuard.svelte"

  function handleLogout() {
    logout()
  }

  onMount(() => {
    checkIsLoggedIn()
  })
</script>

<Router>
  <AuthGuard>
    <div slot="authed">
      <nav>
        <Link to="/">Dinos</Link>
        <button id="logoutbutton" on:click={handleLogout}>Log out</button>
      </nav>
    </div>
    <div slot="not_authed">
      <nav>
        <Link to="/">Dinos</Link>
        <button id="signupbutton">
          <Link to="/signup">Sign up</Link>
        </button>
        <button id="loginbutton">
          <Link to="/login">Login</Link>
        </button>
      </nav>
    </div>
  </AuthGuard>

  <Route path="/">
    <Dinosaurs />
  </Route>
  <Route path="/signup">
    <SignUp />
  </Route>
  <Route path="/login">
    <Login />
  </Route>
</Router>

<style>
  :global(body) {
    font-family: sans-serif;
  }
</style>
