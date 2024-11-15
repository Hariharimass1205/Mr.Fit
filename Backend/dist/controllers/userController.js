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
exports.saveChangePassword = exports.forgotPasswordOTPVerify = exports.forgotPassword = exports.login = exports.otpVerify = exports.register = void 0;
const OtoGenerator_1 = require("../utils/OtoGenerator");
const userService_1 = require("../services/userService");
const sendEmail_1 = require("../utils/sendEmail");
const httpStatusCode_1 = require("../utils/httpStatusCode");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otp = (0, OtoGenerator_1.otpGenerator)();
        yield (0, sendEmail_1.sendEmail)(req.body.email, otp);
        yield (0, userService_1.registerUser)({
            userName: req.body.userName,
            email: req.body.email,
            phone: req.body.phone,
            DOB: "",
            otp: otp,
            password: req.body.password,
            gender: req.body.gender,
            address: "",
            state: "",
            district: "",
            pincode: 0,
            coachId: ""
        });
        console.log(otp, req.body.email);
        res.status(httpStatusCode_1.HttpStatus.OK).json("OTP sent to email and saved in the database.");
    }
    catch (error) {
        console.error("Error at registering user", error);
        throw new Error("Error at registering");
    }
});
exports.register = register;
const otpVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const result = yield (0, userService_1.verifyOTPService)(email, otp);
        res.status(200).json({ result });
    }
    catch (error) {
        console.error("Error at otpVerification user");
        next(error);
    }
});
exports.otpVerify = otpVerify;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { user, token } = yield (0, userService_1.loginUser)(email, password);
        res.cookie("token", token, {
            sameSite: "strict",
            maxAge: 3600000
        });
        res.status(httpStatusCode_1.HttpStatus.OK).json({ user, token });
    }
    catch (error) {
        console.error("Error at otpVerification user");
        next(error);
    }
});
exports.login = login;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const otp = (0, OtoGenerator_1.otpGenerator)();
        console.log("otp in 1st step", otp);
        const exsitingUser = yield (0, userService_1.checkUser)(email, otp);
        if (!exsitingUser) {
            throw new Error("user not found");
        }
        yield (0, sendEmail_1.sendEmail)(req.body.email, otp);
        res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
    }
    catch (error) {
        console.error("Error at forgotPassword sent otp");
        next(error);
    }
});
exports.forgotPassword = forgotPassword;
const forgotPasswordOTPVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const result = yield (0, userService_1.forgotPassverifyOTPService)(email, otp);
        if (result) {
            res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
        }
    }
    catch (error) {
        console.error("Error at otpVerification user");
        next(error);
    }
});
exports.forgotPasswordOTPVerify = forgotPasswordOTPVerify;
const saveChangePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req reached saveNewPassword');
        const { password, email } = req.body;
        const result = yield (0, userService_1.saveNewPassword)(password, email);
        if (result) {
            res.status(httpStatusCode_1.HttpStatus.OK).json({ success: true });
        }
    }
    catch (error) {
        console.error("new Password saving");
        next(error);
    }
});
exports.saveChangePassword = saveChangePassword;
