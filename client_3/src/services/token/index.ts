import { getStoredData } from "utils"
import { authKeyName } from "constants/main";

// to be replaced with cookies instead of browser storage APIs
// need to check if the token is also valid
export const isAuthenticated = () => {
    const token = getStoredData(authKeyName, true);
    if (token) {
        return true;
    }
    return false;
};


export const getToken = () => {
    const token = getStoredData(authKeyName, true);

    return token;
};

