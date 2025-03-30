# BIBLIOTECAS USADAS
    - Material Ui
    - Toastify

## RESUMO DE ALGUNS COMPONENTES
### TOASTIFY
``` jsx
<ToastContainer>
```
Esse componente é que faz aparecer os alerts que são exibidos em caso de sucesso/erro em alguma ação. Caso deseje alterar o componente do toaster(vulgo Alert), é preciso ir até `/Components/utils/toasterService.js`.

### DEFAULT COMPONENTS
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
 - variant = outlined | contained
 - size = small | medium | large
 - diasbled = diasbled | ""