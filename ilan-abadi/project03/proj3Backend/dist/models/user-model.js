"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class UserModel {
    constructor(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }
    validate() {
        var _a, _b;
        const result = UserModel.validationSchema.validate(this);
        return (_b = (_a = result.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : null;
    }
}
UserModel.validationSchema = joi_1.default.object({
    id: joi_1.default.number().optional().integer().positive(),
    firstName: joi_1.default.string().required().min(2).max(50),
    lastName: joi_1.default.string().required().min(2).max(50),
    username: joi_1.default.string().required().min(4).max(50),
    password: joi_1.default.string().required().min(4).max(255),
    role: joi_1.default.string().optional().valid("User", "Admin")
});
exports.default = UserModel;
