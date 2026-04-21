import Joi from "joi";
import { UploadedFile } from "express-fileupload";

class VacationModel {
    public id?: number;
    public description: string;
    public destination: string;
    public picture?: string;
    public image?: UploadedFile; // From express-fileupload
    public startDate: string; // Stored as ISO string or Date
    public endDate: string;
    public price: number;

    public constructor(vacation: any) {
        this.id = vacation.id;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.picture = vacation.picture;
        this.image = vacation.image;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
    }

    private static validationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        description: Joi.string().required().min(5).max(1000),
        destination: Joi.string().required().min(2).max(100),
        picture: Joi.string().optional().max(255),
        image: Joi.object().optional(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().min(Joi.ref('startDate')),
        price: Joi.number().required().min(0).max(100000)
    });

    public validate(): string | null {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message ?? null;
    }
}

export default VacationModel;
