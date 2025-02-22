import pino from "pino";
import path from "path";
import fs from "fs";

// Ensure the logs directory exists
const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = pino({
  level: "info",
  transport: {
    target: "pino/file",
    options: { destination: path.join(logDir, "app.log") },
  },
});

export default logger;
