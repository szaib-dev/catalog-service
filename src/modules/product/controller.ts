import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import Product from './model.js';
import storage from '../../services/storage.js';

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
            priceConfig: jsonPriceConfigFormat,
            attributes,
            categoryId,
            tenantId,
        } = req.body;

        const priceConfig = JSON.parse(jsonPriceConfigFormat);

        const image = req.file;

        console.log(image);
        if (!image) {
            return next(createHttpError(400, 'Image is required'));
        }

        const imageUrl = await storage.upload(
            image,
            image.originalname as string
        );

        const product = await Product.create({
            name,
            description,
            attributes,
            categoryId,
            isPublished,
            priceConfig,
            imageUrl,
            tenantId,
        });

        return res.status(201).json({ success: true, product });
    } catch (error) {
        return next(new Error(error as string));
    }
};
