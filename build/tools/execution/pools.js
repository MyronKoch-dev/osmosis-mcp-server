export const poolExecutionTools = [
    {
        name: "create-pool",
        description: "Create a new liquidity pool on Osmosis",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                poolType: {
                    type: "string",
                    enum: ["balancer", "stableswap", "concentrated"],
                    description: "Type of pool to create"
                },
                poolAssets: {
                    type: "array",
                    description: "Assets for the pool with weights (for balancer pools)",
                    items: {
                        type: "object",
                        properties: {
                            token: {
                                type: "object",
                                properties: {
                                    denom: { type: "string" },
                                    amount: { type: "string" }
                                },
                                required: ["denom", "amount"]
                            },
                            weight: {
                                type: "string",
                                description: "Weight for balancer pools (e.g., '1000000' for equal weight)"
                            }
                        },
                        required: ["token"]
                    }
                },
                swapFee: {
                    type: "string",
                    description: "Swap fee as decimal (e.g., '0.003' for 0.3%)"
                },
                exitFee: {
                    type: "string",
                    description: "Exit fee as decimal (e.g., '0.001' for 0.1%)",
                    default: "0.000000000000000000"
                },
                futurePoolGovernor: {
                    type: "string",
                    description: "Future pool governor address (default: empty for no governance)"
                },
                // Stableswap specific
                scalingFactors: {
                    type: "array",
                    description: "Scaling factors for stableswap pools",
                    items: {
                        type: "string"
                    }
                },
                // Concentrated liquidity specific
                tickSpacing: {
                    type: "string",
                    description: "Tick spacing for concentrated liquidity pools"
                },
                spread_factor: {
                    type: "string",
                    description: "Spread factor for concentrated liquidity pools"
                },
                gas: {
                    type: "string",
                    description: "Gas limit (default: auto-estimate)"
                },
                gasPrice: {
                    type: "string",
                    description: "Gas price (default: 0.025uosmo)"
                },
                memo: {
                    type: "string",
                    description: "Transaction memo"
                }
            },
            required: ["mnemonic", "poolType", "poolAssets", "swapFee"]
        }
    },
    {
        name: "join-swap-extern-amount-in",
        description: "Join pool by swapping exact amount in",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                poolId: {
                    type: "string",
                    description: "Pool ID to join"
                },
                tokenIn: {
                    type: "object",
                    description: "Token to swap in",
                    properties: {
                        denom: { type: "string" },
                        amount: { type: "string" }
                    },
                    required: ["denom", "amount"]
                },
                shareOutMinAmount: {
                    type: "string",
                    description: "Minimum LP shares to receive"
                },
                gas: {
                    type: "string",
                    description: "Gas limit (default: auto-estimate)"
                },
                gasPrice: {
                    type: "string",
                    description: "Gas price (default: 0.025uosmo)"
                },
                memo: {
                    type: "string",
                    description: "Transaction memo"
                }
            },
            required: ["mnemonic", "poolId", "tokenIn", "shareOutMinAmount"]
        }
    },
    {
        name: "join-swap-share-amount-out",
        description: "Join pool by specifying exact LP shares to receive",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                poolId: {
                    type: "string",
                    description: "Pool ID to join"
                },
                tokenInDenom: {
                    type: "string",
                    description: "Denomination of token to swap in"
                },
                shareOutAmount: {
                    type: "string",
                    description: "Exact LP shares to receive"
                },
                tokenInMaxAmount: {
                    type: "string",
                    description: "Maximum token amount to swap in"
                },
                gas: {
                    type: "string",
                    description: "Gas limit (default: auto-estimate)"
                },
                gasPrice: {
                    type: "string",
                    description: "Gas price (default: 0.025uosmo)"
                },
                memo: {
                    type: "string",
                    description: "Transaction memo"
                }
            },
            required: ["mnemonic", "poolId", "tokenInDenom", "shareOutAmount", "tokenInMaxAmount"]
        }
    },
    {
        name: "exit-swap-extern-amount-out",
        description: "Exit pool by specifying exact token amount to receive",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                poolId: {
                    type: "string",
                    description: "Pool ID to exit"
                },
                tokenOut: {
                    type: "object",
                    description: "Token to receive",
                    properties: {
                        denom: { type: "string" },
                        amount: { type: "string" }
                    },
                    required: ["denom", "amount"]
                },
                shareInMaxAmount: {
                    type: "string",
                    description: "Maximum LP shares to burn"
                },
                gas: {
                    type: "string",
                    description: "Gas limit (default: auto-estimate)"
                },
                gasPrice: {
                    type: "string",
                    description: "Gas price (default: 0.025uosmo)"
                },
                memo: {
                    type: "string",
                    description: "Transaction memo"
                }
            },
            required: ["mnemonic", "poolId", "tokenOut", "shareInMaxAmount"]
        }
    },
    {
        name: "exit-swap-share-amount-in",
        description: "Exit pool by burning exact LP shares",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                poolId: {
                    type: "string",
                    description: "Pool ID to exit"
                },
                tokenOutDenom: {
                    type: "string",
                    description: "Denomination of token to receive"
                },
                shareInAmount: {
                    type: "string",
                    description: "Exact LP shares to burn"
                },
                tokenOutMinAmount: {
                    type: "string",
                    description: "Minimum token amount to receive"
                },
                gas: {
                    type: "string",
                    description: "Gas limit (default: auto-estimate)"
                },
                gasPrice: {
                    type: "string",
                    description: "Gas price (default: 0.025uosmo)"
                },
                memo: {
                    type: "string",
                    description: "Transaction memo"
                }
            },
            required: ["mnemonic", "poolId", "tokenOutDenom", "shareInAmount", "tokenOutMinAmount"]
        }
    },
    {
        name: "create-cosmwasm-pool",
        description: "Create a CosmWasm-based pool",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                codeId: {
                    type: "string",
                    description: "CosmWasm code ID for the pool contract"
                },
                instantiateMsg: {
                    type: "object",
                    description: "Instantiation message for the CosmWasm contract"
                },
                gas: {
                    type: "string",
                    description: "Gas limit (default: auto-estimate)"
                },
                gasPrice: {
                    type: "string",
                    description: "Gas price (default: 0.025uosmo)"
                },
                memo: {
                    type: "string",
                    description: "Transaction memo"
                }
            },
            required: ["mnemonic", "codeId", "instantiateMsg"]
        }
    },
    {
        name: "stable-swap",
        description: "Perform a stable asset swap",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                poolId: {
                    type: "string",
                    description: "Stable swap pool ID"
                },
                tokenIn: {
                    type: "object",
                    description: "Token to swap",
                    properties: {
                        denom: { type: "string" },
                        amount: { type: "string" }
                    },
                    required: ["denom", "amount"]
                },
                tokenOutDenom: {
                    type: "string",
                    description: "Denomination of token to receive"
                },
                tokenOutMinAmount: {
                    type: "string",
                    description: "Minimum amount of token to receive"
                },
                gas: {
                    type: "string",
                    description: "Gas limit (default: auto-estimate)"
                },
                gasPrice: {
                    type: "string",
                    description: "Gas price (default: 0.025uosmo)"
                },
                memo: {
                    type: "string",
                    description: "Transaction memo"
                }
            },
            required: ["mnemonic", "poolId", "tokenIn", "tokenOutDenom", "tokenOutMinAmount"]
        }
    },
    {
        name: "set-pool-weights",
        description: "Set new weights for a balancer pool (governance)",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                poolId: {
                    type: "string",
                    description: "Pool ID to update"
                },
                poolAssets: {
                    type: "array",
                    description: "New pool assets with weights",
                    items: {
                        type: "object",
                        properties: {
                            token: {
                                type: "object",
                                properties: {
                                    denom: { type: "string" },
                                    amount: { type: "string" }
                                },
                                required: ["denom", "amount"]
                            },
                            weight: { type: "string" }
                        },
                        required: ["token", "weight"]
                    }
                },
                gas: {
                    type: "string",
                    description: "Gas limit (default: auto-estimate)"
                },
                gasPrice: {
                    type: "string",
                    description: "Gas price (default: 0.025uosmo)"
                },
                memo: {
                    type: "string",
                    description: "Transaction memo"
                }
            },
            required: ["mnemonic", "poolId", "poolAssets"]
        }
    }
];
