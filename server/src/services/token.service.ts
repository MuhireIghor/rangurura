import jwt from 'jsonwebtoken';
/**
 * Token service class
 */
class TokenService {
    /**
     * * Generate token
     * @param {string} data
     * @returns {string} string
     */
    static generateToken(data) {
        return jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
    }

    /**
     * * Verify token
     * @param  {string} token
     * @returns {object} object
     */
    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return err;
            }
            return decoded;
        });
    }

    /**
     * Decodes token
     * @param  {string} token
     * @returns {object} object (token payload or jwt error)
     */
    static decodeToken(token) {
        try {
            const payload = jwt.decode(token);
            return payload;
        } catch (err) {
            return err;
        }
    }
}

export default TokenService;
