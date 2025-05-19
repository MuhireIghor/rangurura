import Utils from "../utils/index";

/**
 * Decrypt the body with encrypted payload and mutate the body with a plain json object
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Function} next
 * @return {Object} object
 */
export default (req, res, next) => {
  try {
    if (req.method === "GET") {
      return next();
    }
    const { body, headers } = req;
    const { encryption } = headers;
    const { payload } = body;

    if (encryption) {
      if (body) {
        if (payload) {
          const decrypted = Utils.decypherObject(payload);
          req.body = decrypted;
        } else {
          throw new Error(
            "Please wrap the entire body of your requests in an object with 'payload' as key and encrypted string as value"
          );
        }
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};
