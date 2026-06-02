import type { LayoutServerLoad } from './$types';
import { getUserFromSession } from '$lib/server/session';

export const load = (async ({ cookies }) => {
	const user = await getUserFromSession(cookies);

	return { user };
}) satisfies LayoutServerLoad;
