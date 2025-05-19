import ResponseController from "@/controllers/response.controller";
import authorizationMiddleware from "@/middleware/authorization.middleware";
import validationMiddleware, { paramValidationMiddleware } from "@/middleware/validation.middleware";
import ResponseValidation from "@/validations/response.validation";
import { Router } from "express";

const router = Router();

router.post(
  "/:complaintId/respond",
  authorizationMiddleware(),
  paramValidationMiddleware(ResponseValidation.validateComplaintIdParam),
  validationMiddleware(ResponseValidation.validateCreateResponse),
  ResponseController.createResponse
);
router.get("/all",
    ResponseController.listResponses
),
router.get("/:responseId",
    paramValidationMiddleware(ResponseValidation.validateResponseIdParam),
    ResponseController.getResponseById
)
router.put("/:responseId",
  ResponseController.updateResponse
);

router.get("/by-staff/:staffId",
    validationMiddleware(ResponseValidation.validateStaffIdParam),
    ResponseController.fetchResponsesByStaff
)
router.get("/by-complaint/:complaintId",
    paramValidationMiddleware(ResponseValidation.validateComplaintIdParam),
    ResponseController.fetchResponsesByComplaint
)



export default router;
