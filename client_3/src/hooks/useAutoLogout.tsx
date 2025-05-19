/* eslint-disable @typescript-eslint/no-explicit-any */
import { authKeyName } from 'constants/main';
import { useEffect } from 'react';
import { getStoredData } from 'utils';
import { logout } from 'utils/auth';

interface JWTPayload {
    exp: number;
    [key: string]: any;
}

const useAutoLogout = (): void => {
    useEffect(() => {
        const token = getStoredData(authKeyName, true); // replace with your token retrieval method
        if (!token) return;

        try {
            const base64Payload = token.split('.')[1];
            const decodedPayload = atob(base64Payload);
            const payload: JWTPayload = JSON.parse(decodedPayload);
            const expiry = payload.exp * 1000; // convert to milliseconds
            const timeLeft = expiry - Date.now();

            if (timeLeft <= 0) {
                logout()
            } else {
                const timeout = setTimeout(() => {
                    logout()
                }, timeLeft);

                return () => clearTimeout(timeout);
            }
        } catch (err) {
            console.error('Invalid token format or payload:', err);
            logout()
        }
    }, []);
};

export default useAutoLogout;
