<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Profil</title>
</svelte:head>

<section class="panel">
	<h1>Profil</h1>
	<p>Anvandare: {data.user.username}</p>
	<p>Skapad: {new Date(data.user.createdAt).toLocaleDateString()}</p>
</section>

<section class="grid">
	<div class="panel">
		<h2>Spelstatistik</h2>
		<p>Totala klick: {data.game.totalClicks}</p>
		<p>Totalt intjanade donuts: {data.game.totalEarned}</p>
	</div>

	<div class="panel">
		<h2>Uppgraderingar</h2>
		<p>Per klick: {data.game.perClick}</p>
		<p>Auto/sec: {data.game.autoPerSecond}</p>
		<p>Klick-level: {data.game.clickLevel}</p>
		<p>Auto-level: {data.game.autoLevel}</p>
		<p>Rebirths: {data.game.rebirths}</p>
		<p>Super rebirths: {data.game.superRebirths}</p>
	</div>
</section>

<style>
	.panel {
		background: var(--ui-panel);
		border: 8px solid var(--border-color);
		box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.4);
		padding: 30px;
		margin-bottom: 30px;
	}

	h1, h2 {
		margin-top: 0;
		color: var(--accent-primary);
		text-shadow: 3px 3px 0 #000;
		margin-bottom: 20px;
	}

	p {
		font-size: 20px;
		color: var(--text-main);
		margin: 0 0 12px;
		display: flex;
		justify-content: space-between;
		border-bottom: 2px dashed rgba(255,255,255,0.1);
		padding-bottom: 8px;
	}

	p:last-child {
		border-bottom: none;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 30px;
	}

	h2 {
		color: var(--accent-secondary);
		font-size: 1.1rem;
	}
</style>
