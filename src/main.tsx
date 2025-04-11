import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import theme from "src/theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import App from "src/App";
import { cfg } from "src/config/config";

console.log(`App started with config ${JSON.stringify(cfg)}`);

const client = new ApolloClient({
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </ThemeProvider>
);
