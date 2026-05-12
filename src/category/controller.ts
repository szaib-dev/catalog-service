import type { NextFunction, Request, Response } from 'express';

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
        return;
    }
};
