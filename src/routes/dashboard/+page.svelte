<script lang="ts">
	import { enhance } from "$app/forms";
	let { data, form } = $props();
	let started = $state(false);
	let game = $state({
		donuts: 0,
		perClick: 1,
		autoPerSecond: 0,
		clickLevel: 0,
		autoLevel: 0,
		rebirths: 0,
		superRebirths: 0,
		totalClicks: 0,
		totalEarned: 0,
		clickPower: 1,
		autoPower: 0,
		globalMultiplier: 1,
		clickUpgradeCost: 25,
		autoUpgradeCost: 60,
		rebirthCost: 2500,
		superRebirthCost: 50000
	});
	let status = $state("Welcome to Donut Clicker");

	$effect(() => {
		if (!started && data.game) {
			game = { ...data.game };
			started = true;
		}

		if (form?.game) game = form.game;
		if (form?.message) status = form.message;
	});

	// Simple auto-save visual speedup
	let timer = setInterval(() => {
		if (game.autoPower > 0) game.donuts += game.autoPower / 10;
	}, 100);
</script>

<div class="pixel-game">
	<div class="col donut-col">
		<div class="lcd-screen">
			<h2>{Math.floor(game.donuts)}</h2>
			<p>Donuts</p>
			<small>{game.autoPower.toFixed(1)}/sec</small>
		</div>

		<form method="POST" action="?/click" use:enhance>
			<button class="pixel-donut" type="submit" aria-label="Click the donut">
				<div class="dough">
					<div class="glaze">
						<div class="sprinkles"></div>
					</div>
					<div class="hole"></div>
				</div>
			</button>
		</form>
		<p class="status">{status}</p>
	</div>

	<div class="col shop-col">
		<h3>Upgrades</h3>
		<div class="shop-grid">
			<form method="POST" action="?/upgrade" use:enhance>
				<input type="hidden" name="type" value="click" />
				<button
					class="buy-btn"
					disabled={game.donuts < game.clickUpgradeCost}
				>
					Click Level {game.clickLevel} <br />
					<span>Cost: {game.clickUpgradeCost}</span>
				</button>
			</form>

			<form method="POST" action="?/upgrade" use:enhance>
				<input type="hidden" name="type" value="auto" />
				<button
					class="buy-btn"
					disabled={game.donuts < game.autoUpgradeCost}
				>
					Auto Baker {game.autoLevel} <br />
					<span>Cost: {game.autoUpgradeCost}</span>
				</button>
			</form>
		</div>

		<h3>Prestige</h3>
		<form method="POST" action="?/rebirth" use:enhance>
			<button
				class="buy-btn prestige"
				disabled={game.donuts < game.rebirthCost}
			>
				Rebirth (Cost {game.rebirthCost})
			</button>
		</form>

		<form method="POST" action="?/reset" use:enhance>
			<button class="reset-btn">Reset All</button>
		</form>
	</div>
</div>

<style>
	.pixel-game {
		display: grid;
		grid-template-columns: 1fr 350px;
		gap: 30px;
		max-width: 1000px;
		margin: 0 auto;
	}

	.donut-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		background: rgba(0, 0, 0, 0.2);
		border: 8px solid var(--border-color);
		box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.3);
	}

	.lcd-screen {
		background: #879b6d;
		color: #1e2610;
		padding: 20px;
		border: 8px solid #000;
		box-shadow: inset 4px 4px 0 rgba(0, 0, 0, 0.2);
		text-align: center;
		width: 100%;
		margin-bottom: 30px;
		font-family: "Press Start 2P", cursive;
	}

	.lcd-screen h2 {
		margin: 0;
		font-size: 2.5rem;
		word-break: break-all;
	}

	.lcd-screen p {
		margin: 10px 0 5px;
		font-size: 14px;
		text-transform: uppercase;
	}

	.lcd-screen small {
		font-size: 12px;
		opacity: 0.8;
	}

	.pixel-donut {
		background: none;
		border: none;
		cursor: pointer;
		margin: 20px 0;
		padding: 0;
		transition: transform 0.1s;
		filter: drop-shadow(0 8px 0 rgba(0, 0, 0, 0.4));
	}

	.pixel-donut:active {
		transform: scale(0.9) translateY(4px);
	}

	/* Improved Pixel Art Donut in CSS */
	.dough {
		width: 220px;
		height: 220px;
		background: #d2a679;
		position: relative;
		/* Using chunky polygon for 8-bit circle feel */
		clip-path: polygon(
			30% 0%,
			70% 0%,
			90% 10%,
			100% 30%,
			100% 70%,
			90% 90%,
			70% 100%,
			30% 100%,
			10% 90%,
			0% 70%,
			0% 30%,
			10% 10%
		);
		border: 8px solid #000;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: inset -12px -12px 0 rgba(0, 0, 0, 0.15); /* Shading */
	}

	.glaze {
		position: absolute;
		inset: 15px;
		background: #ff8fcb;
		clip-path: polygon(
			30% 0%,
			70% 0%,
			90% 10%,
			100% 30%,
			100% 70%,
			90% 90%,
			70% 100%,
			30% 100%,
			10% 90%,
			0% 70%,
			0% 30%,
			10% 10%
		);
		border: 6px solid #000;
		box-shadow: inset -8px -8px 0 rgba(0, 0, 0, 0.1);
	}

	.sprinkles {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	/* Adding more "pixel" sprinkles with box-shadow */
	.sprinkles::after {
		content: "";
		position: absolute;
		width: 10px;
		height: 10px;
		background: #000;
		box-shadow:
			50px 70px 0 #fff,
			130px 50px 0 #fff,
			90px 150px 0 #fff,
			60px 110px 0 #ffed4a,
			150px 120px 0 #ffed4a,
			80px 50px 0 #ffed4a,
			170px 80px 0 #7b3fe4,
			50px 160px 0 #7b3fe4,
			120px 140px 0 #7b3fe4,
			40px 40px 0 #ffed4a,
			160px 160px 0 #fff;
		left: 10px;
		top: 10px;
	}

	.hole {
		width: 70px;
		height: 70px;
		background: var(--bg-primary);
		border: 6px solid #000;
		z-index: 2;
		clip-path: polygon(
			30% 0%,
			70% 0%,
			100% 30%,
			100% 70%,
			70% 100%,
			30% 100%,
			0% 70%,
			0% 30%
		);
	}

	.status {
		margin-top: 20px;
		font-size: 24px;
		color: var(--accent-primary);
		text-align: center;
		min-height: 1.5em;
		text-shadow: 3px 3px 0 #000;
	}

	.shop-col {
		background: var(--ui-panel);
		border: 8px solid var(--border-color);
		padding: 24px;
		box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.3);
	}

	h3 {
		margin-top: 0;
		margin-bottom: 20px;
		font-size: 18px;
		color: var(--accent-secondary);
		border-bottom: 4px solid var(--border-color);
		padding-bottom: 10px;
	}

	.shop-grid {
		display: grid;
		gap: 15px;
		margin-bottom: 30px;
	}

	.buy-btn {
		width: 100%;
		text-align: left;
		flex-direction: column;
		align-items: flex-start;
		padding: 15px;
		gap: 10px;
	}

	.buy-btn span {
		font-family: "VT323", monospace;
		font-size: 18px;
		color: var(--accent-primary);
	}

	.prestige {
		background: #e67e22;
		margin-bottom: 20px;
	}

	.reset-btn {
		background: #c0392b;
		margin-top: 30px;
		width: 100%;
	}

	@media (max-width: 900px) {
		.pixel-game {
			grid-template-columns: 1fr;
		}
	}
</style>
