import winston from "winston";
import colors from "./options/colors";
import levels from "./options/levels";
import { formatProduction, formatDevelopment } from "./options/log.format";
import transports from "./options/transports";

winston.addColors(colors);

const logger = winston.createLogger({
  level: "trace",
  levels,
  transports,
});

if (process.env.NODE_ENV === "production") {
  logger.format = formatProduction;
} else {
  logger.format = formatDevelopment;
}

export default logger;
