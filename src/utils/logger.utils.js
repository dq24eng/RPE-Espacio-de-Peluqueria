import winston from "winston"; 
import config from "../config/enviroment.config.js";

let logger = '';

const customLevelOptions = {
	levels: {
		fatal: 0,
		error: 1,
		warn: 2,
		info: 3,
		http: 4,
		debug: 5,
	},
	colors: {
		fatal: 'red',
		error: 'magenta',
		warn: 'yellow',
		info: 'green',
		http: 'blue',
		debug: 'gray',
	},
};

if (config.ENVIRONMET == 'development') {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports:[
            new winston.transports.Console({
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelOptions.colors}),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
				filename: './logs/errors.log',
				level: 'error',
				format: winston.format.simple(),
			}),
			new winston.transports.File({
				filename: './logs/info.log',
				level: 'info',
				format: winston.format.simple(),
			})
        ]
    })
} else if (config.ENVIRONMET == 'production'){
    logger = winston.createLogger({
		levels: customLevelOptions.levels,
		transports: [
			new winston.transports.Console({
				level: 'info',
				format: winston.format.combine(
					winston.format.colorize({ colors: customLevelOptions.colors }),
					winston.format.simple()
				),
			}),
			new winston.transports.File({
				filename: './logs/errors.log',
				level: 'error',
				format: winston.format.simple(),
			})
		],
	});
}

export default logger;

