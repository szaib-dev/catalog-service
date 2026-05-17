import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import Product from './model.js';
import storage from '../../services/storage.js';
import mongoose from 'mongoose';
import { UserRole, type AuthInterface } from '../../types/index.js';

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
        const request = req as AuthInterface;

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

        if (
            request.auth.role === UserRole.ADMIN ||
            (request.auth.tenant && request.auth.tenant.id === tenantId)
        ) {
            const image = req.file;
            if (!mongoose.Types.ObjectId.isValid(categoryId as string)) {
                return next(
                    createHttpError(400, 'Category Id should be valid')
                );
            }
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
        } else {
            return next(
                createHttpError(
                    400,
                    "You don't have permission for this action"
                )
            );
        }
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
        const request = req as AuthInterface;

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return next(createHttpError(400, 'Category Id is not valid'));
        }

        const tenant = await Product.findById(id);

        if (!tenant) {
            return next(
                createHttpError(400, 'No product found with matching id')
            );
        }

        if (
            request.auth.role === UserRole.ADMIN ||
            (request.auth.tenant && request.auth.tenant.id === tenant.tenantId)
        ) {
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

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                {
                    ...(priceConfig && { priceConfig }),
                    ...(isPublished !== undefined && { isPublished }),
                    ...(categoryId && { categoryId }),
                    ...(description && { description }),
                    ...(name && { name }),
                    ...(imageUrl && { imageUrl }),
                    ...(attributes && { attributes }),
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            return res
                .status(200)
                .json({ success: true, product: updatedProduct });
        } else {
            return next(
                createHttpError(
                    403,
                    "You don't have permission for this action"
                )
            );
        }
    } catch (error) {
        return next(new Error(error as string));
    }
};

export const getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(createHttpError(400, 'Product Id is required'));
        }

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return next(createHttpError(400, 'Product Id is not valid'));
        }

        const product = await Product.findById(id);

        if (!product) {
            return next(createHttpError(404, 'Product not found'));
        }

        return res.status(200).json({ success: true, product });
    } catch (error) {
        return next(new Error(error as string));
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const request = req as AuthInterface;

        if (!id) {
            return next(createHttpError(400, 'Product Id is required'));
        }

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return next(createHttpError(400, 'Category Id is not valid'));
        }

        const product = await Product.findById(id);

        if (!product) {
            return next(
                createHttpError(400, 'No product found with matching id')
            );
        }

        if (
            request.auth.role === UserRole.ADMIN ||
            (request.auth.tenant && request.auth.tenant.id === product.tenantId)
        ) {
            await storage.delete(product.imageUrl);

            const deletedProduct = await Product.findByIdAndDelete(id);

            return res.status(200).json({ success: true, deletedProduct });
        } else {
            return next(
                createHttpError(
                    403,
                    "You don't have permission for this action"
                )
            );
        }
    } catch (error) {
        return next(new Error(error as string));
    }
};
