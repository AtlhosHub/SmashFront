export const setTabName = (operacao) => {
    if (operacao === 'cadastro') return 'Adicionar Ficha de Inscrição';
    if (operacao === 'visualizacao') return 'Visualizar Ficha de Inscrição';
    return 'Editar Ficha de Inscrição';
};