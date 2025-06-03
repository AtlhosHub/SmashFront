import { api } from "../../../provider/apiProvider"

export const listarHorarios = () => {
    let requestResponse;
    requestResponse =
        api.get("/horario-pref", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => { return response });

    if (!requestResponse) return [];

    return requestResponse;
}

export const adicionarAlterarHorario = ({ horario }) => {
    console.log("request", horario)
    let requestResponse
    requestResponse =
        api.post("/horario-pref/adicionar-ou-atualizar", [horario], {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => { return response })

    return requestResponse;
}

export const removerHorario = ({ id }) => {
    let requestResponse;
    requestResponse =
        api.delete(`/horario-pref/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => { return response })

    return requestResponse;;
}

export const listarValorMensalidade = () => {
    let requestResponse;
    requestResponse =
        api.get("/valor-mensalidade", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => { return response })

    if (!requestResponse) return [];

    return requestResponse;
}

export const alterarValorMensalidade = ({ mensalidade }) => {
    let requestResponse
    requestResponse =
        api.put(`/valor-mensalidade/${mensalidade.id}`, mensalidade, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => { return response })

    return requestResponse;
}