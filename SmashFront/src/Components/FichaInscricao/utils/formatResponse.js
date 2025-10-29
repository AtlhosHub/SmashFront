export const formatResponse = (data) => {
    return {
        ...data,
        responsaveis: data.responsaveis ? data.responsaveis.map((r) => ({
            ...r,
            nome: r.nome.value,
            email: r.email.value,
            cpf: r.cpf.value,
            celular: r.celular?.value,
            telefone: r.telefone?.value
        })) : []
    };
};