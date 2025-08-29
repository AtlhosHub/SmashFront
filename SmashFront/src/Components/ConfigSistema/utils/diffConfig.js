export const diffConfig = (originais, temporarios, keyId = "id") => {
    const resultado = {};

    Object.keys(originais).forEach(secao => {
        const originalArr = originais[secao]?.data || [];
        const tempArr = temporarios[secao]?.data || [];

        const novos = tempArr.filter(
            t => !t[keyId] || !originalArr.some(o => o[keyId] === t[keyId])
        );

        const alterados = tempArr.filter(
            t => t[keyId] && originalArr.some(o => o[keyId] === t[keyId] && JSON.stringify(o) !== JSON.stringify(t))
        );

        const removidos = originalArr.filter(
            o => o[keyId] && !tempArr.some(t => t[keyId] === o[keyId])
        );

        resultado[secao] = { novos, alterados, removidos };
    });

    return resultado;
}