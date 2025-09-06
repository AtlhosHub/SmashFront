export const formatCPF = (value) => {
    if (!value) return "";
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const validarCpf = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 11;
};