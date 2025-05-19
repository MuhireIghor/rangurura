import Utils from "@/utils";
import { ComplaintPriority } from "@prisma/client";
import Joi from "joi";
class ComplaintValidation {
  static validateCreateComplaint(body: any) {
    const schema = Joi.object({
      title: Joi.string().trim().min(3).max(150).required().messages({
        "string.base": "Title must be a string",
        "string.empty": "Title is required",
        "string.min": "Title must be at least 3 characters long",
        "string.max": "Title must be at most 150 characters long",
        "any.required": "Title is required",
      }),

      description: Joi.string().trim().min(10).max(1000).required().messages({
        "string.base": "Description must be a string",
        "string.empty": "Description is required",
        "string.min": "Description must be at least 10 characters long",
        "string.max": "Description must be at most 1000 characters long",
        "any.required": "Description is required",
      }),

      location: Joi.string().trim().max(255).allow(null, "").messages({
        "string.max": "Location must not exceed 255 characters",
      }),

      priority: Joi.string()
        .valid(...Object.values(ComplaintPriority))
        .default(ComplaintPriority.MEDIUM)
        .messages({
          "any.only": `Priority must be one of: ${Object.values(ComplaintPriority).join(", ")}`,
        }),

      userId: Joi.number().integer().positive().required().messages({
        "number.base": "User ID must be a number",
        "number.integer": "User ID must be an integer",
        "number.positive": "User ID must be a positive number",
        "any.required": "User ID is required",
      }),

      categoryId: Joi.number().integer().positive().required().messages({
        "number.base": "Category ID must be a number",
        "number.integer": "Category ID must be an integer",
        "number.positive": "Category ID must be a positive number",
        "any.required": "Category ID is required",
      }),

      agencyId: Joi.number().integer().positive().required().messages({
        "number.base": "Agency ID must be a number",
        "number.integer": "Agency ID must be an integer",
        "number.positive": "Agency ID must be a positive number",
        "any.required": "Agency ID is required",
      }),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }

  static validateComplaintIdParam(id: any) {
    const schema = Joi.object({
      complaintId: Joi.number().integer().positive().required(),
    });
    return schema.validate(id, Utils.joiDefaultOptions());
  }
  static validateUserIdParam(id: any) {
    const schema = Joi.object({
      userId: Joi.number().integer().positive().required(),
    });
    return schema.validate(id, Utils.joiDefaultOptions());
  }

  static validateEscaleToNextLevelPayload(body: any) {
    const schema = Joi.object({
      complaintId: Joi.number().integer().positive().required().messages({
        "any.required": "Complaint ID is required",
        "number.base": "Complaint ID must be a number",
        "number.integer": "Complaint ID must be an integer",
        "number.positive": "Complaint ID must be positive",
      }),

      userId: Joi.number().integer().positive().required().messages({
        "any.required": "User ID is required",
        "number.base": "User ID must be a number",
        "number.integer": "User ID must be an integer",
        "number.positive": "User ID must be positive",
      }),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }
  static validateUpdateComplaintPayload(body: any) {
    const schema = Joi.object({
      title: Joi.string().trim().min(3).max(150).optional().messages({
        "string.base": "Title must be a string",
        "string.empty": "Title is required",
        "string.min": "Title must be at least 3 characters long",
        "string.max": "Title must be at most 150 characters long",
        "any.required": "Title is required",
      }),

      description: Joi.string().trim().min(10).max(1000).optional().messages({
        "string.base": "Description must be a string",
        "string.empty": "Description is required",
        "string.min": "Description must be at least 10 characters long",
        "string.max": "Description must be at most 1000 characters long",
        "any.required": "Description is required",
      }),

      location: Joi.string().trim().max(255).allow(null, "").messages({
        "string.max": "Location must not exceed 255 characters",
      }),

      priority: Joi.string()
        .valid(...Object.values(ComplaintPriority))
        .default(ComplaintPriority.MEDIUM)
        .messages({
          "any.only": `Priority must be one of: ${Object.values(ComplaintPriority).join(", ")}`,
        }),

      categoryId: Joi.number().integer().positive().optional().messages({
        "number.base": "Category ID must be a number",
        "number.integer": "Category ID must be an integer",
        "number.positive": "Category ID must be a positive number",
        "any.required": "Category ID is required",
      }),

      agencyId: Joi.number().integer().positive().optional().messages({
        "number.base": "Agency ID must be a number",
        "number.integer": "Agency ID must be an integer",
        "number.positive": "Agency ID must be a positive number",
        "any.required": "Agency ID is required",
      }),
      complaintId: Joi.number().integer().positive().required().messages({
        "any.required": "Complaint ID is required",
        "number.base": "Complaint ID must be a number",
        "number.integer": "Complaint ID must be an integer",
        "number.positive": "Complaint ID must be positive",
      }),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }
}
export default ComplaintValidation;
