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
exports.saveNewPassword = exports.forgotPassverifyOTPService = exports.checkUser = exports.loginUser = exports.verifyOTPService = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repository/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exsitingUser = yield (0, userRepository_1.findUserByEmail)(user.email);
        if (exsitingUser) {
            if (exsitingUser.otpVerified) {
                throw new Error("User already exists and is verified.");
            }
        }
        const hashedpassword = yield bcrypt_1.default.hash(user.password, 10);
        user.password = hashedpassword;
        return yield (0, userRepository_1.createUser)(user);
    }
    catch (error) {
        throw error;
    }
});
exports.registerUser = registerUser;
const verifyOTPService = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userRepository_1.findUserByEmail)(email);
        if (!user) {
            throw new Error("user not found");
        }
        if (user.otp == otp) {
            yield (0, userRepository_1.verifyAndSaveUser)(email, otp);
            return "User registered successfully";
        }
        else {
            throw new Error("OTP invalid");
        }
    }
    catch (error) {
        throw new Error("Invalid OTP");
    }
});
exports.verifyOTPService = verifyOTPService;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userRepository_1.findUserByEmail)(email);
        if (!user) {
            throw new Error("Invalid Email/Password");
        }
        const isPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isPassword) {
            throw new Error("Invalid Email/Password");
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        return { user, token };
    }
    catch (error) {
        console.error('Error during login:', error);
        throw new Error(error.message);
    }
});
exports.loginUser = loginUser;
const checkUser = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saveOTP = yield (0, userRepository_1.findUserByEmailandUpdate)(email, otp);
        saveOTP;
        if (!saveOTP) {
            throw new Error("user not found");
        }
        console.log(saveOTP, 'okoko');
        return saveOTP;
    }
    catch (error) {
        console.log("error at checkUser at service");
        throw new Error("error at checkUser in service in forgotpass");
    }
});
exports.checkUser = checkUser;
const forgotPassverifyOTPService = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userRepository_1.findUserByEmail)(email);
        if (!user) {
            throw new Error("user not found");
        }
        if (user.otp == otp) {
            yield (0, userRepository_1.verifyAndSaveUser)(email, otp);
            return "User registered successfully";
        }
        else {
            throw new Error("OTP invalid");
        }
    }
    catch (error) {
        throw new Error("Invalid OTP");
    }
});
exports.forgotPassverifyOTPService = forgotPassverifyOTPService;
const saveNewPassword = (password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield (0, userRepository_1.updateUser)(email, hashedpassword);
        return user;
    }
    catch (error) {
        throw new Error("error at saving chanage password");
    }
});
exports.saveNewPassword = saveNewPassword;
