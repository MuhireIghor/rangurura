import ip from "ip";
import CryptoJS from "crypto-js";
import { config } from "dotenv";
config();
class Utils {
  /**
   * joi default options
   * @return {Object} default joi options
   */
  static joiDefaultOptions() {
    return {
      abortEarly: false,
      errors: {
        wrap: {
          label: "",
        },
      },
    };
  }
  /**
   * Generate error code
   * @return {string} error code
   */
  static generateErrorCode() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to the month since it's 0-based
    const day = now.getDate().toString().padStart(2, "0");
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    const second = now.getSeconds().toString().padStart(2, "0");

    const randomDigits = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    // We can agree on a standard format to use
    const errorCode = `ERR${year}${month}${day}${hour}${minute}${second}${randomDigits}`;
    return errorCode;
  }

  /**
   * Get server's IP address
   * @return {string} IP address
   */
  static getServerIpAddress() {
    const ipAddress = ip.address();
    return ipAddress;
  }

  /**
   * @param {String} encryptedString
   * @param  {String} key
   * @returns {String}  originalstring
   */
  static decypherString(encryptedString, key = process.env.PAYLOAD_CYPHER_SECRET_KEY) {
    const bytes = CryptoJS.AES.decrypt(encryptedString, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
  /**
   * @param  {String} string
   * @param  {String} key
   * @returns {Object} string
   */
  static decypherObject(string, key = process.env.PAYLOAD_CYPHER_SECRET_KEY) {
    const decryptedObjString = this.decypherString(string, key);
    try {
      return JSON.parse(decryptedObjString);
    } catch (error) {
      throw new Error("Failed parsing enrypted string as JSON");
    }
  }
}
export default Utils;
