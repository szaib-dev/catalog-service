import mongoose from 'mongoose';

const PriceConfigSchema = new mongoose.Schema({
    priceType: {
        type: String,
        enum: ['additional', 'base'],
    },
    availableOptions: {
        type: Map,
        of: Number,
    },
});

const AttributeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
    },
});

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isPublished: { type: Boolean, default: false, required: true },
    imageUrl: { type: String, required: true },
    priceConfig: {
        type: Map,
        of: PriceConfigSchema,
    },
    attributes: {
        type: Map,
        of: AttributeSchema,
    },
    tenantId: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
