import httpStatus from "http-status"
import ResponseService from "@/services/response.service";
import TokenService from "@/services/token.service";
import { JsonWebTokenError } from "jsonwebtoken"
import { config } from "dotenv";
config();
export default () => {
    /**
     * Authorize a user to access a protected route
     * @param  {Object} req
     * @param  {Object} res
     * @param  {Function} next
     * @return {Object} object
     */
    return (req, res, next):any=> {
        try {
            const bearerHeader = req.headers.authorization;
            if (bearerHeader) {
                const bearerToken = bearerHeader.split(' ')[1];
                req.token = bearerToken;
                
                const tokenVerification = TokenService.verifyToken(bearerToken);
                if (tokenVerification instanceof JsonWebTokenError) {
                    return ResponseService.handleErrorResponse(
                        httpStatus.UNAUTHORIZED,
                        `Unauthorized, Bearer Token Verification: ${tokenVerification.message}`,
                        res,
                    );
                }
                console.log("here is the token verification", tokenVerification);
                req.userData = tokenVerification;
                next();
            } else {
                return ResponseService.handleErrorResponse(
                    httpStatus.FORBIDDEN,
                    'You can not proceed without setting authorization token',
                    res,
                );
            }
        } catch (err) {
            next(err);
        }
    };
};