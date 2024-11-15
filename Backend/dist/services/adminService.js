"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLOGIN = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminLOGIN = (email, password) => {
    try {
        if (process.env.ADMIN_EMAIL !== email) {
            console.error(Error);
        }
        if (process.env.ADMIN_PASS !== password) {
            console.error(Error);
        }
        const adminToken = jsonwebtoken_1.default.sign({
            AdminEmail: email,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return { adminToken, admin: email };
    }
    catch (error) {
        throw new Error;
    }
};
exports.adminLOGIN = adminLOGIN;
