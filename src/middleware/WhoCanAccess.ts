import type { NextFunction, Request, Response } from 'express';
import type { AuthInterface } from '../types/index.js';
import createHttpError from 'http-errors';

export default function WhoCanAccess(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const request = req as AuthInterface;
        if (roles.includes(request.auth.role)) {
            return next();
        } else {
            return next(
                createHttpError(
                    402,
                    'You are not authorized to done this action'
                )
            );
        }
    };
}
