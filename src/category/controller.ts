import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import Category from './model.js';
import mongoose from 'mongoose';

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // validation
        const valid = validationResult(req);
        if (!valid.isEmpty()) {
            return next(createHttpError(400, valid.array()[0]?.msg as string));
        }

        // values
        const { name, priceConfig, attributes } = req.body;

        const category = await Category.create({
            name,
            priceConfig,
            attributes,
        });

        return res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category,
        });
    } catch (error) {
        next(error);
        return;
    }
};

export const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // validation
        const valid = validationResult(req);
        if (!valid.isEmpty()) {
            return next(createHttpError(400, valid.array()[0]?.msg as string));
        }

        // values
        const { id } = req.params;
        const { name, priceConfig, attributes } = req.body;

        if (!id) {
            return next(
                createHttpError(400, 'Id is requried for updating any category')
            );
        }

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return next(createHttpError(400, 'Invalid category id'));
        }

        if (
            name === undefined &&
            priceConfig === undefined &&
            attributes === undefined
        ) {
            return next(createHttpError(400, 'Data is required to update'));
        }

        const updateCategory = await Category.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(priceConfig && { priceConfig }),
                ...(attributes && { attributes }),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updateCategory) {
            return next(
                createHttpError(
                    404,
                    'Something went wrong while updating try again.'
                )
            );
        }
        return res.status(200).json({ category: updateCategory });
    } catch (error) {
        return next(new Error(error as string));
    }
};

export const findCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // values
        const { id } = req.params;

        if (!id) {
            return next(
                createHttpError(400, 'Id is requried for updating any category')
            );
        }

        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return next(createHttpError(400, 'Invalid category id'));
        }

        const findCategoryById = await Category.findById(id);

        if (!findCategoryById) {
            return next(
                createHttpError(
                    404,
                    'Something went wrong while updating try again.'
                )
            );
        }
        return res.status(200).json({ category: findCategoryById });
    } catch (error) {
        return next(new Error(error as string));
    }
};

export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(
                createHttpError(400, 'Id is required for updating any category')
            );
        }
        if (!mongoose.Types.ObjectId.isValid(id as string)) {
            return next(createHttpError(400, 'Invalid category id'));
        }

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return next(
                createHttpError(404, {
                    success: false,
                    message: 'Category not found',
                })
            );
        }

        return res
            .status(200)
            .json({ success: true, message: 'category deleted successfully' });
    } catch (error) {
        return next(new Error(error as string));
    }
};

export const listCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const list = await Category.find({});
        if (!list) {
            return next(createHttpError(404, 'no list found'));
        }

        return res.status(200).json({ list });
    } catch (error) {
        return next(new Error(error as string));
    }
};
