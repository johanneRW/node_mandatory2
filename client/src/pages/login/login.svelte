<script>
	import { useNavigate } from "svelte-navigator";
	import AuthGuard from "../../guards/AuthGuard.svelte";
	import { attemptLogin } from "../../store/store";
    import toastr from "toastr";

	const navigate = useNavigate();

	let username;
	let password;

	function handleSubmit() {
		const promise = attemptLogin(username, password)
		promise.then(status => {
			if (status === 200) {
				navigate("/", { replace: true });
			} else {
				toastr.error(
					"Unfortunately we could not log you in. Please check your username and password.",
					"Login failed"
				)
			}
		})
	}
</script>
<AuthGuard>
	<div slot="authed">
		<div>
			<p>You are allrady logged in </p>
		</div>
	</div>
	<div slot="not_authed">
		<div id="loginCompontent" class="container">
			<form method="post" on:submit|preventDefault={handleSubmit}>
				<h3>Login</h3>
				<label for="name">Name</label>
				<input
					bind:value={username}
					type="text"
					name="name"
					placeholder="name"
				/>
				<label for="password">Password</label>
				<input
					bind:value={password}
					type="password"
					name="password"
					placeholder="Password"
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	</div>
</AuthGuard>
<style>
	#loginCompontent {
		display: flex;
		align-items: center;
		min-height: calc(100vh - 61px);
	}
	form {
		display: flex;
		flex-direction: column;
		max-width: 400px;
		width: 100%;
		margin: 0 auto;
		
	}
	input {
		width: 100%;
		height: 40px;
		padding: 0px 10px;
		font-size: 16px;
		color: #222;
		
	}
	input:focus-visible {
		outline: -webkit-focus-ring-color auto 1px;
	}
	button {
		border: none;
		outline: none;
		color: white;
		background-color: #1B2A38;
		cursor: pointer;
		font-size: 18px;
		margin-top: 2vh;
	}
	h3 {
		font-size: 2rem;
		margin-bottom: 10px;
	}
	label {
		margin-bottom: 5px;
	}
</style>