
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    label: { type: String, required: true },
}, { timestamps: true });

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel
