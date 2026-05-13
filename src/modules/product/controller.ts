import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import Product from './model.js';

export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // validation
        const valid = validationResult(req);
        if (!valid.isEmpty()) {
            return next(createHttpError(400, valid.array()[0]?.msg));
        }

        // values
        const {
            name,
            description,
            isPublished,
            imageUrl,
            priceConfig,
            attributes,
            categoryId,
            tenantId,
        } = req.body;

        const product = await Product.create({
            name,
            description,
            attributes,
            categoryId,
            imageUrl,
            isPublished,
            priceConfig,
            tenantId,
        });

        return res.status(201).json({ success: true, product });
    } catch (error) {
        return next(new Error(error as string));
    }
};
