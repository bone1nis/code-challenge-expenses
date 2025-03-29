import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009688",
      contrastText: "#fff",
    },
    secondary: {
      main: "#9e9e9e"
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordBreak: "break-word",
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
  },
});

export default theme;