import type { PageServerLoad } from './$types';
import { ensureGameState } from '$lib/server/game';
import { requireUser } from '$lib/server/session';

export const load = (async ({ cookies }) => {
	const user = await requireUser(cookies);
	const game = await ensureGameState(user.id);

	return { user, game };
}) satisfies PageServerLoad;
