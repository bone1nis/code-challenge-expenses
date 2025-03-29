import { FormEvent, useCallback, useState } from "react";

import { Box, Button, Stack, Typography, Paper, Alert } from "@mui/material";

import dayjs from "dayjs";

import { useStore } from "../stores/RootStoreContext";

import { useExpenseForm } from '../hooks/useExpenseForm';
import { Expense } from "../types";

import { AmountInput, CategorySelect, DatePickerInput } from './form';

import ConfirmationDialog from "./ConfirmationDialog";

const ContactForm: React.FC = () => {
    const { expensesStore } = useStore();

    const initialExpense: Omit<Expense, "id"> = {
        category: "food",
        amount: 1,
        date: dayjs().valueOf()
    }

    const { expense, setExpense, error, handleEditChange, handleDateChange, validateFields } = useExpenseForm(initialExpense);

    const [isDialogOpen, setDialogOpen] = useState(false);

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            if (!validateFields()) return;
            setDialogOpen(true);
        },
        [validateFields]
    );

    const handleConfirm = useCallback(() => {
        expensesStore.addExpense({
            id: crypto.randomUUID(),
            category: expense.category,
            amount: expense.amount,
            date: expense.date
        });

        setDialogOpen(false);
        setExpense(initialExpense);
    }, [expense, setExpense, expensesStore]);

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 600,
                mx: "auto",
                mt: 5,
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" align="center" gutterBottom>
                Внести расход
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Box component="form">
                <Stack spacing={2} direction="column">
                    <CategorySelect
                        value={expense.category}
                        onChange={(e) => handleEditChange(e, "category")} />
                    <AmountInput
                        value={expense.amount}
                        onChange={(e) => handleEditChange(e, 'amount')} />
                    <DatePickerInput
                        value={expense.date}
                        onChange={handleDateChange}
                    />
                </Stack>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Создать
                </Button>
            </Box>

            <ConfirmationDialog
                isOpen={isDialogOpen}
                title="Вы уверены, что хотите добавить новый расход?"
                onClose={() => setDialogOpen(false)}
                onConfirm={handleConfirm}
            />
        </Paper>
    );
};

export default ContactForm;