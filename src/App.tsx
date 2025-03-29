import { Box, Container, Stack } from '@mui/material';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ExpensesList from './components/expenses/ExpensesList';
import ExpenseFilters from './components/expenses/ExpenseFilters';
import ExpenseForm from './components/expenses/ExpenseForm';

const App: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Header />
      <Container sx={{ flex: 1 }}>
        <Stack
          direction={{
            xs: "column",
            md: "row"
          }}
          gap={2}
          sx={{
            marginY: 4
          }}>
          <ExpenseFilters />
          <ExpenseForm />
        </Stack>
        <ExpensesList />
      </Container>
      <Footer />
    </Box>
  );
};

export default App;