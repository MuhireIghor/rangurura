import httpStatus from 'http-status';
import { AuthService } from "@/services/auth.service";
import ResponseService from "@/services/response.service";
import logger from "@/utils/logger.utils";
const authLogger = logger("auth")

class AuthController {
    static async userSignup(req, res, next): Promise<any> {
        try {
            const payload = req.body;
            const newUser = await AuthService.register(payload);
            authLogger.info(newUser);
            return ResponseService.handleSuccessResponse(
                httpStatus.CREATED,
                "Successfully Created Account",
                newUser,
                res
            )

        }
        catch (error) {
            next(error)
        }

    }
    static async userSignupAsAgencyStaff(req, res, next): Promise<any> {
        try {
            const payload = req.body;
            const newUser = await AuthService.registerAgencyStaff(payload);
            authLogger.info(newUser);
            return ResponseService.handleSuccessResponse(
                httpStatus.CREATED,
                "Successfully Created Account",
                newUser,
                res
            )

        }
        catch (error) {
            next(error)
        }

    }

    static async userLogin(req, res, next): Promise<any> {
        try {
            const { email, password } = req.body;
            const response = await AuthService.login(email, password);
            return ResponseService.handleSuccessResponse(
                httpStatus.OK,
                "Successfully  Logged In",
                response,
                res
            )

        }
        catch (error) {
            next(error);
        }
    }

    static async getAllUser (req,res,next):Promise<any>{
        try{
            const response = await AuthService.getAllUsers();
            authLogger.info(response);
            return ResponseService.handleSuccessResponse(
                httpStatus.OK,
                "Successfully Fetched Users",
                response,
                res
            )

        }
        catch(error){
            next(error)
        }
    }

}
export default AuthController;