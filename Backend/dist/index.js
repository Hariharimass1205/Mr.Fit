"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_connect_1 = require("./config/db.connect");
const coachRoute_1 = __importDefault(require("./routes/coachRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const morganFormat = ":method :url :status :response-time ms";
(0, db_connect_1.connectToMongoDB)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    Credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/user", userRoute_1.default);
app.use("/coach", coachRoute_1.default);
app.use("/admin", adminRoute_1.default);
app.get("/", (req, res) => {
    res.send("jbabnij");
});
app.listen(5000, () => {
    console.log(`server start at port 5000`);
});
