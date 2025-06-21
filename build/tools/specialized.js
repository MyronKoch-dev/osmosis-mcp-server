export const specializedTools = [
    {
        name: "get-downtime-detector-params",
        description: "Returns downtime detector module parameters",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get-downtime-status",
        description: "Returns current downtime status for the chain",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get-validator-set-preference",
        description: "Returns validator set preferences for a user",
        inputSchema: {
            type: "object",
            properties: {
                address: {
                    type: "string",
                    description: "The user's Osmosis address"
                }
            },
            required: ["address"]
        }
    },
    {
        name: "get-ibc-rate-limits",
        description: "Returns IBC rate limiting information",
        inputSchema: {
            type: "object",
            properties: {
                channelId: {
                    type: "string",
                    description: "Optional: filter by specific IBC channel"
                }
            },
            required: []
        }
    },
    {
        name: "get-mint-params",
        description: "Returns token minting module parameters",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get-epoch-provisions",
        description: "Returns current epoch provisions for token minting",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get-all-locks-by-type",
        description: "Returns lock information filtered by lock type",
        inputSchema: {
            type: "object",
            properties: {
                lockType: {
                    type: "string",
                    description: "The type of lock to filter by",
                    enum: ["ByDuration", "ByTime", "NoLock"]
                },
                address: {
                    type: "string",
                    description: "Optional: filter by owner address"
                }
            },
            required: ["lockType"]
        }
    },
    {
        name: "get-synthetic-locks-by-lock-id",
        description: "Returns synthetic lock details by underlying lock ID",
        inputSchema: {
            type: "object",
            properties: {
                lockId: {
                    type: "string",
                    description: "The underlying lock ID"
                }
            },
            required: ["lockId"]
        }
    },
    {
        name: "get-fee-tokens",
        description: "Returns list of accepted fee payment tokens",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get-pool-incentives-params",
        description: "Returns pool incentives module parameters",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get-superfluid-params",
        description: "Returns superfluid staking module parameters",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    }
];
