import { Response } from 'express';

type ResponseType = 'success' | 'error';

interface SuccessResponse {
  status: number;
  message: string;
  data?: any;
}

interface ErrorResponse {
  status: number;
  message: string;
}

class ResponseService {
  /**
   * Set a success response
   */
  static setSuccess(
    res: Response,
    statusCode: number,
    message: string,
    data: any
  ) {
    const response: SuccessResponse = {
      status: statusCode,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Set an error response
   */
  static setError(
    res: Response,
    statusCode: number,
    message: string
  ) {
    const response: ErrorResponse = {
      status: statusCode,
      message,
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Handle Success Response
   */
  static handleSuccessResponse(
    statusCode: number,
    message: string,
    data: any,
    res: Response
  ) {
    return this.setSuccess(res, statusCode, message, data);
  }

  /**
   * Handle Error Response
   */
  static handleErrorResponse(
    statusCode: number,
    message: string | any,
    res: Response
  ) {
    return this.setError(res, statusCode, message);
  }
}
 export default ResponseService;