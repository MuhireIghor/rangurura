import logger from '@/utils/logger.utils';
import { PrismaClient,Prisma } from '@prisma/client';
const dbLogger = logger("database");

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

// Log queries in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    dbLogger.debug(`Query: ${e.query}`);
    dbLogger.debug(`Duration: ${e.duration}ms`);
  });
}

/**
 * Connect to the database and test the connection
 */
export const connectDB = async (): Promise<PrismaClient> => {
  try {
    await prisma.$connect();
    dbLogger.info('Database connected successfully');
    return prisma;
  } catch (error) {
    dbLogger.error('Database connection failed', error);
    process.exit(1);
  }
};

/**
 * Disconnect from the database
 */
export const disconnectDB = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    dbLogger.info('Database disconnected successfully');
  } catch (error) {
    dbLogger.error('Database disconnect failed', error);
    process.exit(1);
  }
};

export default prisma;
export {Prisma}