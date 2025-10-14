import { tokenValidationFunction } from './tokenValidationFunction';

export const validateToken = async (navigate) => {    
    const isValid = await tokenValidationFunction();
    if (!isValid) {
        navigate('/', { state: { tokenLogout: true } });
    }
};