export enum Role {
    Admin = "Admin",
    User = "User"
}

export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string; // Optional because we might not send it back
    role: Role;
    token?: string; // For login response
}

export interface Credentials {
    email: string;
    password?: string;
}
