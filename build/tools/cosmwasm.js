export const cosmwasmTools = [
    {
        name: "get-wasm-codes",
        description: "Returns all uploaded WASM codes",
        inputSchema: {
            type: "object",
            properties: {
                limit: {
                    type: "number",
                    description: "Maximum number of codes to return (default: 50)",
                    minimum: 1,
                    maximum: 200
                },
                startAfter: {
                    type: "number",
                    description: "Code ID to start after for pagination"
                }
            },
            required: []
        }
    },
    {
        name: "get-wasm-code-info",
        description: "Returns information about a specific WASM code",
        inputSchema: {
            type: "object",
            properties: {
                codeId: {
                    type: "number",
                    description: "The code ID to query"
                }
            },
            required: ["codeId"]
        }
    },
    {
        name: "get-contracts-by-code",
        description: "Returns all contracts instantiated from a specific code ID",
        inputSchema: {
            type: "object",
            properties: {
                codeId: {
                    type: "number",
                    description: "The code ID to query contracts for"
                },
                limit: {
                    type: "number",
                    description: "Maximum number of contracts to return (default: 50)",
                    minimum: 1,
                    maximum: 200
                }
            },
            required: ["codeId"]
        }
    },
    {
        name: "get-contract-info",
        description: "Returns metadata about a specific contract",
        inputSchema: {
            type: "object",
            properties: {
                contractAddress: {
                    type: "string",
                    description: "The contract address to query"
                }
            },
            required: ["contractAddress"]
        }
    },
    {
        name: "query-contract-state",
        description: "Queries the state of a smart contract",
        inputSchema: {
            type: "object",
            properties: {
                contractAddress: {
                    type: "string",
                    description: "The contract address to query"
                },
                queryMsg: {
                    type: "object",
                    description: "The query message as a JSON object"
                }
            },
            required: ["contractAddress", "queryMsg"]
        }
    },
    {
        name: "get-contract-history",
        description: "Returns the code migration history of a contract",
        inputSchema: {
            type: "object",
            properties: {
                contractAddress: {
                    type: "string",
                    description: "The contract address to query"
                }
            },
            required: ["contractAddress"]
        }
    },
    {
        name: "prepare-instantiate-contract",
        description: "Prepares a transaction to instantiate a new contract",
        inputSchema: {
            type: "object",
            properties: {
                sender: {
                    type: "string",
                    description: "The sender's Osmosis address"
                },
                codeId: {
                    type: "number",
                    description: "The code ID to instantiate"
                },
                label: {
                    type: "string",
                    description: "A human-readable label for the contract"
                },
                initMsg: {
                    type: "object",
                    description: "The instantiation message as a JSON object"
                },
                funds: {
                    type: "array",
                    description: "Optional funds to send with instantiation",
                    items: {
                        type: "object",
                        properties: {
                            denom: {
                                type: "string",
                                description: "Token denomination"
                            },
                            amount: {
                                type: "string",
                                description: "Amount to send"
                            }
                        },
                        required: ["denom", "amount"]
                    }
                },
                admin: {
                    type: "string",
                    description: "Optional admin address for the contract"
                }
            },
            required: ["sender", "codeId", "label", "initMsg"]
        }
    },
    {
        name: "prepare-execute-contract",
        description: "Prepares a transaction to execute a contract",
        inputSchema: {
            type: "object",
            properties: {
                sender: {
                    type: "string",
                    description: "The sender's Osmosis address"
                },
                contractAddress: {
                    type: "string",
                    description: "The contract address to execute"
                },
                executeMsg: {
                    type: "object",
                    description: "The execution message as a JSON object"
                },
                funds: {
                    type: "array",
                    description: "Optional funds to send with execution",
                    items: {
                        type: "object",
                        properties: {
                            denom: {
                                type: "string",
                                description: "Token denomination"
                            },
                            amount: {
                                type: "string",
                                description: "Amount to send"
                            }
                        },
                        required: ["denom", "amount"]
                    }
                }
            },
            required: ["sender", "contractAddress", "executeMsg"]
        }
    },
    {
        name: "prepare-migrate-contract",
        description: "Prepares a transaction to migrate a contract to new code",
        inputSchema: {
            type: "object",
            properties: {
                sender: {
                    type: "string",
                    description: "The sender's Osmosis address (must be admin)"
                },
                contractAddress: {
                    type: "string",
                    description: "The contract address to migrate"
                },
                newCodeId: {
                    type: "number",
                    description: "The new code ID to migrate to"
                },
                migrateMsg: {
                    type: "object",
                    description: "The migration message as a JSON object"
                }
            },
            required: ["sender", "contractAddress", "newCodeId", "migrateMsg"]
        }
    },
    {
        name: "get-contract-code-id",
        description: "Returns the code ID of a contract",
        inputSchema: {
            type: "object",
            properties: {
                contractAddress: {
                    type: "string",
                    description: "The contract address to query"
                }
            },
            required: ["contractAddress"]
        }
    },
    {
        name: "get-contract-admin",
        description: "Returns the admin address of a contract",
        inputSchema: {
            type: "object",
            properties: {
                contractAddress: {
                    type: "string",
                    description: "The contract address to query"
                }
            },
            required: ["contractAddress"]
        }
    },
    {
        name: "get-contract-label",
        description: "Returns the label of a contract",
        inputSchema: {
            type: "object",
            properties: {
                contractAddress: {
                    type: "string",
                    description: "The contract address to query"
                }
            },
            required: ["contractAddress"]
        }
    },
    {
        name: "query-contract-raw",
        description: "Queries raw contract storage by key",
        inputSchema: {
            type: "object",
            properties: {
                contractAddress: {
                    type: "string",
                    description: "The contract address to query"
                },
                key: {
                    type: "string",
                    description: "The storage key (hex encoded)"
                }
            },
            required: ["contractAddress", "key"]
        }
    },
    {
        name: "get-pinned-codes",
        description: "Returns all pinned code IDs",
        inputSchema: {
            type: "object",
            properties: {
                limit: {
                    type: "number",
                    description: "Maximum number of codes to return (default: 50)",
                    minimum: 1,
                    maximum: 200
                }
            },
            required: []
        }
    },
    {
        name: "get-code-metadata",
        description: "Returns metadata for a WASM code",
        inputSchema: {
            type: "object",
            properties: {
                codeId: {
                    type: "number",
                    description: "The code ID to query"
                }
            },
            required: ["codeId"]
        }
    },
    {
        name: "validate-contract-address",
        description: "Validates if an address is a valid contract",
        inputSchema: {
            type: "object",
            properties: {
                address: {
                    type: "string",
                    description: "The address to validate"
                }
            },
            required: ["address"]
        }
    },
    {
        name: "estimate-instantiate-fee",
        description: "Estimates gas fees for contract instantiation",
        inputSchema: {
            type: "object",
            properties: {
                sender: {
                    type: "string",
                    description: "The sender's Osmosis address"
                },
                codeId: {
                    type: "number",
                    description: "The code ID to instantiate"
                },
                initMsg: {
                    type: "object",
                    description: "The instantiation message"
                },
                funds: {
                    type: "array",
                    description: "Optional funds to send",
                    items: {
                        type: "object",
                        properties: {
                            denom: { type: "string" },
                            amount: { type: "string" }
                        },
                        required: ["denom", "amount"]
                    }
                }
            },
            required: ["sender", "codeId", "initMsg"]
        }
    },
    {
        name: "estimate-execute-fee",
        description: "Estimates gas fees for contract execution",
        inputSchema: {
            type: "object",
            properties: {
                sender: {
                    type: "string",
                    description: "The sender's Osmosis address"
                },
                contractAddress: {
                    type: "string",
                    description: "The contract address"
                },
                executeMsg: {
                    type: "object",
                    description: "The execution message"
                },
                funds: {
                    type: "array",
                    description: "Optional funds to send",
                    items: {
                        type: "object",
                        properties: {
                            denom: { type: "string" },
                            amount: { type: "string" }
                        },
                        required: ["denom", "amount"]
                    }
                }
            },
            required: ["sender", "contractAddress", "executeMsg"]
        }
    },
    {
        name: "get-contract-ibc-port",
        description: "Returns the IBC port ID for contracts with IBC capabilities",
        inputSchema: {
            type: "object",
            properties: {
                contractAddress: {
                    type: "string",
                    description: "The contract address to query"
                }
            },
            required: ["contractAddress"]
        }
    },
    {
        name: "get-contract-events",
        description: "Returns events emitted by a contract",
        inputSchema: {
            type: "object",
            properties: {
                contractAddress: {
                    type: "string",
                    description: "The contract address to query"
                },
                eventType: {
                    type: "string",
                    description: "Optional: filter by specific event type"
                },
                limit: {
                    type: "number",
                    description: "Maximum number of events to return (default: 50)",
                    minimum: 1,
                    maximum: 200
                }
            },
            required: ["contractAddress"]
        }
    }
];
