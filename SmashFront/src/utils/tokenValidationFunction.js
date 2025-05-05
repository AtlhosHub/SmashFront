import { api } from "../provider/apiProvider";

export const tokenValidationFunction = async () => {
    try {
        const { status } = await api.get("/usuarios/vazio", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        });
        return status === 204;
    } catch (error) {
        sessionStorage.clear();
        return false;
    }
};
