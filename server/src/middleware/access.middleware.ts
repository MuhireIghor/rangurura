import HttpStatus from "http-status";
import ResponseService from "@/services/response.service";

/**
 * Restrict endpoint access based on user roles
 * @param  {Array|String} allowedRoles rolenames string array or one role string
 * @return {Function} access restriction middleware
 */
export default (allowedRoles) => {
    return (req, res, next) => {
        try {
            const roles:any = [].concat(allowedRoles);
            const { userData } = req;
            if (!roles.includes(userData.role)) {
                return ResponseService.handleErrorResponse(
                    HttpStatus.FORBIDDEN,
                    `User with role (${userData.role}) cannot access this endpoint restricted only to ${roles.join(
                        ' , ',
                    )}`,
                    res,
                );
            }
            next();
        } catch (err) {
            next(err);
        }
    };
};