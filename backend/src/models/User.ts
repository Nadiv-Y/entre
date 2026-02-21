export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    password?: string; // Optional because we usually don't want to send this to the client
    role: 'Admin' | 'User'; // Added role based on project requirements
}
