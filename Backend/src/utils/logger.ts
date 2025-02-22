import pino from "pino";
import path from "path";
import fs from "fs";

// Define log directory and file path
const logDir = path.resolve(__dirname, "../../logs");
const logFile = path.join(logDir, "app.log");

// Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create the Pino logger instance
const logger = pino({
  level: "info", // Log level (info, warn, error, etc.)
  transport: {
    target: "pino/file",
    options: {
      destination: logFile, // Log file path
      mkdir: true, // Ensure directory creation
    },
  },
});

// Export the logger for use in other files
export default logger;
