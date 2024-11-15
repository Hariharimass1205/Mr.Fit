"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coachController_1 = require("../controllers/coachController");
const coachRouter = (0, express_1.Router)();
coachRouter.post("/sendScore", coachController_1.saveScore);
exports.default = coachRouter;
