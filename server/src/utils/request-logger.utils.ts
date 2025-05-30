
import logger from "./logger.utils";
/**
 * Logger for all http requests
 */


const requestLogger:any = logger('requests');
requestLogger.stream = {
  write: (request, encoding) => {
    requestLogger.info(request);
  },
};

export default requestLogger;

export const loggerFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms - :total-time[digits] ms';
