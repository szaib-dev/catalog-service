import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import Category from './model.js';

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const valid = validationResult(req);
        if (!valid.isEmpty) {
            createHttpError(400, valid.array()[0]?.msg as string);
        }
        const { name, priceConfig, attributes } = req.body;

        const category = await Category.create({
            name,
            priceConfig,
            attributes,
        });

        return res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category,
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
        return;
    }
};
