export const lockupExecutionTools = [
    {
        name: "lock-tokens",
        description: "Lock tokens for incentive rewards on Osmosis",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                coins: {
                    type: "array",
                    description: "Coins to lock",
                    items: {
                        type: "object",
                        properties: {
                            denom: { type: "string" },
                            amount: { type: "string" }
                        },
                        required: ["denom", "amount"]
                    }
                },
                duration: {
                    type: "string",
                    description: "Lock duration in seconds (e.g., '86400' for 1 day, '604800' for 1 week, '1209600' for 2 weeks)"
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
            required: ["mnemonic", "coins", "duration"]
        }
    },
    {
        name: "begin-unlocking",
        description: "Begin unlocking specific locked tokens",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                id: {
                    type: "string",
                    description: "Lock ID to begin unlocking"
                },
                coins: {
                    type: "array",
                    description: "Specific coins to unlock (optional - unlocks all if not specified)",
                    items: {
                        type: "object",
                        properties: {
                            denom: { type: "string" },
                            amount: { type: "string" }
                        },
                        required: ["denom", "amount"]
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
            required: ["mnemonic", "id"]
        }
    },
    {
        name: "begin-unlocking-all",
        description: "Begin unlocking all locked tokens for an account",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
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
            required: ["mnemonic"]
        }
    },
    {
        name: "unlock-period-lock",
        description: "Unlock tokens from a completed lock period",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                id: {
                    type: "string",
                    description: "Lock ID to unlock"
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
            required: ["mnemonic", "id"]
        }
    },
    {
        name: "claim-incentives",
        description: "Claim available incentive rewards from locked tokens",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                lockIds: {
                    type: "array",
                    description: "Specific lock IDs to claim from (optional - claims all if not specified)",
                    items: {
                        type: "string"
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
            required: ["mnemonic"]
        }
    },
    {
        name: "create-gauge",
        description: "Create a new incentive gauge for rewarding locked tokens",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                isPerpetual: {
                    type: "boolean",
                    description: "Whether the gauge is perpetual (ongoing) or finite",
                    default: false
                },
                distributeTo: {
                    type: "object",
                    description: "Distribution criteria for the gauge",
                    properties: {
                        lockQueryType: {
                            type: "string",
                            enum: ["ByDuration", "ByTime", "NoLock"],
                            description: "Type of lock query"
                        },
                        denom: {
                            type: "string",
                            description: "Token denomination to incentivize"
                        },
                        duration: {
                            type: "string",
                            description: "Required lock duration in seconds"
                        },
                        timestamp: {
                            type: "string",
                            description: "Timestamp for ByTime queries"
                        }
                    },
                    required: ["lockQueryType", "denom"]
                },
                coins: {
                    type: "array",
                    description: "Coins to distribute as rewards",
                    items: {
                        type: "object",
                        properties: {
                            denom: { type: "string" },
                            amount: { type: "string" }
                        },
                        required: ["denom", "amount"]
                    }
                },
                startTime: {
                    type: "string",
                    description: "Start time for distribution (RFC3339 format)"
                },
                numEpochsPaidOver: {
                    type: "string",
                    description: "Number of epochs to distribute over (for finite gauges)"
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
            required: ["mnemonic", "distributeTo", "coins", "startTime"]
        }
    }
];
