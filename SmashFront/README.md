#  BIBLIOTECAS USADAS
- Material Ui
- Toastify

#  RESUMO DE ALGUNS COMPONENTES
###  TOASTIFY
```  jsx
<ToastContainer>

function genericFunction = () => {
	toasterMsg("sucess", "Usuário excluído com sucesso!");
	toasterMsg("eror", "Algum erro ocorreu na exclusão do usuário!");
}
```
Esse componente é que faz aparecer os alerts que são exibidos em caso de sucesso/erro em alguma ação. Caso deseje alterar o componente do toaster(vulgo Alert), é preciso ir até `/Components/utils/toasterService.js`. Para acionar o evento é necessário passar a função "toasterMsg" 
###  DEFAULT COMPONENTS
```jsx
<DefaultButton
	variant="outlined"
	size="medium"
	label="Excluir"
	onClick={handleOpenModal}
	disabled
/>
```
Botão padrão do sistema, para utilizar ele, somente é necessário o valor de `label`. As possíveis estilizações do botão são:
-  variant = outlined | contained
-  size = small | medium | large
-  diasbled = diasbled | ""
-----
```jsx
<DefaultHeader 
	pageTitle={"Menu Principal"} 
	userInfo={userInfo}
/>
```
Header da aplicação, pode ser utilizada ao passar um "pageTitle" com o nome da página em questão, e o "userInfo", que será utilizado para, na direita, aparecer o nome do usuário e o ícone do mesmo que contém a primeira letra do seu nome.

---
```jsx
<DefaultFilter
	statusPagamento={statusPagamento}
	statusPresenca={statusPresenca}
	horarioPref={horarioPref}
	setStatusPagamento={setStatusPagamento}
	setStatusPresenca={setStatusPresenca}
	setHorarioPref={setHorarioPref}
	dateRange={dateRange}
	setDateRange={setDateRange}
	handleApplyFilter={handleApplyFilter}
/>
```
Para decidir quais campos do filtro vão aparecer bastar setar os valores do props que vão ser usados no  componente, caso você NÃO QUEIRA que um campo apareça, NÃO CHAME o prop do campo em questão. Para enviar o filtro e fazer uma nova consulta você precisa da função "handleApplyFilter", que por sinal é um prop obrigatório.