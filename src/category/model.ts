import mongoose from 'mongoose';
import type { Attribute, CategoryInterface, PriceConfig } from './types.js';

const PriceCategoryScheam = new mongoose.Schema<PriceConfig>({
    priceType: {
        type: String,
        enum: ['base', 'additional'],
        requried: true,
    },
    availabelOptions: {
        type: Array,
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

export default mongoose.model<CategoryInterface>('Category', CategorySchema);
