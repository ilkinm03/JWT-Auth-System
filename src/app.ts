import "dotenv/config";
import express, { Application } from "express";
import bodyParser from "body-parser";
import { createServer, Server } from "http";
import startDbConnection from "config/db.config";
import logger from "logger/logger";
import cors from "config/cors";
import morgan from "config/morgan";

const app: Application = express();
const server: Server = createServer(app);
const PORT: string | 3000 = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

cors(app);
morgan(app);

startDbConnection().then(() => {
  server.listen(PORT, () => {
    logger.debug(`Server is listening on PORT: ${PORT}...`);
  });
});