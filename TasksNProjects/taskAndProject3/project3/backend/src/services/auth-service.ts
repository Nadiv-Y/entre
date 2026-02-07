import { execute } from "../dal/dal";
import { User, Role, Credentials } from "../models/user";
import cyber from "../utils/cyber";

const register = async (user: User): Promise<string> => {
    // 1. Hash password
    user.password = cyber.hashPassword(user.password!);

    // 2. Create sql
    // Note: 'role' defaults to 'User' in DB, but we can be explicit or let DB handle it.
    // We'll let DB handle 'User' default if not provided, or force it.
    // The user object coming in might not have role set. 
    const role = Role.User;

    const sql = `
        INSERT INTO users (firstName, lastName, email, password, role)
        VALUES (?, ?, ?, ?, ?)
    `;

    // 3. Execute
    const info: any = await execute(sql, [user.firstName, user.lastName, user.email, user.password, role]);

    // 4. Generate token
    user.userId = info.insertId;
    user.role = role;
    const token = cyber.getNewToken(user);
    return token;
};

const login = async (credentials: Credentials): Promise<string> => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const users = await execute(sql, [credentials.email]);

    if (users.length === 0) return "";

    const user = users[0];

    // Check password
    if (!cyber.comparePassword(credentials.password!, user.password)) {
        return "";
    }

    // Generate token
    // Don't return password in token
    delete user.password;
    const token = cyber.getNewToken(user);
    return token;
};

export default {
    register,
    login
};
