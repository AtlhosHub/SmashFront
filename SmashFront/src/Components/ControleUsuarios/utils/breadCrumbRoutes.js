export const getBreadcrumbRoutes = (operacao) => {
    const nomePagina = () => {
        if (operacao === "cadastro") return "Adicionar Usuário"
        if (operacao === "visualizacao") return "Visualizar Perfil de Usuário"
        return "Editar Perfil de Usuário"
    }
    
    return [
        {
            route: "/controleUsuarios",
            description: "Controle de Usuários",
        },
        {
            route: "/cadastroUsuarios",
            description: nomePagina(),
        },
    ]
}