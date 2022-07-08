import { transports } from "winston";

export default [
  new transports.Console({
    level: "debug",
  }),
  new transports.File({
    filename: "./logs/error.log",
    level: "error",
    maxsize: 5242880, // 5mb
    maxFiles: 10,
  }),
  new transports.File({
    filename: "./logs/app.log",
    level: "warn",
    maxsize: 5242880, // 5mb
    maxFiles: 10,
  }),
];