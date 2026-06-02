<svelte:head>
	<title>Donut Clicker</title>
	<meta name="description" content="A simple pixel-art donut clicker game." />
</svelte:head>

<section class="landing">
	<div class="donut-container">
		<div class="dough">
			<div class="glaze">
				<div class="sprinkles"></div>
			</div>
			<div class="hole"></div>
		</div>
	</div>

	<h1>Donut Clicker</h1>

	<div class="actions">
		<a href="/login" class="btn">Login / Register</a>
		<a href="/dashboard" class="btn primary">Play Game</a>
	</div>
</section>

<style>
	.landing {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 80vh;
		text-align: center;
		padding: 20px;
	}

	.donut-container {
		margin-bottom: 40px;
		filter: drop-shadow(0 12px 0 rgba(0, 0, 0, 0.3));
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-20px); }
	}

	/* CSS Donut Art */
	.dough {
		width: 200px;
		height: 200px;
		background: #d2a679;
		position: relative;
		clip-path: polygon(30% 0%, 70% 0%, 90% 10%, 100% 30%, 100% 70%, 90% 90%, 70% 100%, 30% 100%, 10% 90%, 0% 70%, 0% 30%, 10% 10%);
		border: 8px solid #000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.glaze {
		position: absolute;
		inset: 15px;
		background: #ff8fcb;
		clip-path: polygon(30% 0%, 70% 0%, 90% 10%, 100% 30%, 100% 70%, 90% 90%, 70% 100%, 30% 100%, 10% 90%, 0% 70%, 0% 30%, 10% 10%);
		border: 6px solid #000;
	}

	.sprinkles::after {
		content: "";
		position: absolute;
		width: 8px;
		height: 8px;
		background: #000;
		box-shadow: 
			40px 60px 0 #fff, 110px 40px 0 #fff, 80px 130px 0 #fff,
			50px 100px 0 #ffed4a, 130px 110px 0 #ffed4a, 70px 40px 0 #ffed4a,
			140px 70px 0 #7b3fe4, 40px 140px 0 #7b3fe4, 100px 120px 0 #7b3fe4;
		left: 10px;
		top: 10px;
	}

	.hole {
		width: 60px;
		height: 60px;
		background: var(--bg-primary);
		border: 6px solid #000;
		z-index: 2;
		clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
	}

	h1 {
		font-size: clamp(2.5rem, 10vw, 5rem);
		color: #fff;
		text-shadow: 8px 8px 0 #000;
		margin: 0 0 40px;
	}

	.actions {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.btn {
		font-family: 'Press Start 2P', cursive;
		font-size: 14px;
		color: #fff;
		text-decoration: none;
		padding: 15px 30px;
		background: var(--ui-button);
		border: 4px solid #000;
		box-shadow: 6px 6px 0 #000;
		transition: all 0.1s;
	}

	.btn.primary {
		background: var(--accent-primary);
	}

	.btn:hover {
		transform: translate(-4px, -4px);
		box-shadow: 10px 10px 0 #000;
	}

	.btn:active {
		transform: translate(2px, 2px);
		box-shadow: 2px 2px 0 #000;
	}
</style>
