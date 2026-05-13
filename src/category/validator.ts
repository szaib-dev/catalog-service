import { body } from 'express-validator';
export const RegisterValidation =  [
    body('name')
        .exists()
        .withMessage('Category name is required')
        .isString()
        .withMessage('Message should be in plain format'),
    body('priceConfiguration')
        .exists()
        .withMessage('Price configuration is required'),
    body('priceConfiguration.*.priceType')
        .exists()
        .withMessage('Price type is required')
        .custom((value: 'base' | 'additional') => {
            const validKeys = ['base', 'additional'];
            if (!validKeys.includes(value)) {
                throw new Error('Values should be base or Additional');
            }
        }),
    body('attributes').exists().withMessage('Attributes are requried'),
];

export const UpdateValidation =  [
    body('name')
        .isString()
        .withMessage('Message should be in plain format'),
    body('priceConfiguration.*.priceType')
        .custom((value: 'base' | 'additional') => {
            const validKeys = ['base', 'additional'];
            if (!validKeys.includes(value)) {
                throw new Error('Values should be base or Additional');
            }
        }),
];
