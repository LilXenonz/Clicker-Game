import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { createSession, destroySession, getUserFromSession } from '$lib/server/session';
import { hashPassword, validatePassword, validatePasswordStrength } from '$lib/server/password';

export const load = async ({ cookies }) => {
	const user = await getUserFromSession(cookies);

	if (user) {
		throw redirect(303, '/dashboard');
	}

	return {};
};

export const actions = {
	register: async ({ request, cookies }) => {
		// LAS FORMULARET
		const data = await request.formData();
		const username = data.get('username')?.toString().trim() ?? '';
		const password = data.get('password')?.toString() ?? '';

		if (!username || !password) {
			return fail(400, { error: 'Anvandarnamn och losenord kravs', username });
		}

		if (username.length < 3) {
			return fail(400, { error: 'Anvandarnamn maste vara minst 3 tecken', username });
		}

		if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
			return fail(400, { error: 'Anvandarnamnet innehaller ogiltiga tecken', username });
		}

		const passwordErrors = validatePasswordStrength(password);
		if (passwordErrors.length > 0) {
			return fail(400, { error: passwordErrors.join('. '), username });
		}

		const existingUser = await prisma.user.findUnique({
			where: { username }
		});

		if (existingUser) {
			return fail(400, { error: 'Anvandarnamnet ar redan taget', username });
		}

		// SPARA SAKERT LOSENORD
		const { salt, hash } = hashPassword(password);
		const user = await prisma.user.create({
			data: {
				username,
				salt,
				hash,
				gameState: {
					create: {}
				}
			}
		});

		await createSession(user.id, cookies);
		throw redirect(303, '/dashboard');
	},

	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString().trim() ?? '';
		const password = data.get('password')?.toString() ?? '';

		if (!username || !password) {
			return fail(400, { error: 'Anvandarnamn och losenord kravs', username });
		}

		const user = await prisma.user.findUnique({
			where: { username }
		});

		const dummySalt = '0123456789abcdef0123456789abcdef';
		const dummyHash = hashPassword('DummyPassword1!').hash;
		const isValidPassword = user
			? validatePassword(password, user.salt, user.hash)
			: validatePassword(password, dummySalt, dummyHash);

		if (!user || !isValidPassword) {
			return fail(400, { error: 'Ogiltigt anvandarnamn eller losenord', username });
		}

		// LOGGA IN ANVANDAREN
		await createSession(user.id, cookies);
		throw redirect(303, '/dashboard');
	},

	logout: async ({ cookies }) => {
		await destroySession(cookies);
		throw redirect(303, '/');
	}
} satisfies Actions;
