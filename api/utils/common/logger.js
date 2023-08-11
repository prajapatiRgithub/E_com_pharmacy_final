const winston = require("winston");

module.exports = {
  logger: () => {
    const options = {
      file: {
        level: "info",
        filename: "../../logging/log.txt",
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      },
      console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
      },
    };

    winston.createLogger({
      levels: winston.config.npm.levels,
      transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
      ],
      exitOnError: false,
    });
  },
};