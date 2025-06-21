// Testnet Utility Tools - Help users get testnet tokens and resources
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const testnetTools: Tool[] = [
  {
    name: "get-testnet-tokens",
    description: "Get instructions and links to obtain Osmosis testnet tokens for testing",
    inputSchema: {
      type: "object",
      properties: {
        address: {
          type: "string",
          description: "Osmosis testnet address to fund (optional - will provide general instructions if not specified)"
        },
        amount: {
          type: "string",
          description: "Amount of tokens needed (for reference only)",
          default: "1000000"
        }
      },
      required: []
    }
  },
  {
    name: "testnet-faucet",
    description: "Get Osmosis testnet tokens from the official faucet",
    inputSchema: {
      type: "object",
      properties: {
        address: {
          type: "string",
          description: "Osmosis testnet address to receive tokens"
        },
        amount: {
          type: "string",
          description: "Amount to request (in uosmo)",
          default: "10000000"
        }
      },
      required: ["address"]
    }
  },
  {
    name: "check-testnet-status",
    description: "Check if the current network is testnet and display testnet information",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  }
];