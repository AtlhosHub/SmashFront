import { DefaultButton } from "../../Components/DefaultComponents/DefaultButton/DefaultButton"

export const FormBuilderBotao = ({ botaoData }) => {
    return (
        <DefaultButton
            label={botaoData?.label}
            variant={botaoData?.variant}
            disabled={!botaoData?.enableCondition}
            onClick={botaoData?.onClick}
        />
    )
}