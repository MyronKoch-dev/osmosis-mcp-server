export const adminExecutionTools = [
    {
        name: "update-params",
        description: "Update module parameters (governance/admin only)",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                authority: {
                    type: "string",
                    description: "Authority address (usually governance module)"
                },
                module: {
                    type: "string",
                    description: "Module to update parameters for",
                    enum: ["gamm", "incentives", "lockup", "poolincentives", "superfluid", "tokenfactory", "protorev"]
                },
                params: {
                    type: "object",
                    description: "New parameters to set (module-specific structure)"
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
            required: ["mnemonic", "authority", "module", "params"]
        }
    },
    {
        name: "upgrade-proposal",
        description: "Submit a software upgrade proposal",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                title: {
                    type: "string",
                    description: "Upgrade proposal title"
                },
                description: {
                    type: "string",
                    description: "Upgrade proposal description"
                },
                name: {
                    type: "string",
                    description: "Upgrade name"
                },
                height: {
                    type: "string",
                    description: "Block height to perform upgrade"
                },
                info: {
                    type: "string",
                    description: "Upgrade info (usually JSON with binaries)"
                },
                initialDeposit: {
                    type: "string",
                    description: "Initial deposit amount in uosmo",
                    default: "10000000"
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
            required: ["mnemonic", "title", "description", "name", "height"]
        }
    },
    {
        name: "cancel-upgrade",
        description: "Cancel a pending software upgrade",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                authority: {
                    type: "string",
                    description: "Authority address (usually governance module)"
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
            required: ["mnemonic", "authority"]
        }
    },
    {
        name: "set-withdrawal-address",
        description: "Set reward withdrawal address for delegation rewards",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                withdrawAddress: {
                    type: "string",
                    description: "Address to set as withdrawal address"
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
            required: ["mnemonic", "withdrawAddress"]
        }
    },
    {
        name: "fund-community-pool",
        description: "Fund the community pool with tokens",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                amount: {
                    type: "array",
                    description: "Amount to fund community pool with",
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
            required: ["mnemonic", "amount"]
        }
    }
];
