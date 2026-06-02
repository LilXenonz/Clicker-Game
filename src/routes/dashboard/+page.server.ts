import type { Actions, PageServerLoad } from './$types';
import { applyClick, buyUpgrade, ensureGameState, prestige, resetGame } from '$lib/server/game';
import { fail } from '@sveltejs/kit';
import { requireUser } from '$lib/server/session';

export const load = (async ({ cookies }) => {
	const user = await requireUser(cookies);
	const game = await ensureGameState(user.id);
	return { user, game };
}) satisfies PageServerLoad;

export const actions = {
	click: async ({ cookies }) => {
		const user = await requireUser(cookies);
		const game = await applyClick(user.id);
		return { game, message: `+${game.clickPower} donuts` };
	},

	upgrade: async ({ cookies, request }) => {
		const user = await requireUser(cookies);
		const data = await request.formData();
		const type = data.get('type') === 'auto' ? 'auto' : 'click';
		const res = await buyUpgrade(user.id, type);

		if ('error' in res) {
			return fail(400, res);
		}

		return res;
	},

	rebirth: async ({ cookies }) => {
		const user = await requireUser(cookies);
		const res = await prestige(user.id, false);

		if ('error' in res) {
			return fail(400, res);
		}

		return res;
	},

	superrebirth: async ({ cookies }) => {
		const user = await requireUser(cookies);
		const res = await prestige(user.id, true);

		if ('error' in res) {
			return fail(400, res);
		}

		return res;
	},

	reset: async ({ cookies }) => {
		const user = await requireUser(cookies);
		const game = await resetGame(user.id);
		return { game, message: 'Reset complete.' };
	}
} satisfies Actions;
