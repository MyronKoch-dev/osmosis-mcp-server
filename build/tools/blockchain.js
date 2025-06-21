export const blockchainTools = [
    {
        name: "get-blockchain-status",
        description: "Returns the current status of the Osmosis blockchain",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get-account-balance",
        description: "Returns token balances for an Osmosis address",
        inputSchema: {
            type: "object",
            properties: {
                address: {
                    type: "string",
                    description: "The Osmosis address to query balances for"
                }
            },
            required: ["address"]
        }
    },
    {
        name: "get-epochs",
        description: "Returns information about all epochs",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get-transaction",
        description: "Returns detailed information about a specific transaction by hash",
        inputSchema: {
            type: "object",
            properties: {
                hash: {
                    type: "string",
                    description: "The transaction hash to query"
                }
            },
            required: ["hash"]
        }
    },
    {
        name: "get-latest-blocks",
        description: "Returns information about the most recent blocks",
        inputSchema: {
            type: "object",
            properties: {
                limit: {
                    type: "number",
                    description: "Number of blocks to return (default: 10, max: 100)",
                    minimum: 1,
                    maximum: 100
                }
            },
            required: []
        }
    },
    {
        name: "get-token-info",
        description: "Returns metadata about a specific token denomination",
        inputSchema: {
            type: "object",
            properties: {
                denom: {
                    type: "string",
                    description: "The token denomination (e.g., 'uosmo', 'ibc/...')"
                }
            },
            required: ["denom"]
        }
    },
    {
        name: "get-supply",
        description: "Returns the total supply information for a specific token",
        inputSchema: {
            type: "object",
            properties: {
                denom: {
                    type: "string",
                    description: "The token denomination to query supply for"
                }
            },
            required: ["denom"]
        }
    },
    {
        name: "get-chain-params",
        description: "Returns current chain parameters for the Osmosis blockchain",
        inputSchema: {
            type: "object",
            properties: {
                module: {
                    type: "string",
                    description: "Specific module parameters to query (optional)",
                    enum: ["auth", "bank", "staking", "distribution", "slashing", "gov", "mint", "crisis", "ibc"]
                }
            },
            required: []
        }
    },
    {
        name: "get-module-accounts",
        description: "Returns information about module accounts on the chain",
        inputSchema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    description: "Specific module account name to query (optional)"
                }
            },
            required: []
        }
    }
];
