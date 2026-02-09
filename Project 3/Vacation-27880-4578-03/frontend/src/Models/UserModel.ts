export default interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password?: string; // Optional for received user, required for registration
    role: string;
}
