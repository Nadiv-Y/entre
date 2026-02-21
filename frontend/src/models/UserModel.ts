export class UserModel {
    id: number = 0;
    first_name: string = "";
    last_name: string = "";
    username: string = "";
    password?: string = "";
    role: "Admin" | "User" = "User";
    token: string = "";
}
