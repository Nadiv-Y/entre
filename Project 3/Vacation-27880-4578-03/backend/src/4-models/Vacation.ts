import Joi from "joi";
// import { UploadedFile } from "express-fileupload"; // Removed

class Vacation {
    public id: number;
    public destination: string;
    public description: string;
    public fromDate: string;
    public toDate: string;
    public price: number;
    public imageName: string;
    public image?: any; // Multer file object

    public constructor(vacation: Vacation) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.fromDate = vacation.fromDate;
        this.toDate = vacation.toDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }

    public static validationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(100),
        description: Joi.string().required().min(2),
        fromDate: Joi.date().required(),
        toDate: Joi.date().required().greater(Joi.ref("fromDate")),
        price: Joi.number().required().positive().max(10000),
        imageName: Joi.string().optional().max(255),
        image: Joi.object().optional() // Validate manually for update vs create
    });

    public validate(): string | undefined {
        const result = Vacation.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default Vacation;
