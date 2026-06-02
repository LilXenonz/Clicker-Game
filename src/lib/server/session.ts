import * as crypto from 'node:crypto';
import { redirect, type Cookies } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

const SESSION_COOKIE = 'session';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

function hashToken(token: string) {
	return crypto.createHash('sha256').update(token).digest('hex');
}

export async function createSession(userId: string, cookies: Cookies) {
	// SKAPA NY TOKEN
	const token = crypto.randomBytes(32).toString('hex');
	const tokenHash = hashToken(token);
	const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

	await prisma.session.create({
		data: {
			tokenHash,
			userId,
			expiresAt
		}
	});

	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: false,
		maxAge: SESSION_DURATION_MS / 1000
	});
}

export async function destroySession(cookies: Cookies) {
	const token = cookies.get(SESSION_COOKIE);

	if (token) {
		await prisma.session.deleteMany({
			where: {
				tokenHash: hashToken(token)
			}
		});
	}

	cookies.delete(SESSION_COOKIE, { path: '/' });
}

export async function getUserFromSession(cookies: Cookies) {
	const token = cookies.get(SESSION_COOKIE);

	if (!token) {
		return null;
	}

	// HAMTA SESSION FRAN DATABASEN
	const session = await prisma.session.findUnique({
		where: {
			tokenHash: hashToken(token)
		},
		include: {
			user: {
				select: {
					id: true,
					username: true,
					createdAt: true
				}
			}
		}
	});

	if (!session || session.expiresAt.getTime() <= Date.now()) {
		cookies.delete(SESSION_COOKIE, { path: '/' });

		if (session) {
			await prisma.session.deleteMany({
				where: {
					id: session.id
				}
			});
		}

		return null;
	}

	return session.user;
}

export async function requireUser(cookies: Cookies) {
	const user = await getUserFromSession(cookies);

	if (!user) {
		// SKYDDA SIDAN
		throw redirect(303, '/login');
	}

	return user;
}
