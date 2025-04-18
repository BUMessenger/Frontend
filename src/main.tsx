import theme from "src/theme/theme";

import { CssBaseline, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import App from "src/App";
import { cfg } from "src/config/config";
import { AuthProvider } from "./context/AuthContext";

console.log(`App started with config ${JSON.stringify(cfg)}`);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
            <App />
        </AuthProvider>
    </ThemeProvider>
);
