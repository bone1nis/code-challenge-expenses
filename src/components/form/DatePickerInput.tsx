import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

type DatePickerInputProps = {
    value: number;
    onChange: (date: dayjs.Dayjs | null) => void
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({ value, onChange }) => (
    <DateTimePicker
        label="Дата"
        value={dayjs(value)}
        onChange={onChange}
    />
);


export default DatePickerInput;