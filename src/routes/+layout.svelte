<script lang="ts">
	let { data, children } = $props();
</script>

<div class="shell">
	<nav class="nav">
		<a class="brand" href="/">
			<span class="logo">D</span>
			<div class="brand-copy">
				<strong>Donut Clicker</strong>
			</div>
		</a>

		<div class="links">
			<a href="/">Hem</a>
			{#if data.user}
				<a href="/dashboard">Spela</a>
				<a href="/profile">Profil</a>
			{/if}
		</div>

		<div class="auth">
			{#if data.user}
				<span>{data.user.username}</span>
				<form method="POST" action="/login?/logout">
					<button type="submit">Logga ut</button>
				</form>
			{:else}
				<a class="button-link" href="/login">Login</a>
			{/if}
		</div>
	</nav>

	<main>
		{@render children()}
	</main>
</div>

<style>
	:global(html) {
		image-rendering: -moz-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: pixelated;
		-ms-interpolation-mode: nearest-neighbor;
		cursor: crosshair;
	}

	:global(body) {
		--bg-primary: #1a0b1e;
		--bg-secondary: #2d1637;
		--accent-primary: #ffed4a;
		--accent-secondary: #ff8fcb;
		--text-main: #fffcf0;
		--text-dim: #b898be;
		--border-color: #000;
		--ui-panel: #4a2155;
		--ui-button: #7b3fe4;
		--ui-button-hover: #915dff;

		margin: 0;
		background-color: var(--bg-primary);
		background-image: 
			linear-gradient(45deg, var(--bg-secondary) 25%, transparent 25%), 
			linear-gradient(-45deg, var(--bg-secondary) 25%, transparent 25%), 
			linear-gradient(45deg, transparent 75%, var(--bg-secondary) 75%), 
			linear-gradient(-45deg, transparent 75%, var(--bg-secondary) 75%);
		background-size: 40px 40px;
		background-position: 0 0, 0 20px, 20px 20px, 20px 0;
		
		color: var(--text-main);
		font-family: 'VT323', monospace;
		font-size: 20px;
		min-height: 100vh;
	}

	:global(*) {
		box-sizing: border-box;
		image-rendering: pixelated;
	}

	:global(h1, h2, h3, h4, .brand strong) {
		font-family: 'Press Start 2P', cursive;
		text-transform: uppercase;
		line-height: 1.4;
	}

	.nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 16px 24px;
		background: var(--ui-panel);
		border-bottom: 8px solid var(--border-color);
		box-shadow: 0 8px 0 rgba(0, 0, 0, 0.4);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.brand,
	.links,
	.auth {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	a,
	span {
		color: inherit;
		text-decoration: none;
	}

	.brand {
		gap: 15px;
	}

	.logo {
		display: inline-grid;
		place-items: center;
		width: 44px;
		height: 44px;
		font-family: 'Press Start 2P', cursive;
		font-size: 20px;
		background: var(--accent-primary);
		color: #000;
		border: 4px solid var(--border-color);
		box-shadow: 4px 4px 0 var(--border-color);
	}

	.brand-copy {
		display: grid;
		line-height: 1.2;
	}

	.brand-copy strong {
		font-size: 14px;
		color: var(--accent-secondary);
		text-shadow: 3px 3px 0 #000;
	}

	.links a {
		padding: 5px 0;
		border-bottom: 4px solid transparent;
		transition: all 0.1s;
	}

	.links a:hover {
		color: var(--accent-primary);
		border-bottom-color: var(--accent-primary);
	}

	:global(button),
	.button-link {
		font-family: 'Press Start 2P', cursive;
		font-size: 12px;
		color: #fff;
		background: var(--ui-button);
		border: 4px solid var(--border-color);
		box-shadow: 4px 4px 0 var(--border-color);
		padding: 10px 16px;
		cursor: pointer;
		text-transform: uppercase;
		transition: transform 0.05s, box-shadow 0.05s;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	:global(button:hover),
	.button-link:hover {
		background: var(--ui-button-hover);
		transform: translate(-2px, -2px);
		box-shadow: 6px 6px 0 var(--border-color);
	}

	:global(button:active),
	.button-link:active {
		transform: translate(2px, 2px);
		box-shadow: 0px 0px 0 var(--border-color);
	}

	:global(button:disabled) {
		background: #666;
		transform: none;
		box-shadow: 4px 4px 0 #333;
		cursor: not-allowed;
		color: #aaa;
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 40px 20px;
	}

	@media (max-width: 800px) {
		.nav {
			flex-direction: column;
			align-items: stretch;
		}
		.links, .auth {
			justify-content: center;
		}
	}
</style>
