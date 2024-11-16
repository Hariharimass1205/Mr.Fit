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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.findUserByEmailandUpdate = exports.verifyAndSaveUser = exports.createUser = exports.findUserByEmail = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ email, isBlocked: false }).exec();
        return user;
    }
    catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Database Error');
    }
});
exports.findUserByEmail = findUserByEmail;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new userModel_1.default(user);
        return yield newUser.save();
    }
    catch (error) {
        console.log(error);
        throw new Error('Database Error');
    }
});
exports.createUser = createUser;
const verifyAndSaveUser = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ email });
    if (user.otp == otp && user) {
        user.otp = null;
        user.otpVerified = true;
        yield user.save();
        return user;
    }
    throw new Error("Invalid OTP");
});
exports.verifyAndSaveUser = verifyAndSaveUser;
const findUserByEmailandUpdate = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ email });
        user.otp = otp;
        yield user.save();
        return user;
    }
    catch (error) {
        console.log(error);
        throw new Error('Database forgototp Error');
    }
});
exports.findUserByEmailandUpdate = findUserByEmailandUpdate;
const updateUser = (email, hashedpassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.updateOne({ email }, { password: hashedpassword });
        return user;
    }
    catch (error) {
    }
});
exports.updateUser = updateUser;
