<script>
	import { useNavigate } from "svelte-navigator";
	import AuthGuard from "../../guards/AuthGuard.svelte";
	import { attemptSignup } from "../../store/store";
	import toastr from "toastr";
	
	const navigate = useNavigate();
	let password;
	let username;
	let email;

	function handleSubmit() {
		const status = attemptSignup(username, password, email)
		const progress = toastr.info("Working ...", "...", { "progressBar": true, timeOut: 1000 })
		status.then(value => {	
			progress.remove()		
			if (value === 200) {
				toastr.success("Yay, we have sent you an email")
				navigate("/", { replace: true });
			} else {
				toastr.error(
					"The username or email is already in use. Please try signing up with a different username or email",
					"Signup failed"
				)
			}
		}) 	
	}

	
</script>

<AuthGuard>
	<div slot="authed">
		<div>
			<p>You are allrady signed up</p>
		</div>
	</div>
	<div slot="not_authed">
		<div id="signupCompontent" class="container">
			<form method="post" on:submit|preventDefault={handleSubmit}>
				<h3>Signup</h3>
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
				<label for="email">Email</label>
				<input
					bind:value={email}
					type="email"
					name="email"
					placeholder="Email"
				/>
				<button type="submit">sign up</button>
			</form>
		</div>
	</div>
</AuthGuard>

<style>
	#signupCompontent {
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
		background-color: #1b2a38;
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
	h3 {
		user-select: none;
	}
</style>
