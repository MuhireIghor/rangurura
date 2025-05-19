import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ResponseService from '../services/response.service';
import Utils from '../utils';
import logger from '@/utils/logger.utils';

const errorLogger = logger('catch');

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const { NODE_ENV, DEBUG } = process.env;

  if (NODE_ENV === 'development' || DEBUG === 'true') {
    console.error(error);
    return ResponseService.handleErrorResponse(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message,
      res
    );
  }

  const server = Utils.getServerIpAddress();
  const status = error.response?.status || httpStatus.INTERNAL_SERVER_ERROR;
  let message = error.response?.data || error.message;
  const route = req.originalUrl;

  let user: {
    id: number;
    email: string;
    nationalId: string;
  } | undefined;

  if ((req as any).userData) {
    const userData = (req as any).userData;
    user = {
      id: userData.id,
      email: userData.email,
      nationalId: userData.nationalId,
    };
  }

  // If status is a 5xx error
  if (status.toString().startsWith('5')) {
    const errorCode = Utils.generateErrorCode();

    // If validation error, get the DB parent message
    message = message === 'Validation error' ? error?.parent?.message : message;

    errorLogger.error({ message, errorCode, route, user, server });

    return ResponseService.handleErrorResponse(status, { errorMsg: message, errorCode }, res);
  }

  console.error(error);
  errorLogger.error(message);
  return res.status(status).send(message);
}
