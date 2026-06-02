import path from 'node:path';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '$lib/server/generated/prisma/client';

const globalForPrisma = globalThis as typeof globalThis & {
	prisma?: PrismaClient;
};

const databaseUrl = process.env.DATABASE_URL?.startsWith('file:')
	? `file:${path.resolve(process.cwd(), process.env.DATABASE_URL.replace(/^file:\.?\/?/, ''))}`
	: `file:${path.resolve(process.cwd(), 'dev.db')}`;

const adapter = new PrismaBetterSqlite3({
	url: databaseUrl
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}
