export const getHeadCells = () => {
    return [
        {
            name: "nome",
            description: "Nome do Aluno",
            cellWidth: "20%"
        },
        {
            name: "dataEnvio",
            description: "Data de Envio"
        },
        {
            name: "formaPagamento",
            description: "Forma de Pagamento",
            align: "center"
        },
        {
            name: "valor",
            description: "Valor Pago",
            align: "center"
        }
    ]
}