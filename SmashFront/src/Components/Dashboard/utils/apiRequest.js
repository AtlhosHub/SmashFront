import { api } from "../../../provider/apiProvider"

export const getNumAlunos = () => {
    const request = api.get("/alunos/ativos", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
        }
    })

    return request.data;
}

export const getNumDesconto = () => {
    const request = api.get("/mensalidades/qtd-descontos", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
        }
    });

    return request.data;
}

export const getAlunosAniversariantes = () => {
    const request = api.get("/alunos/aniversariantes", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
        }
    })

    return request.data;
}

export const getConteudoGrafico = () => {
    const request = api.get("/mensalidades/grafico", {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
        }
    })

    return request.data;
}