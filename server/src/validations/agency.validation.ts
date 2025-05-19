import joi from "joi";
import joiPhone from "joi-phone-number";
import Utils from "@/utils";

const Joi = joi.extend(joiPhone);
class AgencyValidation {
    static validateCreateAgency(body: any) {
        const schema = Joi.object({
            name: Joi.string()
                .trim()
                .min(2)
                .max(100)
                .required()
                .messages({
                    'string.base': 'Agency name must be a string',
                    'string.empty': 'Agency name is required',
                    'string.min': 'Agency name must be at least 2 characters',
                    'string.max': 'Agency name must not exceed 100 characters',
                }),

            description: Joi.string()
                .max(600)
                .allow(null, '')
                .messages({
                    'string.max': 'Description must not exceed 600 characters',
                }),

            contactEmail: Joi.string()
                .email()
                .required()
                .messages({
                    'string.email': 'Contact email must be a valid email address',
                    'any.required': 'Contact email is required',
                }),

            contactPhone: Joi.string()
                .trim()
                .phoneNumber({
                    defaultCountry: 'RW',
                    format: 'e164',
                    strict: true,
                })
                .optional()
                .messages({
                    'phoneNumber.invalid': 'Phone number did not seem to be a valid phone number',
                }),
        });
        return schema.validate(body, Utils.joiDefaultOptions())
    }

    static validateAgencyIdParam(id:any){
        const schema = Joi.object({
            agencyId:Joi.number().integer().positive().required()
        });
        return schema.validate(id, Utils.joiDefaultOptions())
    }
 

}

export default AgencyValidation;