export enum Role {
    Admin = "Admin",
    User = "User"
}

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: Role;
    token?: string;
}

export interface Credentials {
    email: string;
    password?: string;
}
