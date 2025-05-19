import { ComplaintService } from "@/services/complaint.service";
import ResponseService from "@/services/response.service";
import logger from "@/utils/logger.utils";
import httpStatus from "http-status";
const complaintLogger = logger("complaint");
class ComplaintController {
    static async createComplaint(req, res, next): Promise<any> {
        try {
            const payload = req.body;
            const newComplaint = await ComplaintService.create(payload);
            complaintLogger.info(newComplaint);
            return ResponseService.handleSuccessResponse(
                httpStatus.CREATED,
                "Successfully Created New Complaint",
                newComplaint,
                res
            );
        } catch (error) {
            next(error);
        }
    }
    static async listComplaints(req, res, next): Promise<any> {
        try {
            const complaints = await ComplaintService.getAll();
            complaintLogger.info(complaints);
            return ResponseService.handleSuccessResponse(
                httpStatus.OK,
                "Successfully Fetched Complaints",
                complaints,
                res
            );
        } catch (error) {
            next(error);
        }
    }
    static async getComplaintById(req, res, next): Promise<any> {
        try {
            const { complaintId } = req.body;
            const complaint = await ComplaintService.getById(complaintId);
            complaintLogger.info(complaint);
            return ResponseService.handleSuccessResponse(
                httpStatus.OK,
                "Successfully Fetched Complaint",
                complaint,
                res
            );
        } catch (error) {
            next(error);
        }
    }
    static async updateComplaint(req, res, next): Promise<any> {
        try {

            const payload = req.body;
            const updatedComplaint = await ComplaintService.update(payload.complaintId,payload);
            complaintLogger.info(updatedComplaint);
            return ResponseService.handleSuccessResponse(
                httpStatus.OK,
                "Successfully Updated Complaint",
                updatedComplaint,
                res
            );
        } catch (error) {
            next(error);
        }
    }

    static async escalateComplaint(req, res, next): Promise<any> {
        try {
            const { complaintId } = req.body;
            const {userId} = req.userData;
            const updatedComplaint = await ComplaintService.escalateLevel(complaintId, userId);
            complaintLogger.info(updatedComplaint);
            return ResponseService.handleSuccessResponse(
                httpStatus.OK,
                "Successfully Escalated Complaint",
                updatedComplaint,
                res
            );
        } catch (error) {
            next(error);
        }
    }
    static async markAsUnderReview(req, res, next): Promise<any> {
        try {
            const { complaintId } = req.body;
            const updatedComplaint = await ComplaintService.markAsUnderReview(complaintId);
            complaintLogger.info(updatedComplaint);
            return ResponseService.handleSuccessResponse(
                httpStatus.OK,
                "Successfully Marked Complaint as Under Review",
                updatedComplaint,
                res
            );
        } catch (error) {
            next(error);
        }
    }
    static async markAsResponded(req, res, next): Promise<any> {
        try {
            const { complaintId } = req.params;
            const updatedComplaint = await ComplaintService.markAsResponded(complaintId);
            complaintLogger.info(updatedComplaint);
            return ResponseService.handleSuccessResponse(
                httpStatus.OK,
                "Successfully Marked Complaint as Responded",
                updatedComplaint,
                res
            );
        } catch (error) {
            next(error);
        }
    }
    static async markAsResolved(req, res, next): Promise<any> {
        try {
            const { complaintId } = req.params;
            const updatedComplaint = await ComplaintService.markAsResolved(parseInt(complaintId));
            complaintLogger.info(updatedComplaint);
            return ResponseService.handleSuccessResponse(
                httpStatus.OK,
                "Successfully Marked Complaint as Resolved",
                updatedComplaint,
                res
            );
        } catch (error) {
            next(error);
        }
    }
    static async getAllComplaintsByUser(req, res, next): Promise<any> {
        try {
            const { userId } = req.body;
            const complaints = await ComplaintService.getByUser(userId);
            complaintLogger.info(complaints);
            return ResponseService.handleSuccessResponse(
                httpStatus.OK,
                "Successfully Fetched Complaints",
                complaints,
                res
            );
        } catch (error) {
            next(error);
        }
    }




}
export default ComplaintController;