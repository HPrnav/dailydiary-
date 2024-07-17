"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInput = exports.createInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    name: zod_1.default.string(),
    password: zod_1.default.string().min(5)
});
exports.signinInput = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(5)
});
exports.createInput = zod_1.default.object({
    content: zod_1.default.string().min(1),
    title: zod_1.default.string().min(1)
});
exports.updateInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.number()
});