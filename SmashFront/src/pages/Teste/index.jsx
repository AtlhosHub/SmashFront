import { useEffect, useState } from "react"
import { FormBuilder } from "./FormBuilder";

export const Teste = () => {
    const [allFieldFilled, setAllFieldFilled] = useState(false);
    const [maiorIdade, setMaiorIdade] = useState(false);

    const [userInfo, setUserInfo] = useState({
        nome: null,
        email: null,
        dataNascimento: null,
        cpf: null,
        rg: null,
        nomeSocial: null,
        genero: null,
        celular: null,
        nacionalidade: null,
        naturalidade: null,
        telefone: null,
        profissao: null,
        ativo: true,
        temAtestado: true,
        deficiencia: null,
        autorizado: null,
        dataInclusao: null,
    })
    const [listaInputs, setListaInputs] = useState([])
    const [listaBotoes, setListaBotoes] = useState([])

    const handleExcluir = () => {
        console.log("Excluir")
    }

    const handleSalvar = () => {
        console.log("Salvar")
    }

    useEffect(() => {
        const nome = userInfo.nome;
        const dtNascimento = userInfo.dataNascimento;
        const cpf = userInfo.cpf;
        const rg = userInfo.rg;

        console.log(!!nome)
        console.log(!!dtNascimento)
        console.log(!!cpf)
        console.log(!!rg)

        if (!!nome && !!dtNascimento && !!cpf && !!rg) return setAllFieldFilled(true);
    }, [userInfo])

    useEffect(() => {
        setListaBotoes([
            {
                label: "Excluir",
                variant: "outlined",
                enableCondition: true,
                onClick: handleExcluir
            },
            {
                label: "Salvar",
                variant: "contained",
                enableCondition: allFieldFilled,
                onClick: handleSalvar
            }
        ]);

        setListaInputs([
            {
                key: "nome",
                type: "text",
                required: true,
                label: "Nome",
                placeholder: "Insira o nome do aluno",
                tooltip: "O nome do aluno é o nome do aluno",
                enableCondition: true,
                value: userInfo.nome,
                onChange: (e) => setUserInfo(prev =>({ ...prev, nome: e.target.value }))
            },
            {
                key: "nomeSocial",
                type: "text",
                label: "Nome Social",
                tooltip: "O nome que o(a) aluno(a) se sente confortável em ser chamado",
                enableCondition: true,
                value: userInfo.nomeSocial,
                onChange: (e) => setUserInfo(prev =>({ ...prev, nomeSocial: e.target.value }))
            },
            {
                key: "dataNascimento",
                type: "text",
                required: true,
                label: "Data de Nascimento",
                placeholder: "Insira a data de nascimento",
                tooltip: "Data de nascimento do aluno",
                enableCondition: true,
                value: userInfo.dataNascimento,
                onChange: (e) => setUserInfo(prev =>({ ...prev, dataNascimento: e.target.value }))
            },
            {
                key: "genero",
                type: "text",
                required: false,
                label: "Gênero",
                placeholder: "Insira o gênero",
                tooltip: "Gênero do aluno",
                enableCondition: true,
                value: userInfo.genero,
                onChange: (e) => setUserInfo(prev =>({ ...prev, genero: e.target.value }))
            },
            {
                key: "email",
                type: "text",
                required: maiorIdade,
                label: "Email",
                placeholder: "Insira o email",
                tooltip: "Email do aluno",
                enableCondition: true,
                value: userInfo.email,
                onChange: (e) => setUserInfo(prev =>({ ...prev, email: e.target.value }))
            },
            {
                key: "nacionalidade",
                type: "text",
                required: false,
                label: "Nacionalidade",
                placeholder: "Insira a nacionalidade",
                tooltip: "Nacionalidade do aluno",
                enableCondition: true,
                value: userInfo.nacionalidade,
                onChange: (e) => setUserInfo(prev =>({ ...prev, nacionalidade: e.target.value }))
            },
            {
                key: "naturalidade",
                type: "text",
                required: false,
                label: "Naturalidade",
                placeholder: "Insira a naturalidade",
                tooltip: "Naturalidade do aluno",
                enableCondition: true,
                value: userInfo.naturalidade,
                onChange: (e) => setUserInfo(prev =>({ ...prev, naturalidade: e.target.value }))
            },
            {
                key: "telefone",
                type: "text",
                required: false,
                label: "Telefone",
                placeholder: "Insira o telefone",
                tooltip: "Telefone do aluno",
                enableCondition: true,
                value: userInfo.telefone,
                onChange: (e) => setUserInfo(prev =>({ ...prev, telefone: e.target.value }))
            },
            {
                key: "celular",
                type: "text",
                required: false,
                label: "Celular",
                placeholder: "Insira o celular",
                tooltip: "Celular do aluno",
                enableCondition: true,
                value: userInfo.celular,
                onChange: (e) => setUserInfo(prev =>({ ...prev, celular: e.target.value }))
            },
            {
                key: "cpf",
                type: "text",
                required: true,
                label: "CPF",
                placeholder: "Insira o CPF",
                tooltip: "CPF do aluno",
                enableCondition: true,
                value: userInfo.cpf,
                onChange: (e) => setUserInfo(prev =>({ ...prev, cpf: e.target.value }))
            },
            {
                key: "rg",
                type: "text",
                required: true,
                label: "RG",
                placeholder: "Insira o RG",
                tooltip: "RG do aluno",
                enableCondition: true,
                value: userInfo.rg,
                onChange: (e) => setUserInfo(prev =>({ ...prev, rg: e.target.value }))
            },
        ])
    }, [])

    return (
        <FormBuilder
            listaInputs={listaInputs}
            listaBotoes={listaBotoes}
        />
    )
}