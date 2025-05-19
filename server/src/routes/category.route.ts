import validationMiddleware, { paramValidationMiddleware } from "@/middleware/validation.middleware";
import CategoryValidation from "@/validations/category.validation";
import { Router } from "express";
import CategoryController from "@/controllers/category.controller";
const router = Router();

router.post("/",
    validationMiddleware(CategoryValidation.validateCreateCategory),
    CategoryController.createCategory
)
router.get("/all",
    CategoryController.listCategories
)
router.get("/all-categories/:categoryId",
    paramValidationMiddleware(CategoryValidation.validateCategoryIdParam),
    CategoryController.getCategoryById
)
router.put("/:categoryId",
    paramValidationMiddleware(CategoryValidation.validateCategoryIdParam),
    validationMiddleware(CategoryValidation.validateUpdateCategory),
    CategoryController.updateCategory
)
router.delete("/:categoryId",
    paramValidationMiddleware(CategoryValidation.validateCategoryIdParam),
    CategoryController.deleteCategory
)
export default router;