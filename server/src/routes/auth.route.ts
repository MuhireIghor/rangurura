import AuthController from "@/controllers/auth.controller";
import authorizationMiddleware from "@/middleware/authorization.middleware";
import validationMiddleware, { paramValidationMiddleware } from "@/middleware/validation.middleware";
import UserValidation from "@/validations/user.validation";
import { Router } from "express";

const router = Router();

router.post("/signup",
    validationMiddleware(UserValidation.validateSignupBody),
    AuthController.userSignup
);
router.post("/signup/agencyStaff",
    validationMiddleware(UserValidation.validateSignupBodyAsAgencyStaff),
    AuthController.userSignupAsAgencyStaff
);
router.post("/login",
    validationMiddleware(UserValidation.validateLoginBody),
    AuthController.userLogin
)
router.get("/all",
    AuthController.getAllUser
)
router.get("/profile/:email",
    authorizationMiddleware(),
    paramValidationMiddleware(UserValidation.validateGetUserProfilePayload),
    AuthController.getUserProfile
)
export default router;