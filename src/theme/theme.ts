import { blueGrey, orange, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import responsiveFontSizes from "@mui/material/styles/responsiveFontSizes";
import "./fonts.css";

let theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    // Скролл-бар
                    scrollbarColor: "#6b6b6b #2b2b2b",
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        backgroundColor: "#2b2b2b",
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb":
                        {
                            borderRadius: 8,
                            backgroundColor: "#6b6b6b",
                            minHeight: 24,
                            border: "3px solid #2b2b2b",
                        },
                    "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                        {
                            backgroundColor: "#959595",
                        },
                    "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                        {
                            backgroundColor: "#959595",
                        },
                    "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                        {
                            backgroundColor: "#959595",
                        },
                    "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner":
                        {
                            backgroundColor: "#2b2b2b",
                        },
                },
            },
        },
    },

    typography: {
        fontFamily: `'Inter', sans-serif`,
        h1: {
            fontFamily: `'Prompt', sans-serif`,
            fontWeight: 700,
            fontSize: "3rem",
            color: "#FFFFFF",
        },
        h2: {
            fontFamily: `'Inter', sans-serif`,
            fontWeight: 600,
            fontSize: "1.5rem",
        },
        h3: {
            fontFamily: `'Inter', sans-serif`,
            fontWeight: 500,
            fontSize: "1.25rem",
        },
        button: {
            fontFamily: `'Inter', sans-serif`,
            fontWeight: 500,
            fontSize: "1.25rem",
        },
        body1: {
            fontFamily: `'Inter', sans-serif`,
            fontWeight: 400,
            fontSize: "1rem",
        },
        body2: {
            fontFamily: `'Inter', sans-serif`,
            fontWeight: 500,
            fontSize: "1rem",
        },
        subtitle1: {
            fontFamily: `'Inter', sans-serif`,
            fontWeight: 500,
            fontSize: "0.875rem",
        },
        subtitle2: {
            fontFamily: `'JetBrains Mono', monospace`,
            fontWeight: 500,
            fontSize: "0.875rem",
        },
    },

    palette: {
        mode: "dark",
        background: {
            paper: "#141218",
        },
        primary: {
            main: "#FFFFFF",
        },
        secondary: {
            main: "#8A0707",
        },
        error: {
            main: red.A400,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1720,
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
