import type { Request } from 'express';

export interface AuthInterface extends Request {
    auth: {
        sub: string;
        role: string;
        id?: string;
    };
}

export const UserRole = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    USER: 'USER',
} as const;
