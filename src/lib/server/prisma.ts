import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'node:path';

function createPrismaClient() {
	const dbUrl = process.env.DATABASE_URL?.startsWith('file:')
		? `file:${path.resolve(process.cwd(), process.env.DATABASE_URL.replace(/^file:\.?\/?/, ''))}`
		: `file:${path.resolve(process.cwd(), 'dev.db')}`;

	const adapter = new PrismaBetterSqlite3({ url: dbUrl });
	return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as typeof globalThis & {
	prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}