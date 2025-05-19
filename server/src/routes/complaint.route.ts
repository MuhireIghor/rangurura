import ComplaintController from "@/controllers/complaint.controller";
import authorizationMiddleware from "@/middleware/authorization.middleware";
import validationMiddleware, { paramValidationMiddleware } from "@/middleware/validation.middleware";
import ComplaintValidation from "@/validations/complaint.validation";
import { Router } from "express";

const router = Router();

router.post("/",
    validationMiddleware(ComplaintValidation.validateCreateComplaint),
    ComplaintController.createComplaint
)
router.get("/all",
    ComplaintController.listComplaints
)
router.get("/all-complaints/:complaintId",
    paramValidationMiddleware(ComplaintValidation.validateComplaintIdParam),
    ComplaintController.getComplaintById
)
router.get("/all-complaints-by-user/:userId",
    paramValidationMiddleware(ComplaintValidation.validateUserIdParam),
    ComplaintController.getAllComplaintsByUser
)
router.put("/:complaintId",
    paramValidationMiddleware(ComplaintValidation.validateComplaintIdParam),
    validationMiddleware(ComplaintValidation.validateUpdateComplaintPayload),
    ComplaintController.updateComplaint
)

router.put('/escalate/:complaintId',
    authorizationMiddleware(),
    paramValidationMiddleware(ComplaintValidation.validateComplaintIdParam),
    ComplaintController.escalateComplaint
)
router.put('/mark-as-under-review/:complaintId',
    paramValidationMiddleware(ComplaintValidation.validateComplaintIdParam),
    ComplaintController.markAsUnderReview
)
router.put('/mark-as-responded/:complaintId',
    ComplaintController.markAsResponded
)
router.put('/mark-as-resolved/:complaintId',
    ComplaintController.markAsResolved
)




export default router;
