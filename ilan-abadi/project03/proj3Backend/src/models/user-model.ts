import Joi from "joi";

class UserModel {
    public id?: number;
    public firstName?: string;
    public lastName?: string;
    public username?: string;
    public password?: string;
    public role?: string;

    public constructor(user: Partial<UserModel>) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    private static validationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(4).max(50),
        password: Joi.string().required().min(4).max(255),
        role: Joi.string().optional().valid("User", "Admin")
    });

    public validate(): string | null {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message ?? null;
    }
}

export default UserModel;
