/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js";
import store from "store";
import { jwtDecode } from "jwt-decode";
import { cypherSecretKey } from "constants/main";
import { getToken } from "../services/token";
//@typescript-eslint no-explicit-any
export const decodeToken = (userToken?: any):any => {
    try {
        const token = userToken || getToken();
        if(!token){
            return null;
        }
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.log("AUTH ERROR: ", error);
        throw error;
    }
};
export const cypherText = (text: string, key: string = cypherSecretKey) => {
    const cipheredtext = CryptoJS.AES.encrypt(text, key).toString();
    return cipheredtext;
};

export const decypherText = (
    cipheredtext: string,
    key: string = import.meta.env.VITE_CYPHER_SECRET_KEY
) => {
    try {
        const bytes = CryptoJS.AES.decrypt(cipheredtext, key);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    } catch (e: any) {
        return {
            status: "error",
            message: e.message,
        };
    }
};
export const logout = (refresh = true) => {
    store.clearAll();
    if (refresh) {
        window.location.href = "/auth/login";
    }
    return false;
};