export const getUserName = () => {
    return localStorage.getItem("usuario") || "";
};

export const getUserInicial = () => {
    const user = localStorage.getItem("usuario");
    return user ? user.charAt(0) : "";
};
