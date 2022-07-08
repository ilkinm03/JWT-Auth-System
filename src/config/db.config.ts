import logger from "logger/logger";
import mongoose from "mongoose";

export default (): Promise<typeof mongoose> => {
  const dbURI: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const options: { [key: string]: boolean } = {
    autoCreate: false,
    autoIndex: false,
  };
  const connection = mongoose.connect(dbURI, options);
  mongoose.connection
    .once("connected", () => {
      logger.debug("DB is connected...");
    })
    .on("error", (error) => {
      logger.error(`Error connectin to DB: ${JSON.stringify(error)}`);
    })
    .on("disconnected", () => {
      logger.debug("Disconnected from DB.");
    });
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
  return connection;
};
