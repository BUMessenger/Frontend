export interface Config {
    basePath: string;
    apiHost: string;
    graphqlEndpoint: string;
}

export const cfg: Config = {
    basePath: import.meta.env.VITE_BASE_PATH!,
    apiHost: import.meta.env.VITE_API_HOST!,
    graphqlEndpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT!,
};
