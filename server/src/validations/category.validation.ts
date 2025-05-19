import Utils from "@/utils";
import Joi from "joi";

class CategoryValidation {
    static validateCreateCategory(body: any) {
        const schema = Joi.object({
            name: Joi.string()
                .trim()
                .min(2)
                .max(100)
                .messages({
                    'string.base': 'Category name must be a string',
                    'string.empty': 'Category name is required',
                    'string.min': 'Category name must be at least 2 characters',
                    'string.max': 'Category name must not exceed 100 characters',
                }),
            description: Joi.string()
                .trim()
                .max(600)
                .messages({
                    'string.base': 'Category description must be a string',
                    'string.empty': 'Category description is required',
                    'string.max': 'Category description must not exceed 600 characters',
                }),
            agencyId: Joi.number().integer().positive().required()
        })
        return schema.validate(body, Utils.joiDefaultOptions())

    }
    static validateCategoryIdParam(id: any) {
        const schema = Joi.object({
            categoryId: Joi.number().integer().positive().required()
        });
        return schema.validate(id, Utils.joiDefaultOptions())
    }
    static validateUpdateCategory(body: any) {
        const schema = Joi.object({
            name: Joi.string()
                .trim()
                .min(2)
                .max(100)
                .optional(),
            description: Joi.string()
                .trim()
                .max(600)
                .optional()
                .messages({
                    'string.base': 'Category description must be a string',
                    'string.max': 'Category description must not exceed 600 characters',
                }),
            categoryId: Joi.number().integer().positive().required()


        })
        return schema.validate(body, Utils.joiDefaultOptions())
    }

}
export default CategoryValidation;