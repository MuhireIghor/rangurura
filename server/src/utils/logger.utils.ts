import path from "path";
import winston from "winston";
import "winston-daily-rotate-file";
const logger = (logsPath = '') => {
  const logPath = path.join(__dirname, '../..', 'logs', logsPath);
  const exceptionsLogPath = path.join(
    __dirname,
    '../..',
    'logs',
    logsPath,
    'exceptions.log',
  );
  const rejectionsLogPath = path.join(
    __dirname,
    '../..',
    'logs',
    logsPath,
    'rejections.log',
  );
  const winstonFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json(),
  );
  const transports = [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      dirname: logPath,
      filename: 'application',
      extension: '.log',
      datePattern: 'YYYY-w',
    }),
  ];
  const createdLogger = winston.createLogger({
    format: winstonFormat,
    transports,
  });
  if (process.env.NODE_ENV!.toLowerCase() === 'production'.toLowerCase()) {
    createdLogger.exceptions.handle(
      new winston.transports.File({ filename: exceptionsLogPath }),
    );
    createdLogger.rejections.handle(
      new winston.transports.File({ filename: rejectionsLogPath }),
    );
  }
  return createdLogger;
};
export default logger;