export const formatarTelefone = (valor) => {
    if (!valor) return;
    const numeros = valor.replaceAll(/\D/g, '').slice(0, 11);

    if (numeros.length < 3) {
        return numeros;
    }

    if (numeros.length < 7) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    if (numeros.length <= 10) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(
            6
        )}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(
        7,
        11
    )}`;
};