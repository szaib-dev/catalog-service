import { body } from 'express-validator';

export const CreateProductValidation = [
    body('name')
        .exists()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name should be string'),

    body('isPublished').exists().withMessage('isPublished field is missing'),

    body('description')
        .exists()
        .withMessage('Description is required')
        .isString()
        .withMessage('Description should be string'),

    body('priceConfig').exists().withMessage('Price Cofiguration is requrired'),

    body('attributes').exists().withMessage('Attributes are required'),

    body('tenantId').exists().withMessage('Tenant Id is required'),

    body('categoryId').exists().withMessage('Category Id is required'),
];
