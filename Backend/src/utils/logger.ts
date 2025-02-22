import pino from "pino";
import path from "path";

const logger = pino({
  level: "info",
  transport: {
    target: "pino/file",
    options: { destination: path.join(__dirname, "../../logs/app.log") },
  },
});

export default logger;
