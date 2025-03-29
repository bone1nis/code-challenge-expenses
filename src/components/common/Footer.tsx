import { Typography, AppBar, Toolbar, Box, useTheme } from "@mui/material";

import dayjs from "dayjs";

const Footer: React.FC = () => {
    const theme = useTheme();
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%"
                }}>
                    <Typography variant="body2" color={theme.palette.primary.contrastText}>
                        © {dayjs().year()} MySpends. Все права защищены.
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;