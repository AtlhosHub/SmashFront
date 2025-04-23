export const getUserName = () => {
    return sessionStorage.getItem("usuario") || "";
};

export const getUserInicial = () => {
    const user = sessionStorage.getItem("usuario");
    return user ? user.charAt(0) : "";
};
