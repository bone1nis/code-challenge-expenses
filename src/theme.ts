import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#009688",
            contrastText: "#fff"
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    wordBreak: 'break-word',
                },
            },
        },
    },
});

export default theme;