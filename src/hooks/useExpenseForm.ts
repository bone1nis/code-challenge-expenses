import { useState, useCallback, ChangeEvent } from "react";

import { Expense } from "../types";
import { SelectChangeEvent } from "@mui/material";

export const useExpenseForm = (initialContact: Partial<Expense>) => {
    const [expense, setExpense] = useState<Partial<Expense>>(initialContact);
    const [error, setError] = useState<string | null>(null);

    const handleEditChange = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>, field: keyof Expense) => {
            setExpense((prev) => ({
                ...prev,
                [field]: event.target.value,
            }));
        },
        []
    );

    const validateFields = useCallback((): boolean => {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

        if (!expense.date || !dateRegex.test(expense.date)) {
            setError("Введите корректную дату в формате DD-MM-YYYY");
            return false;
        }

        if (!expense.amount || isNaN(expense.amount) || expense.amount <= 0) {
            setError("Введите корректную сумму (положительное число)");
            return false;
        }

        if (!expense.category || expense.category.trim() === "") {
            setError("Заполните категорию");
            return false;
        }

        setError(null);
        return true;
    }, [expense]);





    return { expense, setExpense, error, setError, handleEditChange, validateFields };
};