import Utils from '@/utils';
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
  static statusCode: any;
  static message: any;
  static data: any;
  static type: string;
  /**
   * Set a success response
   */
  static setSuccess(
    statusCode: any,
    message: any,
    data: any
  ) :any{
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = "success";

  }

  /**
   * Set an error response
   */
  static setError(
    statusCode: any,
    message: any
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = "error";
  }

  static send(res) {
    if (this.type === 'success') {
      return res.status(this.statusCode).json({
        status: this.statusCode,
        message: this.message,
        data: this.data,
      });
    }
    return res.status(this.statusCode).json({
      status: this.statusCode,
      message: this.message,
    });
  }
  /**
   * * Handle Success Response
   * @param  {integer} statusCode
   * @param  {string} message
   * @param  {Object} data
   * @param  {Object} res
   * @param  {Boolean} encrypted
   * @returns {Object} Object
   */
  static handleSuccessResponse(
    statusCode,
    message,
    data,
    res,
    encrypted = false,
  ) {
    const responseData = encrypted
      ? { payload: Utils.cypherObject(data), secure: true }
      : data;
    this.setSuccess(statusCode, message, responseData);
    return this.send(res);
  }

  /**
   * * Handle Error Response
   * @param  {integer} statusCode
   * @param  {string} message
   * @param  {Object} res
   * @returns {Object} Object
   */
  static handleErrorResponse(statusCode, message, res) {
    this.setError(statusCode, message);
    return this.send(res);
  }
}
 export default ResponseService;