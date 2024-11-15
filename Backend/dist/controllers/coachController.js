"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveScore = void 0;
const httpStatusCode_1 = require("../utils/httpStatusCode");
const coachService_1 = require("../services/coachService");
const saveScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { score, coach } = req.body;
        const result = yield (0, coachService_1.creatCoachDoc)(score, coach);
        res.status(httpStatusCode_1.HttpStatus.OK).json("coachScoreStroed");
    }
    catch (error) {
        throw new Error("error at saving score of coach");
    }
});
exports.saveScore = saveScore;
