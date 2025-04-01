"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const config_1 = require("../config");
const { format, createLogger, transports } = winston_1.default;
const { combine, timestamp, printf, colorize } = format;
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});
exports.logger = createLogger({
    level: config_1.config.nodeEnv === 'production' ? 'info' : 'debug',
    format: combine(timestamp(), colorize(), myFormat),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' })
    ]
});
if (config_1.config.nodeEnv !== 'production') {
    exports.logger.add(new transports.Console({
        format: combine(colorize(), myFormat)
    }));
}
//# sourceMappingURL=logger.js.map