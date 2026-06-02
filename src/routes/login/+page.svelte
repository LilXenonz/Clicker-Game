<svelte:options runes={true} />

<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let loadingLogin = $state(false);
	let loadingRegister = $state(false);
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="grid">
	<section class="panel">
		<h1>Logga in</h1>

		<form
			method="POST"
			action="?/login"
			use:enhance={() => {
				loadingLogin = true;
				return async ({ update }) => {
					loadingLogin = false;
					await update();
				};
			}}
		>
			<label>
				<span>Anvandarnamn</span>
				<input name="username" required placeholder="t.ex. maja_dev" value={form?.username ?? ''} />
			</label>

			<label>
				<span>Losenord</span>
				<input name="password" type="password" required placeholder="Skriv ditt losenord" />
			</label>

			<button type="submit" disabled={loadingLogin}>
				{loadingLogin ? 'Loggar in...' : 'Logga in'}
			</button>
		</form>
	</section>

	<section class="panel">
		<h2>Skapa konto</h2>

		<form
			method="POST"
			action="?/register"
			use:enhance={() => {
				loadingRegister = true;
				return async ({ update }) => {
					loadingRegister = false;
					await update();
				};
			}}
		>
			<label>
				<span>Anvandarnamn</span>
				<input name="username" required placeholder="Valj ett anvandarnamn" value={form?.username ?? ''} />
			</label>

			<label>
				<span>Losenord</span>
				<input
					name="password"
					type="password"
					required
					placeholder="8+ tecken, stor/liten bokstav, siffra, specialtecken"
				/>
			</label>

			<button type="submit" disabled={loadingRegister}>
				{loadingRegister ? 'Skapar konto...' : 'Registrera'}
			</button>
		</form>
	</section>
</div>

{#if form?.error}
	<div class="error">{form.error}</div>
{/if}

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 30px;
		max-width: 900px;
		margin: 0 auto;
	}

	.panel {
		background: var(--ui-panel);
		border: 8px solid var(--border-color);
		box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.4);
		padding: 30px;
		display: flex;
		flex-direction: column;
	}

	h1, h2 {
		margin-top: 0;
		font-size: 1.2rem;
		color: var(--accent-primary);
		text-shadow: 3px 3px 0 #000;
		margin-bottom: 20px;
	}

	form {
		display: grid;
		gap: 20px;
	}

	label {
		display: grid;
		gap: 8px;
	}

	label span {
		font-family: 'Press Start 2P', cursive;
		font-size: 10px;
		text-transform: uppercase;
		color: var(--accent-secondary);
	}

	input {
		background: #2a1133;
		border: 4px solid var(--border-color);
		color: var(--text-main);
		padding: 12px;
		font-family: 'VT323', monospace;
		font-size: 20px;
		width: 100%;
		box-shadow: inset 4px 4px 0 rgba(0,0,0,0.3);
	}

	input:focus {
		outline: none;
		border-color: var(--accent-primary);
	}

	.error {
		margin-top: 30px;
		background: #c0392b;
		border: 8px solid var(--border-color);
		padding: 20px;
		color: #fff;
		font-family: 'Press Start 2P', cursive;
		font-size: 10px;
		text-align: center;
		box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.4);
	}
</style>
