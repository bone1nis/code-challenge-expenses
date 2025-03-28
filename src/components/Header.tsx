import { Typography, AppBar, Toolbar, useTheme } from "@mui/material";

const Header: React.FC = () => {
    const theme = useTheme();
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" color={theme.palette.primary.contrastText}>
                    MySpends
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;