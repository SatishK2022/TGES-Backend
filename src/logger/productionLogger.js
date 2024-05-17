import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const productionLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp(),
            myFormat
        ),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({
                filename: 'combined.log',
                level: 'info'
              }),
              new winston.transports.File({
                filename: 'errors.log',
                level: 'error'
              })
        ],
    });
}

export default productionLogger