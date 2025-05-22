import { Box } from "@mui/material"
import { FormBuilderInput } from "./FormBuilderInput";
import { FormBuilderBotao } from "./FormBuilderBotao";

export const FormBuilder = ({ listaInputs, listaRadio, listaBotoes, proporcao }) => {

    const calcularProporcao = () => {
        let proporcaoFormated = "";
        proporcao?.forEach(element => {
            proporcaoFormated += `${element} `
        });

        if (proporcao) {
            return `display: 'grid', gridTemplateColumns: ${proporcaoFormated}`
        }
        return "display: 'flex', flexDirection: 'column'";
    }

    return (
        <Box>
            <Box sx={{ calcularProporcao }}>
                {listaInputs?.map((inputData) => (
                    <FormBuilderInput key={`box-${inputData.key}`} inputData={inputData} type={inputData.type} />
                ))}
            </Box>
            {listaRadio &&
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    {listaRadio?.map((radioData) => (
                        <FormBuilderRadio radioData={radioData} />
                    ))}
                </Box>
            }
            <Box sx={{ display: "flex", flexDirection: "row", mt: "auto", ml: "auto", width: "max-content", gap: 1 }}>
                {listaBotoes?.map((botaoData, index) => (
                    <FormBuilderBotao key={`botao-${index}`} botaoData={botaoData} />
                ))}
            </Box>
        </Box>
    )
}