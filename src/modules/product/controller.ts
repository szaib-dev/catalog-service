import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import Product from './model.js';
import storage from '../../services/storage.js';
import mongoose from 'mongoose';

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

export const updateProduct = async (
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
        } = req.body;

        const priceConfig = jsonPriceConfigFormat
            ? JSON.parse(jsonPriceConfigFormat)
            : undefined;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return next(createHttpError(400, 'Category Id is not valid'));
        }

        const image = req.file;
        let imageUrl;

        if (image) {
            const currentProduct = await Product.findById(id);

            const ImageKeyId = currentProduct?.imageUrl;
            if (ImageKeyId) {
                await storage.delete(ImageKeyId as string);
            }

            imageUrl = await storage.upload(
                image,
                image.originalname as string
            );
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            ...(priceConfig && { priceConfig }),
            ...(isPublished && { isPublished }),
            ...(categoryId && { categoryId }),
            ...(description && { description }),
            ...(name && { name }),
            ...(imageUrl && { imageUrl }),
            ...(attributes && { attributes }),
        });

        return res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        return next(new Error(error as string));
    }
};
