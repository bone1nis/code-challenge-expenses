import { Box, Container } from '@mui/material';

import Header from './components/Header';
import Footer from './components/Footer';
import ExpensesList from './components/ExpensesList';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container sx={{ flex: 1 }}>
        <ExpensesList />
      </Container>
      <Footer />
    </Box>
  );
};

export default App;