import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import { categories } from "../../constants";

type CategorySelectProps = {
    value: string;
    onChange: (e: SelectChangeEvent<string>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="select-category-label">Категория</InputLabel>
            <Select
                labelId="select-category-label"
                id="select-category"
                value={value}
                label="Категория"
                size="medium"
                onChange={onChange}
            >
                {categories.map((category) => (
                    <MenuItem key={category.key} value={category.key}>
                        {category.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CategorySelect;
