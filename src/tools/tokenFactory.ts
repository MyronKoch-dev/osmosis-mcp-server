// Token Factory tools for Osmosis MCP server
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const tokenFactoryTools: Tool[] = [
  {
    name: "get-token-factory-denoms",
    description: "Returns all token factory denominations",
    inputSchema: {
      type: "object",
      properties: {
        creator: {
          type: "string",
          description: "Optional: filter by creator address"
        },
        limit: {
          type: "number",
          description: "Maximum number of denoms to return (default: 50)",
          minimum: 1,
          maximum: 200
        }
      },
      required: []
    }
  },
  {
    name: "get-token-factory-denom-info",
    description: "Returns metadata for a token factory denomination",
    inputSchema: {
      type: "object",
      properties: {
        denom: {
          type: "string",
          description: "The token factory denomination (e.g., 'factory/{creator}/{subdenom}')"
        }
      },
      required: ["denom"]
    }
  },
  {
    name: "get-token-factory-creator",
    description: "Returns the creator address of a token factory denomination",
    inputSchema: {
      type: "object",
      properties: {
        denom: {
          type: "string",
          description: "The token factory denomination"
        }
      },
      required: ["denom"]
    }
  },
  {
    name: "prepare-create-token-factory-denom",
    description: "Prepares a transaction to create a new token factory denomination",
    inputSchema: {
      type: "object",
      properties: {
        sender: {
          type: "string",
          description: "The sender's Osmosis address (will be the creator)"
        },
        subdenom: {
          type: "string",
          description: "The subdenom to create (will become factory/{sender}/{subdenom})"
        },
        metadata: {
          type: "object",
          description: "Optional token metadata",
          properties: {
            description: {
              type: "string",
              description: "Token description"
            },
            display: {
              type: "string",
              description: "Display denomination"
            },
            base: {
              type: "string",
              description: "Base denomination"
            },
            name: {
              type: "string",
              description: "Token name"
            },
            symbol: {
              type: "string",
              description: "Token symbol"
            },
            uri: {
              type: "string",
              description: "URI for additional metadata"
            },
            uriHash: {
              type: "string",
              description: "Hash of the document at URI"
            }
          }
        }
      },
      required: ["sender", "subdenom"]
    }
  },
  {
    name: "prepare-mint-token-factory-tokens",
    description: "Prepares a transaction to mint new tokens",
    inputSchema: {
      type: "object",
      properties: {
        sender: {
          type: "string",
          description: "The sender's address (must be the token creator)"
        },
        denom: {
          type: "string",
          description: "The token factory denomination to mint"
        },
        amount: {
          type: "string",
          description: "Amount of tokens to mint"
        },
        mintTo: {
          type: "string",
          description: "Address to mint tokens to"
        }
      },
      required: ["sender", "denom", "amount", "mintTo"]
    }
  },
  {
    name: "prepare-burn-token-factory-tokens",
    description: "Prepares a transaction to burn tokens",
    inputSchema: {
      type: "object",
      properties: {
        sender: {
          type: "string",
          description: "The sender's address (must be the token creator)"
        },
        denom: {
          type: "string",
          description: "The token factory denomination to burn"
        },
        amount: {
          type: "string",
          description: "Amount of tokens to burn"
        },
        burnFrom: {
          type: "string",
          description: "Address to burn tokens from (optional, defaults to sender)"
        }
      },
      required: ["sender", "denom", "amount"]
    }
  },
  {
    name: "prepare-change-token-factory-admin",
    description: "Prepares a transaction to change the admin of a token",
    inputSchema: {
      type: "object",
      properties: {
        sender: {
          type: "string",
          description: "The current admin address"
        },
        denom: {
          type: "string",
          description: "The token factory denomination"
        },
        newAdmin: {
          type: "string",
          description: "The new admin address"
        }
      },
      required: ["sender", "denom", "newAdmin"]
    }
  },
  {
    name: "get-token-factory-params",
    description: "Returns the token factory module parameters",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "validate-token-factory-denom",
    description: "Validates if a denomination is a valid token factory denom",
    inputSchema: {
      type: "object",
      properties: {
        denom: {
          type: "string",
          description: "The denomination to validate"
        }
      },
      required: ["denom"]
    }
  },
  {
    name: "get-token-factory-total-supply",
    description: "Returns the total supply of a token factory denomination",
    inputSchema: {
      type: "object",
      properties: {
        denom: {
          type: "string",
          description: "The token factory denomination"
        }
      },
      required: ["denom"]
    }
  }
];