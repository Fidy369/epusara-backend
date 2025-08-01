const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

let server;

prisma.$connect().then(() => {
  logger.info('Connected to MySQL via Prisma');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
}).catch((error) => {
  logger.error('Failed to connect to MySQL:', error);
  process.exit(1);
});

const exitHandler = async () => {
  if (server) {
    server.close(async () => {
      logger.info('Server closed');
      await prisma.$disconnect();
      process.exit(1);
    });
  } else {
    await prisma.$disconnect();
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close(async () => {
      logger.info('Process terminated');
      await prisma.$disconnect();
    });
  }
});