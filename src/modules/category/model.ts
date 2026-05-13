import mongoose from 'mongoose';
import type { Attribute, CategoryInterface, PriceConfig } from './types.js';

const PriceCategoryScheam = new mongoose.Schema<PriceConfig>({
    priceType: {
        type: String,
        enum: ['base', 'additional'],
        required: true,
    },
    availableOptions: {
        type: [String],
        required: true,
    },
});

const AttributeCategorySchema = new mongoose.Schema<Attribute>({
    name: {
        type: String,
        required: true,
    },

    availableOptions: {
        type: [String],
        required: true,
    },
    widgetType: {
        type: String,
        enum: ['radio', 'switch'],
        required: true,
    },
    defaultValue: {
        type: String,
        required: true,
    },
});

const CategorySchema = new mongoose.Schema<CategoryInterface>({
    name: {
        type: String,
    },
    priceConfig: {
        type: Map,
        of: PriceCategoryScheam,
        required: true,
    },
    attributes: [AttributeCategorySchema],
});
const Category = mongoose.model<CategoryInterface>('Category', CategorySchema);
export default Category;
