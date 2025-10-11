import { api } from "../../../provider/apiProvider"

export const listarHorarios = () => {
    let requestResponse;
    requestResponse =
        api.get("/horario-preferencia", {
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
    const payload = {
        horarioAulaFim: horario.horarioAulaFim,
        horarioAulaInicio: horario.horarioAulaInicio,
        dataInclusao: null
    }
    let requestResponse = api.post("/horario-preferencia", payload, {
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
        api.delete(`/horario-preferencia/${id}`, {
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
        api.get("/mensalidades/valor-atual", {
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
        api.post(`/valor-mensalidade`, {
            valor: mensalidade.data,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then((response) => { return response })

    return requestResponse;
}