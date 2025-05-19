import httpStatus from "http-status";
import { AgencyService } from "@/services/agency.service";
import ResponseService from "@/services/response.service";
import logger from "@/utils/logger.utils";
const agencyLogger = logger("agency");

class AgencyController {
  static async createNewAgency(req, res, next): Promise<any> {
    try {
      const payload = req.body;
      const newAgency = await AgencyService.createAgency(payload);
      agencyLogger.info(newAgency);
      return ResponseService.handleSuccessResponse(
        httpStatus.CREATED,
        "Successfully Created New Agency",
        newAgency,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  static async getAgencyById(req, res, next): Promise<any> {
    try {
      const { agencyId } = req.body;
      const agency = await AgencyService.fetchAgencyById(agencyId);
      agencyLogger.info(agency);
      return ResponseService.handleSuccessResponse(
        httpStatus.OK,
        "Successfully Fetched Agency",
        agency,
        res
      );
    } catch (error) {
      next(error);
    }
  }

  static async listAgencies(req, res, next): Promise<any> {
    try {
      const agencies = await AgencyService.findAgencies();
      agencyLogger.info(agencies);
      return ResponseService.handleSuccessResponse(
        httpStatus.OK,
        "Successfully Fetched Agencies",
        agencies,
        res
      );
    } catch (error) {
      next(error);
    }
  }
}

export default AgencyController;
