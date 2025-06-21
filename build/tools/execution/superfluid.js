export const superfluidExecutionTools = [
    {
        name: "superfluid-delegate",
        description: "Delegate locked LP tokens to a validator using Superfluid staking",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                lockId: {
                    type: "string",
                    description: "Lock ID of the locked LP tokens"
                },
                valAddr: {
                    type: "string",
                    description: "Validator address to delegate to"
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
            required: ["mnemonic", "lockId", "valAddr"]
        }
    },
    {
        name: "superfluid-undelegate",
        description: "Undelegate Superfluid staked tokens",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                lockId: {
                    type: "string",
                    description: "Lock ID of the superfluid delegated tokens"
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
            required: ["mnemonic", "lockId"]
        }
    },
    {
        name: "lock-and-superfluid-delegate",
        description: "Lock LP tokens and immediately delegate via Superfluid in one transaction",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                coins: {
                    type: "array",
                    description: "LP tokens to lock and delegate",
                    items: {
                        type: "object",
                        properties: {
                            denom: { type: "string" },
                            amount: { type: "string" }
                        },
                        required: ["denom", "amount"]
                    }
                },
                valAddr: {
                    type: "string",
                    description: "Validator address to delegate to"
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
            required: ["mnemonic", "coins", "valAddr"]
        }
    },
    {
        name: "unlock-and-migrate-superfluid-tokens",
        description: "Unlock and migrate Superfluid tokens to new validator",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                lockId: {
                    type: "string",
                    description: "Lock ID of the superfluid tokens"
                },
                newValAddr: {
                    type: "string",
                    description: "New validator address to migrate to"
                },
                tokenOutMins: {
                    type: "array",
                    description: "Minimum token amounts to receive after migration",
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
            required: ["mnemonic", "lockId", "newValAddr", "tokenOutMins"]
        }
    }
];
