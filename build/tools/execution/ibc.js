export const ibcExecutionTools = [
    {
        name: "ibc-transfer",
        description: "Transfer tokens across chains using IBC",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                sourcePort: {
                    type: "string",
                    description: "Source port (usually 'transfer')",
                    default: "transfer"
                },
                sourceChannel: {
                    type: "string",
                    description: "Source channel ID (e.g., 'channel-0' for Cosmos Hub)"
                },
                token: {
                    type: "object",
                    description: "Token to transfer",
                    properties: {
                        denom: { type: "string" },
                        amount: { type: "string" }
                    },
                    required: ["denom", "amount"]
                },
                receiver: {
                    type: "string",
                    description: "Recipient address on destination chain"
                },
                timeoutHeight: {
                    type: "object",
                    description: "Timeout height for the transfer",
                    properties: {
                        revisionNumber: { type: "string" },
                        revisionHeight: { type: "string" }
                    }
                },
                timeoutTimestamp: {
                    type: "string",
                    description: "Timeout timestamp in nanoseconds (0 to disable)"
                },
                memo: {
                    type: "string",
                    description: "Transfer memo"
                },
                gas: {
                    type: "string",
                    description: "Gas limit (default: auto-estimate)"
                },
                gasPrice: {
                    type: "string",
                    description: "Gas price (default: 0.025uosmo)"
                }
            },
            required: ["mnemonic", "sourceChannel", "token", "receiver"]
        }
    },
    {
        name: "timeout-packet",
        description: "Timeout an IBC packet that failed to be delivered",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                packet: {
                    type: "object",
                    description: "IBC packet to timeout",
                    properties: {
                        sequence: { type: "string" },
                        sourcePort: { type: "string" },
                        sourceChannel: { type: "string" },
                        destinationPort: { type: "string" },
                        destinationChannel: { type: "string" },
                        data: { type: "string" },
                        timeoutHeight: {
                            type: "object",
                            properties: {
                                revisionNumber: { type: "string" },
                                revisionHeight: { type: "string" }
                            }
                        },
                        timeoutTimestamp: { type: "string" }
                    },
                    required: ["sequence", "sourcePort", "sourceChannel", "destinationPort", "destinationChannel", "data"]
                },
                proofUnreceived: {
                    type: "string",
                    description: "Proof that packet was not received"
                },
                proofHeight: {
                    type: "object",
                    description: "Height at which proof was generated",
                    properties: {
                        revisionNumber: { type: "string" },
                        revisionHeight: { type: "string" }
                    },
                    required: ["revisionNumber", "revisionHeight"]
                },
                nextSequenceRecv: {
                    type: "string",
                    description: "Next sequence receive number"
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
            required: ["mnemonic", "packet", "proofUnreceived", "proofHeight", "nextSequenceRecv"]
        }
    },
    {
        name: "acknowledge-packet",
        description: "Acknowledge receipt of an IBC packet",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                packet: {
                    type: "object",
                    description: "IBC packet to acknowledge",
                    properties: {
                        sequence: { type: "string" },
                        sourcePort: { type: "string" },
                        sourceChannel: { type: "string" },
                        destinationPort: { type: "string" },
                        destinationChannel: { type: "string" },
                        data: { type: "string" },
                        timeoutHeight: {
                            type: "object",
                            properties: {
                                revisionNumber: { type: "string" },
                                revisionHeight: { type: "string" }
                            }
                        },
                        timeoutTimestamp: { type: "string" }
                    },
                    required: ["sequence", "sourcePort", "sourceChannel", "destinationPort", "destinationChannel", "data"]
                },
                acknowledgement: {
                    type: "string",
                    description: "Acknowledgement data"
                },
                proofAcked: {
                    type: "string",
                    description: "Proof that packet was acknowledged"
                },
                proofHeight: {
                    type: "object",
                    description: "Height at which proof was generated",
                    properties: {
                        revisionNumber: { type: "string" },
                        revisionHeight: { type: "string" }
                    },
                    required: ["revisionNumber", "revisionHeight"]
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
            required: ["mnemonic", "packet", "acknowledgement", "proofAcked", "proofHeight"]
        }
    },
    {
        name: "update-client",
        description: "Update an IBC light client with new header",
        inputSchema: {
            type: "object",
            properties: {
                mnemonic: {
                    type: "string",
                    description: "BIP-39 mnemonic phrase for signing the transaction"
                },
                clientId: {
                    type: "string",
                    description: "Client identifier"
                },
                clientMessage: {
                    type: "object",
                    description: "Client message containing header or misbehaviour",
                    properties: {
                        typeUrl: { type: "string" },
                        value: { type: "string" }
                    },
                    required: ["typeUrl", "value"]
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
            required: ["mnemonic", "clientId", "clientMessage"]
        }
    }
];
