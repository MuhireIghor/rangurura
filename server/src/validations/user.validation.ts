import Utils from "@/utils";
import joi from "joi";
import joiPhone from "joi-phone-number";
import passwordComplexity from 'joi-password-complexity';
import { complexityOptions } from "@/utils/variables";
import { UserRole } from "@prisma/client";


const Joi = joi.extend(joiPhone);
class UserValidation {

    static validateSignupBody(body: any) {
        const schema = Joi.object({
            name: Joi.string().trim().required().label('User Name'),

            email: Joi.string().trim().email().required().label('Email'),

            password: passwordComplexity(complexityOptions, 'Password')
                .trim()
                .required(),

            confirmPassword: Joi.string()
                .required()
                .valid(Joi.ref('password'))
                .label('Confirm Password')
                .messages({ 'any.only': '{{#label}} does not match Password' }),

            phone: Joi.string()
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

        return schema.validate(body, Utils.joiDefaultOptions());
    }

    static validateSignupBodyAsAgencyStaff(body: any) {
        const schema = Joi.object({
            name: Joi.string().trim().required().label('User Name'),

            email: Joi.string().trim().email().required().label('Email'),

            password: passwordComplexity(complexityOptions, 'Password')
                .trim()
                .required(),

            confirmPassword: Joi.string()
                .required()
                .valid(Joi.ref('password'))
                .label('Confirm Password')
                .messages({ 'any.only': '{{#label}} does not match Password' }),

            phone: Joi.string()
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
            agencyId: Joi.number().integer().positive().required().messages({
                'number.base': 'Agency ID must be a number',
                'number.positive': 'Agency ID must be a positive number',
                'any.required': 'Agency ID is required',
            }).label("Agency Id"),
            userId: Joi.number().integer().positive().required().messages({
                'number.base': 'User ID must be a number',
                'number.positive': 'User ID must be a positive number',
                'any.required': 'User ID is required',
            }).label("User Id"),
            position: Joi.string().trim().required().label("Position")
        });

        return schema.validate(body, Utils.joiDefaultOptions());
    }


    static validateLoginBody(body: any) {
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .required()
                .label('Email')
                .messages({
                    'any.required': 'Email is required',
                    'string.email': 'Please provide a valid email address',
                }),

            password: passwordComplexity(complexityOptions, 'Password')
                .trim()
                .required()
                .label('Password')
                .messages({
                    'any.required': 'Password is required',
                }),
        });
        return schema.validate(body, Utils.joiDefaultOptions());


    }
}
export default UserValidation;