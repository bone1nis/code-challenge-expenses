import { TextField } from "@mui/material";

type AmountInputProps = {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const AmountInput: React.FC<AmountInputProps> = ({
    value,
    onChange }) => (
    <TextField
        label="Сумма"
        value={value}
        onChange={onChange}
        size="small"
    />
);

export default AmountInput;