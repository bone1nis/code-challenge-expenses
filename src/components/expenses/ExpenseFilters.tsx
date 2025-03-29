import { useCallback, useMemo } from "react";

import { TextField, Button, Switch, FormControlLabel, Paper, Stack, Typography, Grid } from "@mui/material";

import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/RootStoreContext";

import { Filters } from "../../utils/types";

import { CategorySelect } from "../forms";

const ExpenseFilters: React.FC = observer(() => {
    const { expensesStore } = useStore();

    const handleChange = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
        expensesStore.setFilter(key, value);
    }, [expensesStore]);

    const handleNumberChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof Filters) => {
            const value = e.target.value;
            const parsedValue = value === "" ? null : parseFloat(value);

            if (parsedValue !== null && !isNaN(parsedValue)) {
                handleChange(key, parsedValue);
            }
        },
        [handleChange]
    );

    const resetFilters = useCallback(() => {
        expensesStore.setFilter("category", "all");
        expensesStore.setFilter("minAmount", null);
        expensesStore.setFilter("maxAmount", null);
        expensesStore.setFilter("sortByDate", "asc");
    }, [expensesStore]);

    const toggleSortOrder = useCallback(() => {
        const newSortOrder = expensesStore.filters.sortByDate === "asc" ? "desc" : "asc";
        expensesStore.setFilter("sortByDate", newSortOrder);
    }, [expensesStore]);

    const filters = useMemo(() => expensesStore.filters, [expensesStore.filters]);

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                width: "100%"
            }}
        >
            <Typography
                variant="h5"
                align="center"
                gutterBottom>
                Фильтры
            </Typography>

            <Stack spacing={2}>
                <Grid
                    container
                    spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Мин. сумма"
                            value={filters.minAmount ?? ""}
                            onChange={(e) => handleNumberChange(e, "minAmount")}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Макс. сумма"
                            value={filters.maxAmount ?? ""}
                            onChange={(e) => handleNumberChange(e, "maxAmount")}
                        />
                    </Grid>
                </Grid>

                <FormControlLabel
                    control={
                        <Switch
                            checked={filters.sortByDate === "desc"}
                            onChange={toggleSortOrder}
                            value={filters.sortByDate}
                        />
                    }
                    label="Сортировка по возрастанию/убыванию"
                />

                <CategorySelect
                    value={filters.category ?? ""}
                    onChange={(e) => handleChange("category", e.target.value as Filters["category"])}
                    viewAll={true}
                />

                <Button
                    variant="outlined"
                    onClick={resetFilters}
                >
                    Сбросить
                </Button>
            </Stack>
        </Paper>
    );
});

export default ExpenseFilters;