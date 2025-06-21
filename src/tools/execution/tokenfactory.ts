// Token Factory Advanced Execution Tools
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const tokenfactoryExecutionTools: Tool[] = [
  {
    name: "set-token-metadata",
    description: "Set metadata for a token factory token",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase for signing the transaction"
        },
        denom: {
          type: "string",
          description: "Token denomination to set metadata for"
        },
        metadata: {
          type: "object",
          description: "Token metadata",
          properties: {
            description: { type: "string" },
            denomUnits: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  denom: { type: "string" },
                  exponent: { type: "number" },
                  aliases: {
                    type: "array",
                    items: { type: "string" }
                  }
                },
                required: ["denom", "exponent"]
              }
            },
            base: { type: "string" },
            display: { type: "string" },
            name: { type: "string" },
            symbol: { type: "string" },
            uri: { type: "string" },
            uriHash: { type: "string" }
          },
          required: ["description", "denomUnits", "base", "display", "name", "symbol"]
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
      required: ["mnemonic", "denom", "metadata"]
    }
  },
  {
    name: "force-transfer",
    description: "Force transfer tokens (admin only)",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase for signing the transaction (must be admin)"
        },
        denom: {
          type: "string",
          description: "Token denomination to force transfer"
        },
        amount: {
          type: "string",
          description: "Amount to transfer"
        },
        transferFromAddress: {
          type: "string",
          description: "Address to transfer from"
        },
        transferToAddress: {
          type: "string",
          description: "Address to transfer to"
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
      required: ["mnemonic", "denom", "amount", "transferFromAddress", "transferToAddress"]
    }
  },
  {
    name: "set-before-send-hook",
    description: "Set a before send hook for a token (admin only)",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase for signing the transaction (must be admin)"
        },
        denom: {
          type: "string",
          description: "Token denomination to set hook for"
        },
        contractAddr: {
          type: "string",
          description: "Contract address for the hook"
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
      required: ["mnemonic", "denom", "contractAddr"]
    }
  }
];