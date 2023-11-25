import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if(!name) {
            return res.send({
                success: false,
                message: 'Name is required'
            });
        }

        // check for existing
        const isExist = await categoryModel.findOne({ name });

        if (isExist) {
            return res.send({
                success: false,
                message: 'Category already exist'
            });
        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save();

        return res.status(200).send({
            success: true,
            message: 'New category created',
            category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: 'Failed to create category'
        })
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { name, id } = req.body;
        await categoryModel.findByIdAndUpdate({_id: id}, { name, slug: slugify(name)}, {new: true});
        const category = await categoryModel.findOne({ _id: id });

        return res.status(200).send({
            success: true,
            message: 'Category updated successfully!',
            category
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to update category',
            error
        })
    }
}

export const getAllCategoriesController = async (req, res) => {
    try {
       const categories = await categoryModel.find();
        if (!categories) {
            return res.send({
                success: false,
                message: 'No categories found.'
            });
        }
       return res.status(200).send({
            success: true,
            message: 'All categories retrieved!',
            categories
       })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: 'Failed to get all categories',
            error
        })
    }
};

export const getCategoryController = async (req, res) => {
    try {
       const { name } = req.body;
       const category = await categoryModel.findOne({ name });
        if (!category) {
            return res.send({
                success: false,
                message: 'No such category found.'
            });
        }
       return res.status(200).send({
            success: true,
            message: 'Category retrieved!',
            category
       })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: 'Failed to get category',
            error
        })
    }
};

export const deleteCategoryController = async (req, res) => {
    try {
       const { name } = req.body;
       await categoryModel.findOneAndDelete({ name });
       return res.status(200).send({
            success: true,
            message: 'Category deleted!'
       })
    } catch (error) {
        return res.status(500).send({
            status: false,
            message: 'Failed to delete category',
            error
        })
    }
};