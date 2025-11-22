export const formatarTelefone = (valor = '') => {
    if (!valor) return null;

    const numeros = valor.replace(/\D/g, '').slice(0, 11);

    if (numeros.length < 3) return numeros;
    if (numeros.length < 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length === 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    if (numeros.length === 11) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
};
