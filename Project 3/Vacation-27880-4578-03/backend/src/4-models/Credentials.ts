import Joi from "joi";

class Credentials {
    public username: string;
    public password: string;

    public constructor(credentials: Credentials) {
        this.username = credentials.username;
        this.password = credentials.password;
    }

    public static validationSchema = Joi.object({
        username: Joi.string().required().min(2).max(100),
        password: Joi.string().required().min(4).max(255)
    });

    public validate(): string | undefined {
        const result = Credentials.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default Credentials;
