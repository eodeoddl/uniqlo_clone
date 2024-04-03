// import { Pool, neonConfig } from '@neondatabase/serverless';

// import { PrismaNeon } from '@prisma/adapter-neon';

import { PrismaClient } from '@prisma/client';

// import dotenv from 'dotenv';

// import ws from 'ws';

// dotenv.config();

// neonConfig.webSocketConstructor = ws;

// const connectionString = `${process.env.DATABASE_URL}`;

// const pool = new Pool({ connectionString });

// const adapter = new PrismaNeon(pool);

// export const db = new PrismaClient({ adapter });

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

// export const db = new PrismaClient();
