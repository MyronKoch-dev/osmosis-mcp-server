// Bank Execution Tools - Basic token operations
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const bankExecutionTools: Tool[] = [
  {
    name: "send",
    description: "Send tokens to another address",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase for signing the transaction"
        },
        toAddress: {
          type: "string",
          description: "Recipient address"
        },
        amount: {
          type: "array",
          description: "Amount and denomination to send",
          items: {
            type: "object",
            properties: {
              denom: { 
                type: "string",
                description: "Token denomination (e.g., 'uosmo', 'uion')"
              },
              amount: { 
                type: "string",
                description: "Amount in base units (e.g., '1000000' for 1 OSMO)"
              }
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
      required: ["mnemonic", "toAddress", "amount"]
    }
  },
  {
    name: "multi-send",
    description: "Send tokens to multiple addresses in a single transaction",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase for signing the transaction"
        },
        inputs: {
          type: "array",
          description: "Input sources (usually just sender)",
          items: {
            type: "object",
            properties: {
              address: { type: "string" },
              coins: {
                type: "array",
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
            required: ["address", "coins"]
          }
        },
        outputs: {
          type: "array",
          description: "Output destinations",
          items: {
            type: "object",
            properties: {
              address: { type: "string" },
              coins: {
                type: "array",
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
            required: ["address", "coins"]
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
      required: ["mnemonic", "inputs", "outputs"]
    }
  },
  {
    name: "set-send-enabled",
    description: "Enable or disable sending for specific token denominations (admin only)",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase for signing the transaction (must be admin)"
        },
        sendEnabled: {
          type: "array",
          description: "Send enabled configurations",
          items: {
            type: "object",
            properties: {
              denom: { 
                type: "string",
                description: "Token denomination"
              },
              enabled: { 
                type: "boolean",
                description: "Whether sending is enabled"
              }
            },
            required: ["denom", "enabled"]
          }
        },
        useDefaultFor: {
          type: "array",
          description: "Denominations to use default settings for",
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
      required: ["mnemonic", "sendEnabled"]
    }
  }
];