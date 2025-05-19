import Utils from "@/utils";
import Joi from "joi";

class ResponseValidation {
  static validateCreateResponse(body: any) {
    const schema = Joi.object({
      complaintId: Joi.number().integer().positive().required().messages({
        "any.required": "Complaint ID is required",
        "number.base": "Complaint ID must be a number",
        "number.integer": "Complaint ID must be an integer",
        "number.positive": "Complaint ID must be positive",
      }),

      staffId: Joi.number().integer().positive().required().messages({
        "any.required": "Staff ID is required",
        "number.base": "Staff ID must be a number",
        "number.integer": "Staff ID must be an integer",
        "number.positive": "Staff ID must be positive",
      }),

      content: Joi.string().min(5).max(1000).required().messages({
        "any.required": "Response content is required",
        "string.base": "Content must be a string",
        "string.min": "Content must be at least 5 characters long",
        "string.max": "Content cannot exceed 1000 characters",
      }),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }
  static validateComplaintIdParam(id: any) {
    const schema = Joi.object({
      complaintId: Joi.number().integer().positive().required().messages({
        "any.required": "Complaint ID is required",
        "number.base": "Complaint ID must be a number",
        "number.integer": "Complaint ID must be an integer",
        "number.positive": "Complaint ID must be positive",
      }),
    });
    return schema.validate(id, Utils.joiDefaultOptions());
  }
  static validateResponseIdParam(id: any) {
    const schema = Joi.object({
      responseId: Joi.number().integer().positive().required().messages({
        "any.required": "Response ID is required",
        "number.base": "Response ID must be a number",
        "number.integer": "Response ID must be an integer",
        "number.positive": "Response ID must be positive",
      }),
    });
    return schema.validate(id, Utils.joiDefaultOptions());
  }

  static validateStaffIdParam(id: any) {
    const schema = Joi.object({
      staffId: Joi.number().integer().positive().required().messages({
        "any.required": "Staff ID is required",
        "number.base": "Staff ID must be a number",
        "number.integer": "Staff ID must be an integer",
        "number.positive": "Staff ID must be positive",
      }),
    });
    return schema.validate(id, Utils.joiDefaultOptions());
  }
  static validateApproveSecondLevel(body: any) {
    const schema = Joi.object({
      id: Joi.number().integer().positive().required().messages({
        "any.required": "Complaint ID is required",
        "number.base": "Complaint ID must be a number",
        "number.integer": "Complaint ID must be an integer",
        "number.positive": "Complaint ID must be positive",
      }),

      staffId: Joi.number().integer().positive().required().messages({
        "any.required": "Staff ID is required",
        "number.base": "Staff ID must be a number",
        "number.integer": "Staff ID must be an integer",
        "number.positive": "Staff ID must be positive",
      }),

      approved: Joi.boolean().required().messages({
        "any.required": "Approval decision is required",
        "boolean.base": "Approved must be a boolean value",
      }),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }
  static validateApproveFirstLevel(body: any) {
    const schema = Joi.object({
      id: Joi.number().integer().positive().required().messages({
        "any.required": "Complaint ID is required",
        "number.base": "Complaint ID must be a number",
        "number.integer": "Complaint ID must be an integer",
        "number.positive": "Complaint ID must be positive",
      }),

      staffId: Joi.number().integer().positive().required().messages({
        "any.required": "Staff ID is required",
        "number.base": "Staff ID must be a number",
        "number.integer": "Staff ID must be an integer",
        "number.positive": "Staff ID must be positive",
      }),

      approved: Joi.boolean().required().messages({
        "any.required": "Approval decision is required",
        "boolean.base": "Approved must be a boolean value",
      }),
    });
    return schema.validate(body, Utils.joiDefaultOptions());
  }
}
export default ResponseValidation;
