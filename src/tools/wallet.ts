// Wallet management tools for Osmosis MCP server
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const walletTools: Tool[] = [
  {
    name: "generate-wallet",
    description: "Generates a new Osmosis wallet with mnemonic phrase",
    inputSchema: {
      type: "object",
      properties: {
        wordCount: {
          type: "number",
          description: "Number of mnemonic words (12, 15, 18, 21, or 24)",
          enum: [12, 15, 18, 21, 24],
          default: 24
        },
        prefix: {
          type: "string",
          description: "Address prefix (default: 'osmo')",
          default: "osmo"
        }
      },
      required: []
    }
  },
  {
    name: "restore-wallet-from-mnemonic",
    description: "Restores a wallet from an existing mnemonic phrase",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase (12-24 words)"
        },
        prefix: {
          type: "string",
          description: "Address prefix (default: 'osmo')",
          default: "osmo"
        },
        accountIndex: {
          type: "number",
          description: "Account index for HD derivation (default: 0)",
          default: 0
        }
      },
      required: ["mnemonic"]
    }
  },
  {
    name: "get-wallet-address",
    description: "Gets the address from a mnemonic phrase without exposing the private key",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase"
        },
        prefix: {
          type: "string",
          description: "Address prefix (default: 'osmo')",
          default: "osmo"
        },
        accountIndex: {
          type: "number",
          description: "Account index for HD derivation (default: 0)",
          default: 0
        }
      },
      required: ["mnemonic"]
    }
  },
  {
    name: "validate-mnemonic",
    description: "Validates if a mnemonic phrase is valid according to BIP-39",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase to validate"
        }
      },
      required: ["mnemonic"]
    }
  },
  {
    name: "validate-address",
    description: "Validates if an address is a valid Osmosis address",
    inputSchema: {
      type: "object",
      properties: {
        address: {
          type: "string",
          description: "Address to validate"
        },
        prefix: {
          type: "string",
          description: "Expected address prefix (default: 'osmo')",
          default: "osmo"
        }
      },
      required: ["address"]
    }
  },
  {
    name: "derive-address-from-pubkey",
    description: "Derives an address from a public key",
    inputSchema: {
      type: "object",
      properties: {
        publicKey: {
          type: "string",
          description: "Public key in hex format"
        },
        prefix: {
          type: "string",
          description: "Address prefix (default: 'osmo')",
          default: "osmo"
        }
      },
      required: ["publicKey"]
    }
  }
];