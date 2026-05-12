import mongoose from "mongoose";

interface CategoryInterface {
    name: string,
    priceConfig: {
        [key: string]: {
            priceType: "base" | "additional",
            availableOptions: string[]
        }
    },
    attributes: [{
        name: string,
        widgetType: "radio" | 'switch',
        defaultValue: string,
        availableOptions: string[]
    }]
}
const PriceCategoryScheam = new mongoose.Schema({
    priceType: {
        type: String,
        enum: ["base", "additional"],
        requried: true
    },
    widgetType: {
        type: String,
        enum: ["radio" , "switch"],
        required: true
    },
    defaultValue: {
        type: String,
        required: true
    },
    availabelOptions: {
        type: Array,
        required: true
    }
})

const AttributeCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    availabelOptions: {
        type: Array,
        required: true
    }
})

const CategorySchema = new mongoose.Schema<CategoryInterface>({
  name: {
    type: String
  },
  priceConfig: {
     type: Map,
     of: PriceCategoryScheam,
     required: true
  },
  attributes: [AttributeCategorySchema]
})

export default mongoose.model<CategoryInterface>("Category", CategorySchema)