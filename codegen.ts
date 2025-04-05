import { CodegenConfig } from "@graphql-codegen/cli";
import { cfg } from "./src/config/config";

const config: CodegenConfig = {
    schema: cfg.graphqlEndpoint,
    documents: ["src/**/*.tsx"],
    generates: {
        "./src/__generated__/": {
            preset: "client",
            //plugins: ['typescript', 'typescript-operations'],
            presetConfig: {
                gqlTagName: "gql",
            },
        },
    },
    ignoreNoDocuments: true,
    hooks: {
        afterOneFileWrite: ["prettier --write"],
    },
};

export default config;
