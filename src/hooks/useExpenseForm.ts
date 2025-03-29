import { useState, useCallback, ChangeEvent } from "react";

import { SelectChangeEvent } from "@mui/material";

import { Dayjs } from "dayjs";

import { Expense } from "../utils/types";

export const useExpenseForm = (initialExpense: Omit<Expense, "id">) => {
    const [expense, setExpense] = useState(initialExpense);
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

    const handleDateChange = useCallback((date: Dayjs | null) => {
        if (date) {
            setExpense(prev => ({
                ...prev,
                date: date.valueOf(),
            }));
        }
    }, []);

    const validateFields = useCallback((): boolean => {

        if (!expense.date) {
            setError("Укажите дату");
            return false;
        }

        if (!expense.amount || isNaN(expense.amount) || expense.amount <= 0) {
            setError("Введите корректную сумму (положительное число)");
            return false;
        }

        if (!expense.category || expense.category.trim() === "") {
            setError("Укажите категорию");
            return false;
        }

        setError(null);
        return true;
    }, [expense]);

    return { expense, setExpense, error, setError, handleEditChange, handleDateChange, validateFields };
};