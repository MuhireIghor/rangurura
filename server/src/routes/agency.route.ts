import AgencyController from "@/controllers/agency.controller";
import validationMiddleware, { paramValidationMiddleware } from "@/middleware/validation.middleware";
import AgencyValidation from "@/validations/agency.validation";
import { Router } from "express";
const router = Router();

router.post("/",
    validationMiddleware(AgencyValidation.validateCreateAgency),
    AgencyController.createNewAgency
)
router.get("/",
    AgencyController.listAgencies
)
router.get("/:agencyId",
    paramValidationMiddleware(AgencyValidation.validateAgencyIdParam),
    AgencyController.getAgencyById
)

export default router;
