import { Box, Grid } from '@mui/material';

import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/RootStoreContext';

import ExpenseCard from './ExpenseCard';

const ExpensesList: React.FC = observer(() => {
    const { expensesStore } = useStore();
    const expenses = expensesStore.expenses;
    return (
        <Box sx={{ padding: 2 }}>
            <Grid
                container
                spacing={3}>
                {expenses.map(expense => (
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4
                        }}
                        key={expense.id}>
                        <ExpenseCard expense={expense} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
});

export default ExpensesList;