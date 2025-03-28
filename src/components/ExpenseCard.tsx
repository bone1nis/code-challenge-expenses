import { useState, useCallback, useMemo } from 'react';
import { Paper, Stack, Typography, Button, Box, Divider, TextField, Alert, useTheme, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { red, grey } from '@mui/material/colors';
import { RemoveCircle, Event, AttachMoney } from '@mui/icons-material';

import { useStore } from '../stores/RootStoreContext';
import { Expense, Category } from '../types';

import { useExpenseForm } from '../hooks/useExpenseForm';

import { categories } from '../constants';

import ConfirmationDialog from './ConfirmationDialog';

type ExpenseCardProps = {
    expense: Expense;
};

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense }) => {
    const theme = useTheme();

    const iconStyle = {
        color: theme.palette.primary.main,
        transition: 'color 0.3s',
        '&:hover': {
            color: theme.palette.secondary.main
        }
    };

    const { expensesStore } = useStore();
    const { expense: editedExpense, setExpense: setEditedExpense, error, setError, handleEditChange, validateFields } = useExpenseForm({
        category: expense.category,
        amount: expense.amount,
        date: expense.date
    });
    const [isEditing, setIsEditing] = useState(false);

    const [dialogState, setDialogState] = useState<{ type: 'save' | 'delete' | null; open: boolean }>({
        type: null,
        open: false
    });

    const startEditing = useCallback(() => {
        setIsEditing(true);
        setDialogState({ type: null, open: false });
        setError(null);
    }, [setError]);

    const changedFields = useMemo((): Partial<Expense> => {
        const changes: Partial<Expense> = {};

        if (editedExpense.category !== expense.category) changes.category = editedExpense.category;
        if (editedExpense.amount !== expense.amount) changes.amount = editedExpense.amount;
        if (editedExpense.date !== expense.date) changes.date = editedExpense.date;

        return changes;
    }, [editedExpense, expense]);

    const hasChanges = useMemo(() => Object.keys(changedFields).length > 0, [changedFields]);

    const onSaveChanges = useCallback(() => {
        if (!validateFields()) return;

        if (hasChanges) {
            setDialogState({ type: 'save', open: true });
        } else {
            setIsEditing(false);
        }
    }, [hasChanges, validateFields]);

    const handleSaveChanges = useCallback(() => {
        if (hasChanges && validateFields()) {
            expensesStore.updateExpense(expense.id, changedFields);

            setIsEditing(false);
            setDialogState({ type: null, open: false });
        }
    }, [expensesStore, changedFields, expense.id, hasChanges, validateFields]);

    const handleCancelChanges = useCallback(() => {
        setEditedExpense({
            category: expense.category,
            amount: expense.amount,
            date: expense.date
        });
        setDialogState({ type: null, open: false });
        setError(null);
        setIsEditing(false);
    }, [expense, setError, setEditedExpense]);

    const startDeleteExpense = useCallback(() => {
        setIsEditing(false);
        setDialogState({ type: 'delete', open: true });
    }, []);

    const handleDeleteExpense = useCallback(() => {
        expensesStore.removeExpense(expense.id);
        setDialogState({ type: null, open: false });
    }, [expensesStore, expense.id]);

    const handleCancelDelete = useCallback(() => {
        setDialogState({ type: null, open: false });
    }, []);

    return (
        <Paper
            sx={{
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                transition: '0.3s ease-in-out',
                width: '100%',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'scale(1.01)',
                },
            }}
        >
            <Stack direction="column" gap={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="start">
                    {isEditing ? (
                        <Stack direction="column" gap={2}>
                            <FormControl fullWidth>
                                <InputLabel id="select-category-label">Категория</InputLabel>
                                <Select
                                    labelId="select-category-label"
                                    id="select-category"
                                    value={editedExpense.category}
                                    label="Категория"
                                    size="medium"
                                    onChange={(e) => handleEditChange(e, 'category')}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.key} value={category.key}>
                                            {category.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    ) : (
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                color: theme.palette.primary.main,
                            }}
                        >
                            {(categories.find(category => category.key === expense.category) as Category).value} - {expense.amount} ₽
                        </Typography>
                    )}

                    <Button
                        sx={{ minWidth: 'auto' }}
                        onClick={startDeleteExpense}
                    >
                        <RemoveCircle sx={{ color: red[400] }} />
                    </Button>
                </Stack>

                <Divider sx={{ borderColor: grey[300] }} />

                <Box>
                    <Stack direction="column" gap={1}>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <AttachMoney sx={iconStyle} />
                            {isEditing ? (
                                <TextField
                                    label="Сумма"
                                    value={editedExpense.amount}
                                    onChange={(e) => handleEditChange(e, 'amount')}
                                    size="small"
                                    required
                                />
                            ) : (
                                <Typography variant="body2">
                                    Сумма: {expense.amount} ₽
                                </Typography>
                            )}
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <Event sx={iconStyle} />
                            {isEditing ? (
                                <TextField
                                    label="Дата"
                                    value={editedExpense.date}
                                    onChange={(e) => handleEditChange(e, 'date')}
                                    size="small"
                                    required
                                />
                            ) : (
                                <Typography variant="body2">
                                    Дата: {expense.date}
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                </Box>

                {error && <Alert severity="error">{error}</Alert>}

                {isEditing ? (
                    <Stack direction="row" gap={2}>
                        <Button variant="contained" onClick={onSaveChanges}>
                            Сохранить
                        </Button>
                        <Button variant="outlined" onClick={handleCancelChanges}>
                            Отменить
                        </Button>
                    </Stack>
                ) : (
                    <Button variant="outlined" onClick={startEditing}>
                        Редактировать
                    </Button>
                )}
            </Stack>

            <ConfirmationDialog
                isOpen={dialogState.open && dialogState.type === 'save'}
                title="Вы точно хотите сохранить изменения?"
                onClose={handleCancelChanges}
                onConfirm={handleSaveChanges}
            />

            <ConfirmationDialog
                isOpen={dialogState.open && dialogState.type === 'delete'}
                title="Вы точно хотите удалить запись расхода?"
                onClose={handleCancelDelete}
                onConfirm={handleDeleteExpense}
            />
        </Paper>
    );
};

export default ExpenseCard;