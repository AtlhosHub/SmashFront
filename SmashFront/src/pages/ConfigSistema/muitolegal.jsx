import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function ControleInputHora({ hora, setHora }) {
    return (
        <TimePicker
            label="Escolha a Hora"
            slotProps={{
                textField: {
                    InputProps: {
                        endAdornment: null,
                    },
                    size: "small",
                },
            }}
            ampm={false}
            value={dayjs(hora, "HH:mm")}
            onChange={setHora}
        />
    );
}