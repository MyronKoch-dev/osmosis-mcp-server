export const defiTools = [
    {
        name: "get-twap",
        description: "Returns Time-Weighted Average Price for a pool",
        inputSchema: {
            type: "object",
            properties: {
                poolId: {
                    type: "string",
                    description: "The pool ID"
                },
                baseAsset: {
                    type: "string",
                    description: "Base asset denomination"
                },
                quoteAsset: {
                    type: "string",
                    description: "Quote asset denomination"
                },
                startTime: {
                    type: "string",
                    description: "Start time (RFC3339 format)"
                },
                endTime: {
                    type: "string",
                    description: "Optional: End time (RFC3339 format, defaults to now)"
                }
            },
            required: ["poolId", "baseAsset", "quoteAsset", "startTime"]
        }
    },
    {
        name: "get-lockups",
        description: "Returns token lockup information for an address",
        inputSchema: {
            type: "object",
            properties: {
                owner: {
                    type: "string",
                    description: "The owner address"
                }
            },
            required: ["owner"]
        }
    },
    {
        name: "get-superfluid-assets",
        description: "Returns available superfluid staking assets",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get-denoms-by-creator",
        description: "Returns all token factory denoms created by an address",
        inputSchema: {
            type: "object",
            properties: {
                creator: {
                    type: "string",
                    description: "The creator address"
                }
            },
            required: ["creator"]
        }
    },
    {
        name: "get-ibc-denom-trace",
        description: "Returns the source information for an IBC token",
        inputSchema: {
            type: "object",
            properties: {
                hash: {
                    type: "string",
                    description: "The IBC token hash"
                }
            },
            required: ["hash"]
        }
    }
];
