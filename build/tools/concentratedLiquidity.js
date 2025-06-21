export const concentratedLiquidityTools = [
    {
        name: "get-cl-pools",
        description: "Returns all Concentrated Liquidity pools",
        inputSchema: {
            type: "object",
            properties: {
                limit: {
                    type: "string",
                    description: "Optional: maximum number of CL pools to return (default 10)"
                }
            },
            required: []
        }
    },
    {
        name: "get-cl-positions",
        description: "Returns Concentrated Liquidity positions for an address",
        inputSchema: {
            type: "object",
            properties: {
                address: {
                    type: "string",
                    description: "The address to query CL positions for"
                }
            },
            required: ["address"]
        }
    },
    {
        name: "get-cl-position",
        description: "Returns details of a specific Concentrated Liquidity position",
        inputSchema: {
            type: "object",
            properties: {
                positionId: {
                    type: "string",
                    description: "The position ID"
                }
            },
            required: ["positionId"]
        }
    },
    {
        name: "get-cl-positions-by-pool",
        description: "Returns all positions in a specific CL pool",
        inputSchema: {
            type: "object",
            properties: {
                poolId: {
                    type: "string",
                    description: "The CL pool ID"
                },
                limit: {
                    type: "number",
                    description: "Maximum number of positions to return (default: 100)",
                    minimum: 1,
                    maximum: 500
                }
            },
            required: ["poolId"]
        }
    },
    {
        name: "get-cl-user-positions",
        description: "Returns all CL positions for a user across all pools",
        inputSchema: {
            type: "object",
            properties: {
                address: {
                    type: "string",
                    description: "The user's Osmosis address"
                },
                poolId: {
                    type: "string",
                    description: "Optional: filter by specific pool ID"
                }
            },
            required: ["address"]
        }
    },
    {
        name: "price-to-tick",
        description: "Converts a price to a tick value for CL pools",
        inputSchema: {
            type: "object",
            properties: {
                price: {
                    type: "string",
                    description: "The price to convert"
                },
                tickSpacing: {
                    type: "number",
                    description: "The tick spacing of the pool"
                },
                baseAssetDenom: {
                    type: "string",
                    description: "The base asset denomination"
                },
                quoteAssetDenom: {
                    type: "string",
                    description: "The quote asset denomination"
                }
            },
            required: ["price", "tickSpacing", "baseAssetDenom", "quoteAssetDenom"]
        }
    },
    {
        name: "tick-to-price",
        description: "Converts a tick value to a price for CL pools",
        inputSchema: {
            type: "object",
            properties: {
                tick: {
                    type: "number",
                    description: "The tick value to convert"
                },
                baseAssetDenom: {
                    type: "string",
                    description: "The base asset denomination"
                },
                quoteAssetDenom: {
                    type: "string",
                    description: "The quote asset denomination"
                }
            },
            required: ["tick", "baseAssetDenom", "quoteAssetDenom"]
        }
    },
    {
        name: "get-cl-pool-incentives",
        description: "Returns incentive information for a CL pool",
        inputSchema: {
            type: "object",
            properties: {
                poolId: {
                    type: "string",
                    description: "The CL pool ID"
                }
            },
            required: ["poolId"]
        }
    },
    {
        name: "get-cl-pool-liquidity",
        description: "Returns liquidity depth and distribution for a CL pool",
        inputSchema: {
            type: "object",
            properties: {
                poolId: {
                    type: "string",
                    description: "The CL pool ID"
                },
                tickLower: {
                    type: "number",
                    description: "Optional: lower tick bound to query"
                },
                tickUpper: {
                    type: "number",
                    description: "Optional: upper tick bound to query"
                }
            },
            required: ["poolId"]
        }
    },
    {
        name: "get-cl-pool-tick-data",
        description: "Returns tick spacing and current tick for a CL pool",
        inputSchema: {
            type: "object",
            properties: {
                poolId: {
                    type: "string",
                    description: "The CL pool ID"
                }
            },
            required: ["poolId"]
        }
    },
    {
        name: "get-cl-pool-fee-growth",
        description: "Returns fee growth statistics for a CL pool",
        inputSchema: {
            type: "object",
            properties: {
                poolId: {
                    type: "string",
                    description: "The CL pool ID"
                }
            },
            required: ["poolId"]
        }
    },
    {
        name: "prepare-cl-create-position",
        description: "Prepares a transaction to create a new CL position",
        inputSchema: {
            type: "object",
            properties: {
                poolId: {
                    type: "string",
                    description: "The CL pool ID"
                },
                sender: {
                    type: "string",
                    description: "The sender's Osmosis address"
                },
                lowerTick: {
                    type: "number",
                    description: "Lower tick bound for the position"
                },
                upperTick: {
                    type: "number",
                    description: "Upper tick bound for the position"
                },
                tokensProvided: {
                    type: "array",
                    description: "Tokens to provide as liquidity",
                    items: {
                        type: "object",
                        properties: {
                            denom: {
                                type: "string",
                                description: "Token denomination"
                            },
                            amount: {
                                type: "string",
                                description: "Amount to provide"
                            }
                        },
                        required: ["denom", "amount"]
                    }
                },
                tokenMinAmount0: {
                    type: "string",
                    description: "Minimum amount of token0 to use"
                },
                tokenMinAmount1: {
                    type: "string",
                    description: "Minimum amount of token1 to use"
                }
            },
            required: ["poolId", "sender", "lowerTick", "upperTick", "tokensProvided", "tokenMinAmount0", "tokenMinAmount1"]
        }
    },
    {
        name: "prepare-cl-add-liquidity",
        description: "Prepares a transaction to add liquidity to an existing CL position",
        inputSchema: {
            type: "object",
            properties: {
                positionId: {
                    type: "string",
                    description: "The position ID to add liquidity to"
                },
                sender: {
                    type: "string",
                    description: "The sender's Osmosis address"
                },
                amount0: {
                    type: "string",
                    description: "Amount of token0 to add"
                },
                amount1: {
                    type: "string",
                    description: "Amount of token1 to add"
                },
                tokenMinAmount0: {
                    type: "string",
                    description: "Minimum amount of token0 to use"
                },
                tokenMinAmount1: {
                    type: "string",
                    description: "Minimum amount of token1 to use"
                }
            },
            required: ["positionId", "sender", "amount0", "amount1", "tokenMinAmount0", "tokenMinAmount1"]
        }
    },
    {
        name: "prepare-cl-remove-liquidity",
        description: "Prepares a transaction to remove liquidity from a CL position",
        inputSchema: {
            type: "object",
            properties: {
                positionId: {
                    type: "string",
                    description: "The position ID to remove liquidity from"
                },
                sender: {
                    type: "string",
                    description: "The sender's Osmosis address"
                },
                liquidityAmount: {
                    type: "string",
                    description: "Amount of liquidity to remove"
                }
            },
            required: ["positionId", "sender", "liquidityAmount"]
        }
    },
    {
        name: "get-cl-swap-estimates",
        description: "Returns swap estimates specifically for CL pools with price impact",
        inputSchema: {
            type: "object",
            properties: {
                poolId: {
                    type: "string",
                    description: "The CL pool ID"
                },
                tokenIn: {
                    type: "string",
                    description: "Input token denomination"
                },
                tokenOut: {
                    type: "string",
                    description: "Output token denomination"
                },
                amount: {
                    type: "string",
                    description: "Amount to swap"
                },
                isExactIn: {
                    type: "boolean",
                    description: "Whether the amount is exact input (true) or exact output (false)"
                }
            },
            required: ["poolId", "tokenIn", "tokenOut", "amount"]
        }
    }
];
