import Joi from "joi";
import Role from "./Role";

class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password?: string; // Incoming password (plaintext)
    public passwordHash?: string; // Stored hash
    public role: Role;
    public createdAt?: string;

    public constructor(user: User) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.passwordHash = user.passwordHash;
        this.role = user.role;
        this.createdAt = user.createdAt;
    }

    public static validationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(2).max(100),
        password: Joi.string().required().min(4).max(255),
        role: Joi.string().optional().valid(Role.User, Role.Admin),
        passwordHash: Joi.string().optional(),
        createdAt: Joi.string().optional()
    });

    public validate(): string | undefined {
        const result = User.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default User;
