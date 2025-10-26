export const getBreadcrumbRoutes = (operacao) => {
    const definirNomePagina = () => {
        if (operacao === 'cadastro') return 'Adicionar Perfil do Interessado';
        if (operacao === 'visualizacao') return 'Visualizar Perfil do Interessado';
        return 'Editar Perfil do Interessado';
    };

    return [
        {
            route: '/listaEspera',
            description: 'Lista de Espera'
        },
        {
            route: '/cadastroInteressado',
            description: definirNomePagina()
        },
    ];
};