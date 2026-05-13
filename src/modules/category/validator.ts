import { body } from 'express-validator';

export const RegisterValidation = [
    body('name')
        .exists()
        .withMessage('Category name is required')
        .bail()
        .isString()
        .withMessage('Category name must be in plain text'),
    body('priceConfig')
        .exists()
        .withMessage('Price configuration is required')
        .bail()
        .isObject()
        .withMessage('Price configuration must be an object'),
    body('priceConfig.*.priceType')
        .exists()
        .withMessage('Price type is required')
        .bail()
        .isIn(['base', 'additional'])
        .withMessage('Values should be base or additional'),
    body('priceConfig.*.availableOptions')
        .exists()
        .withMessage('Available options are required')
        .bail()
        .isArray()
        .withMessage('Available options must be an array'),
    body('priceConfig.*.availableOptions.*')
        .isString()
        .withMessage('Each available option must be a string'),
    body('attributes')
        .exists()
        .withMessage('Attributes are required')
        .bail()
        .isArray()
        .withMessage('Attributes must be an array'),
    body('attributes.*.name')
        .exists()
        .withMessage('Attribute name is required')
        .bail()
        .isString()
        .withMessage('Attribute name must be a string'),
    body('attributes.*.widgetType')
        .exists()
        .withMessage('Widget type is required')
        .bail()
        .isIn(['radio', 'switch'])
        .withMessage('Widget type must be radio or switch'),
    body('attributes.*.defaultValue')
        .exists()
        .withMessage('Default value is required')
        .bail()
        .isString()
        .withMessage('Default value must be a string'),
    body('attributes.*.availableOptions')
        .exists()
        .withMessage('Attribute available options are required')
        .bail()
        .isArray()
        .withMessage('Attribute available options must be an array'),
    body('attributes.*.availableOptions.*')
        .isString()
        .withMessage('Each attribute available option must be a string'),
];

export const UpdateValidation = [
    body('name')
        .optional()
        .isString()
        .withMessage('Category name must be in plain text'),
    body('priceConfig')
        .optional()
        .isObject()
        .withMessage('Price configuration must be an object'),
    body('priceConfig.*.priceType')
        .optional()
        .isIn(['base', 'additional'])
        .withMessage('Values should be base or additional'),
    body('priceConfig.*.availableOptions')
        .optional()
        .isArray()
        .withMessage('Available options must be an array'),
    body('priceConfig.*.availableOptions.*')
        .optional()
        .isString()
        .withMessage('Each available option must be a string'),
    body('attributes')
        .optional()
        .isArray()
        .withMessage('Attributes must be an array'),
    body('attributes.*.name')
        .optional()
        .isString()
        .withMessage('Attribute name must be a string'),
    body('attributes.*.widgetType')
        .optional()
        .isIn(['radio', 'switch'])
        .withMessage('Widget type must be radio or switch'),
    body('attributes.*.defaultValue')
        .optional()
        .isString()
        .withMessage('Default value must be a string'),
    body('attributes.*.availableOptions')
        .optional()
        .isArray()
        .withMessage('Attribute available options must be an array'),
    body('attributes.*.availableOptions.*')
        .optional()
        .isString()
        .withMessage('Each attribute available option must be a string'),
];
