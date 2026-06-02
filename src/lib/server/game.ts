import { prisma } from '$lib/server/prisma';

const costs = {
	click: (l: number) => 25 + l * 20 + l * l * 8,
	auto: (l: number) => 60 + l * 45 + l * l * 12,
	rebirth: (r: number) => 2500 + r * 1750,
	super: (s: number) => 50000 + s * 35000
};

const getMult = (g: any) => 1 + g.rebirths + g.superRebirths * 5;

function decorate(game: any) {
	const m = getMult(game);
	return {
		...game,
		clickPower: game.perClick * m,
		autoPower: game.autoPerSecond * m,
		globalMultiplier: m,
		clickUpgradeCost: costs.click(game.clickLevel),
		autoUpgradeCost: costs.auto(game.autoLevel),
		rebirthCost: costs.rebirth(game.rebirths),
		superRebirthCost: costs.super(game.superRebirths)
	};
}

export async function ensureGameState(userId: string) {
	let game = await prisma.gameState.findUnique({ where: { userId } });

	// SKAPA SPEL OM DET INTE FINNS
	if (!game) {
		game = await prisma.gameState.create({ data: { userId } });
	}

	const now = new Date();
	const elapsed = Math.floor((now.getTime() - game.lastTickAt.getTime()) / 1000);
	
	if (elapsed > 0 && game.autoPerSecond > 0) {
		const earned = elapsed * game.autoPerSecond * getMult(game);
		game = await prisma.gameState.update({
			where: { userId },
			data: { donuts: { increment: earned }, totalEarned: { increment: earned }, lastTickAt: now }
		});
	}
	return decorate(game);
}

export async function applyClick(userId: string) {
	const game = await ensureGameState(userId);

	// LAGG TILL DONUTS FRAN KLICK
	const updated = await prisma.gameState.update({
		where: { userId },
		data: { donuts: { increment: game.clickPower }, totalEarned: { increment: game.clickPower }, totalClicks: { increment: 1 } }
	});
	return decorate(updated);
}

export async function buyUpgrade(userId: string, type: 'click' | 'auto') {
	const game = await ensureGameState(userId);
	const cost = type === 'click' ? game.clickUpgradeCost : game.autoUpgradeCost;

	if (game.donuts < cost) {
		return { error: 'Du har inte nog manga donuts.', game };
	}

	if (type === 'click') {
		const updated = await prisma.gameState.update({
			where: { userId },
			data: {
				donuts: { decrement: cost },
				perClick: { increment: 1 },
				clickLevel: { increment: 1 }
			}
		});

		return { game: decorate(updated) };
	}

	const updated = await prisma.gameState.update({
		where: { userId },
		data: {
			donuts: { decrement: cost },
			autoPerSecond: { increment: 1 },
			autoLevel: { increment: 1 }
		}
	});

	return { game: decorate(updated) };
}

export async function prestige(userId: string, isSuper = false) {
	const game = await ensureGameState(userId);
	const cost = isSuper ? game.superRebirthCost : game.rebirthCost;

	if (game.donuts < cost) {
		return { error: `Du behover ${cost} donuts.`, game };
	}

	if (!isSuper) {
		const updated = await prisma.gameState.update({
			where: { userId },
			data: {
				donuts: 0,
				perClick: 1,
				autoPerSecond: 0,
				clickLevel: 0,
				autoLevel: 0,
				rebirths: { increment: 1 },
				lastTickAt: new Date()
			}
		});

		return { game: decorate(updated) };
	}

	const updated = await prisma.gameState.update({
		where: { userId },
		data: {
			donuts: 0,
			perClick: 1,
			autoPerSecond: 0,
			clickLevel: 0,
			autoLevel: 0,
			rebirths: 0,
			superRebirths: { increment: 1 },
			lastTickAt: new Date()
		}
	});

	return { game: decorate(updated) };
}

export async function resetGame(userId: string) {
	// BORJA OM FRAN NOLL
	const updated = await prisma.gameState.update({
		where: { userId },
		data: {
			donuts: 0,
			perClick: 1,
			autoPerSecond: 0,
			clickLevel: 0,
			autoLevel: 0,
			rebirths: 0,
			superRebirths: 0,
			totalClicks: 0,
			totalEarned: 0,
			lastTickAt: new Date()
		}
	});

	return decorate(updated);
}
