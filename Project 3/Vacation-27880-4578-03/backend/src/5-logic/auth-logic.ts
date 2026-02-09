import { ResultSetHeader, RowDataPacket } from "mysql2";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import User from "../4-models/User";
import Credentials from "../4-models/Credentials";
import Role from "../4-models/Role";

async function register(user: User): Promise<string> {
    const error = user.validate();
    if (error) throw { status: 400, message: error };

    const isTaken = await isUsernameTaken(user.username);
    if (isTaken) throw { status: 400, message: `Username ${user.username} already taken` };

    user.passwordHash = await cyber.hash(user.password!);
    user.role = Role.User; // Default role

    const sql = "INSERT INTO users (firstName, lastName, username, passwordHash, role) VALUES(?, ?, ?, ?, ?)";
    const result = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.passwordHash, user.role]) as ResultSetHeader;

    user.id = result.insertId;
    delete user.password;
    delete user.passwordHash; // Don't return password hash

    const token = cyber.getNewToken(user);
    return token;
}

async function login(credentials: Credentials): Promise<string> {
    const error = credentials.validate();
    if (error) throw { status: 400, message: error };

    const sql = "SELECT * FROM users WHERE username = ?";
    const users = await dal.execute(sql, [credentials.username]) as User[];

    if (users.length === 0) throw { status: 401, message: "Incorrect username or password" };

    const user = users[0];
    const isPasswordValid = await cyber.compare(credentials.password, user.passwordHash!);

    if (!isPasswordValid) throw { status: 401, message: "Incorrect username or password" };

    delete user.passwordHash;

    const token = cyber.getNewToken(user);
    return token;
}

async function isUsernameTaken(username: string): Promise<boolean> {
    const sql = "SELECT COUNT(*) as count FROM users WHERE username = ?";
    const result = await dal.execute(sql, [username]) as RowDataPacket[];
    return result[0].count > 0;
}

export default {
    register,
    login
};
