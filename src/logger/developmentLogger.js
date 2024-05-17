import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const developmentLogger = () => {
    return createLogger({
        level: 'debug',
        format: combine(
            timestamp(),
            myFormat
        ),
        defaultMeta: { service: 'user-service' },
        transports: [
            new transports.Console({
                format: combine(
                    colorize(),
                    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
                    myFormat
                ),
            }),
        ],
    });
}

export default developmentLogger