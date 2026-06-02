import * as crypto from 'node:crypto';

const ITERATIONS = 10000;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';
const COMMON_PASSWORDS = ['password', '123456', 'qwerty', 'abc123', 'password123'];

export function hashPassword(password: string): { salt: string; hash: string } {
	// SKAPA SALT OCH HASH
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
	return { salt, hash };
}

export function validatePassword(
	inputPassword: string,
	storedSalt: string,
	storedHash: string
): boolean {
	// JAMFOR SAMMA TYP AV HASH
	const hash = crypto.pbkdf2Sync(inputPassword, storedSalt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
	const incoming = Buffer.from(hash, 'hex');
	const saved = Buffer.from(storedHash, 'hex');

	if (incoming.length !== saved.length) {
		return false;
	}

	return crypto.timingSafeEqual(incoming, saved);
}

export function validatePasswordStrength(password: string): string[] {
	const errors: string[] = [];

	if (password.length < 8) errors.push('Losenordet maste vara minst 8 tecken');
	if (!/[A-Z]/.test(password)) errors.push('Losenordet maste innehalla en stor bokstav');
	if (!/[a-z]/.test(password)) errors.push('Losenordet maste innehalla en liten bokstav');
	if (!/[0-9]/.test(password)) errors.push('Losenordet maste innehalla en siffra');
	if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(password)) {
		errors.push('Losenordet maste innehalla ett specialtecken');
	}

	if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
		errors.push('Detta losenord ar for vanligt');
	}

	return errors;
}
