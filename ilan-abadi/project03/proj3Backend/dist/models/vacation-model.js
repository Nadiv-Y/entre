"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class VacationModel {
    constructor(vacation) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.picture = vacation.picture;
        this.image = vacation.image;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
    }
    validate() {
        var _a, _b;
        const result = VacationModel.validationSchema.validate(this);
        return (_b = (_a = result.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : null;
    }
}
VacationModel.validationSchema = joi_1.default.object({
    id: joi_1.default.number().optional().integer().positive(),
    description: joi_1.default.string().required().min(5).max(1000),
    destination: joi_1.default.string().required().min(2).max(100),
    picture: joi_1.default.string().optional().max(255),
    image: joi_1.default.object().optional(),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().required().min(joi_1.default.ref('startDate')),
    price: joi_1.default.number().required().min(0).max(100000)
});
exports.default = VacationModel;
