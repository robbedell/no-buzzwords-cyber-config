import winston from 'winston';
import { config } from '../config';

const { format, createLogger, transports } = winston;

const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = createLogger({
  level: config.nodeEnv === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp(),
    colorize(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

// If we're not in production, log to the console with colors
if (config.nodeEnv !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      colorize(),
      myFormat
    )
  }));
}
