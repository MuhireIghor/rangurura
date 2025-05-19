import { ComplaintResponseService } from "@/services/complait-response.service";
import ResponseService from "@/services/response.service";
import logger from "@/utils/logger.utils";
import httpStatus from "http-status";
const responseLogger = logger("complaint-response");
class ResponseController {
  static async createResponse(req, res, next): Promise<any> {
    try {
      const { complaintId, staffId, content } = req.body;
      const user = req.userData;
      
      const isStaff = user.role === "AGENCY_STAFF" || user.role === "ADMIN";
      
      const isOfficialResponse = isStaff;
      const payload = { complaintId, staffId, content, isOfficialResponse };

      const newResponse =
        await ComplaintResponseService.createResponse(payload);
      responseLogger.info(newResponse);
      return ResponseService.handleSuccessResponse(
        httpStatus.CREATED,
        "Successfully Created New Response",
        newResponse,
        res
      );
    } catch (error) {
      next(error);
    }
  }
  static async listResponses(req, res, next): Promise<any> {
    try {
      const { complaintId } = req.params;
      const responses =
        await ComplaintResponseService.getResponsesByComplaint(complaintId);
      responseLogger.info(responses);
      return ResponseService.handleSuccessResponse(
        httpStatus.OK,
        "Successfully Fetched Responses",
        responses,
        res
      );
    } catch (error) {
      next(error);
    }
  }
  static async getResponseById(req, res, next): Promise<any> {
    try {
      const { responseId } = req.body;
      const response =
        await ComplaintResponseService.fetchResponseById(responseId);
      responseLogger.info(response);
      return ResponseService.handleSuccessResponse(
        httpStatus.OK,
        "Successfully Fetched Response",
        response,
        res
      );
    } catch (error) {
      next(error);
    }
  }
  static async updateResponse(req, res, next): Promise<any> {
    try {
      const { responseId } = req.params;
      const payload = req.body;
      const updatedResponse = await ComplaintResponseService.updateResponse(
        responseId,
        payload
      );
      responseLogger.info(updatedResponse);
      return ResponseService.handleSuccessResponse(
        httpStatus.OK,
        "Successfully Updated Response",
        updatedResponse,
        res
      );
    } catch (error) {
      next(error);
    }
  }
  static async fetchResponsesByStaff(req, res, next): Promise<any> {
    try {
      const { staffId } = req.params;
      const responses =
        await ComplaintResponseService.getResponsesByStaff(staffId);
      responseLogger.info(responses);
      return ResponseService.handleSuccessResponse(
        httpStatus.OK,
        "Successfully Fetched Responses",
        responses,
        res
      );
    } catch (error) {
      next(error);
    }
  }
  static async fetchResponsesByComplaint(req, res, next): Promise<any> {
    try {
      const { complaintId } = req.body;
      const responses =
        await ComplaintResponseService.getResponsesByComplaint(complaintId);
      responseLogger.info(responses);
      return ResponseService.handleSuccessResponse(
        httpStatus.OK,
        "Successfully Fetched Responses",
        responses,
        res
      );
    } catch (error) {
      next(error);
    }
  }
}
export default ResponseController;
