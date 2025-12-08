
# 🎯 SMASH Frontend - Manual de Instalação

## 📋 Índice
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Solução de Problemas](#solução-de-problemas)

## 💻 Tecnologias Utilizadas

- **React 18.x**
- **Vite**
- **Node.js**
- **npm/yarn**
- **Material-UI (MUI)**
- **React Router Dom**
- **Axios**

## ⚙️ Pré-requisitos

| Ferramenta | Versão Recomendada | Observações |
|------------|-------------------|-------------|
| Node.js | 18.x ou superior | Obrigatório |
| npm/yarn | Última versão estável | Gerenciador de pacotes |
| Git | Última versão | Para clonar o repositório |
| VS Code | Última versão | IDE recomendada |

## 🚀 Instalação

### 1. Clone o Repositório
```bash
git clone https://github.com/AtlhosHub/SmashFront.git
cd SmashFront
```

### 2. Instale as Dependências
```bash
npm install
# ou
yarn install
```

## ⚡ Configuração

### 1. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=SMASH
```

### 2. Configuração do Editor
Instale as extensões recomendadas no VS Code:
- ESLint
- Prettier
- EditorConfig
- JavaScript and TypeScript

## 🎮 Executando o Projeto

### Ambiente de Desenvolvimento
```bash
npm run dev
# ou
yarn dev
```
O projeto estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
# ou
yarn build
```

## ❗ Solução de Problemas

### Problemas Comuns

1. **Erro de Dependências**
```bash
npm cache clean --force
npm install
```

2. **Erro de Porta em Uso**
```bash
# Encontre o processo usando a porta
netstat -ano | findstr :5173
# Encerre o processo
taskkill /PID <numero-do-processo> /F
```

3. **Erro de CORS**
Verifique se a URL da API está correta no arquivo `.env`


## 📝 Notas Adicionais

- Mantenha o Node.js e npm atualizados
- Use sempre `yarn` ou `npm`, não misture os gerenciadores de pacotes
- Siga o padrão de código definido no ESLint
- Faça commits seguindo o padrão convencional
"""
