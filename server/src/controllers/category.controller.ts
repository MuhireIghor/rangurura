import { CategoryService } from "@/services/category.service";
import ResponseService from "@/services/response.service";
import logger from "@/utils/logger.utils";
import httpStatus from "http-status";
const categoryLogger = logger("category");
class CategoryController {
  static async createCategory(req, res, next): Promise<any> {
    try {
      const payload = req.body;
      const newCategory = await CategoryService.create(payload);
      categoryLogger.info(newCategory);
      return ResponseService.handleSuccessResponse(
        httpStatus.CREATED,
        "Successfully Created New Category",
        newCategory,
        res
      );
    } catch (error) {
      next(error);
    }
  }
  static async listCategories(req, res, next): Promise<any> {
    try {
      const categories = await CategoryService.getAll();
      categoryLogger.info(categories);
      return ResponseService.handleSuccessResponse(
        httpStatus.OK,
        "Successfully Fetched Categories",
        categories,
        res
      );
    } catch (error) {
      next(error);
    }
  }
  static async getCategoryById(req, res, next): Promise<any> {
    try {
      const { categoryId } = req.body;
      const category = await CategoryService.getById(categoryId);
      categoryLogger.info(category);
      return ResponseService.handleSuccessResponse(
        httpStatus.OK,
        "Successfully Fetched Category",
        category,
        res
      );
    } catch (error) {
      next(error);
    }
  }
  static async updateCategory(req, res, next): Promise<any> {
    try {
      const { categoryId } = req.body;
      const payload = req.body;
      const updatedCategory = await CategoryService.update(categoryId, payload);
      categoryLogger.info(updatedCategory);
      return ResponseService.handleSuccessResponse(
        httpStatus.OK,
        "Successfully Updated Category",
        updatedCategory,
        res
      );
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(req, res, next): Promise<any> {
    try {
      const { categoryId } = req.body;
      const deletedCategory = await CategoryService.delete(categoryId);
      categoryLogger.info(deletedCategory);
      return ResponseService.handleSuccessResponse(
        httpStatus.OK,
        "Successfully Deleted Category",
        deletedCategory,
        res
      );
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
