import ResponseService from '@/services/response.service';
import status from 'http-status';


/**
 * creates errors that will be added to the request response
 * @param {Object} joiError  joi error object
 * @param {Boolean} withFields   wether errors should be mapped with fields in output
 * @returns {Object} middleware response body
 */
function errorMessages(joiError, withFields) {
  if (withFields) {
    const errors = {};
    // build errors object keys
    joiError.details.forEach((error) => {
      if (!errors[error.context.key]) {
        errors[error.context.key] = [];
      }
    });
    //  add errors to object keys
    joiError.details.forEach((error) => {
      errors[error.context.key].push(error.message);
    });
    return errors;
  }
  return joiError.details.map((e) => e.message);
}

export default (validator: any, withFields = false): any => {
  return (req: any, res: any, next: any) => {
    try {
      const validate = validator(req.body);
      if (validate.error) {
        return ResponseService.handleErrorResponse(
          status.BAD_REQUEST,
          errorMessages(validate.error, withFields),
          res,
        );
      }
      req.body = validate.value;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export const paramValidationMiddleware = (
  validator,
  addParamToBody = true,
  withFields = false,
) :any=> {
  return (req, res, next) => {
    try {
      const validate = validator(req.params);
      if (validate.error) {
        return ResponseService.handleErrorResponse(
          status.BAD_REQUEST,
          errorMessages(validate.error, withFields),
          res,
        );
      }
      if (addParamToBody) {
        req.body = { ...req.body, ...validate.value };
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export const paramBodyValidationMiddleware = (
  validator,
  withFields = false,
) => {
  return (req, res, next) => {
    try {
      const validate = validator({ ...req.params, ...req.body });
      if (validate.error) {
        return ResponseService.handleErrorResponse(
          status.BAD_REQUEST,
          errorMessages(validate.error, withFields),
          res,
        );
      }
      req.body = validate.value;
      next();
    } catch (err) {
      next(err);
    }
  };
};
