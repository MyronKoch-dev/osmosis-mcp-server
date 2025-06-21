// Staking and governance tools for Osmosis MCP server
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const stakingTools: Tool[] = [
  {
    name: "get-validators",
    description: "Returns information about validators on Osmosis",
    inputSchema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          description: "Optional: validator status filter (BOND_STATUS_BONDED, BOND_STATUS_UNBONDING, BOND_STATUS_UNBONDED)"
        }
      },
      required: []
    }
  },
  {
    name: "get-delegations",
    description: "Returns delegation information for an address",
    inputSchema: {
      type: "object",
      properties: {
        delegatorAddress: {
          type: "string",
          description: "The delegator address"
        }
      },
      required: ["delegatorAddress"]
    }
  },
  {
    name: "get-staking-rewards",
    description: "Returns pending staking rewards for an address",
    inputSchema: {
      type: "object",
      properties: {
        delegatorAddress: {
          type: "string",
          description: "The delegator address"
        }
      },
      required: ["delegatorAddress"]
    }
  },
  {
    name: "get-unbonding-delegations",
    description: "Returns unbonding delegations for an address",
    inputSchema: {
      type: "object",
      properties: {
        delegatorAddress: {
          type: "string",
          description: "The delegator address"
        }
      },
      required: ["delegatorAddress"]
    }
  },
  {
    name: "get-validator-delegations",
    description: "Returns all delegations to a specific validator",
    inputSchema: {
      type: "object",
      properties: {
        validatorAddress: {
          type: "string",
          description: "The validator address"
        },
        limit: {
          type: "number",
          description: "Maximum number of delegations to return (default: 50)",
          minimum: 1,
          maximum: 200
        }
      },
      required: ["validatorAddress"]
    }
  },
  {
    name: "get-validator-unbonding-delegations",
    description: "Returns all unbonding delegations from a validator",
    inputSchema: {
      type: "object",
      properties: {
        validatorAddress: {
          type: "string",
          description: "The validator address"
        },
        limit: {
          type: "number",
          description: "Maximum number of unbonding delegations to return (default: 50)",
          minimum: 1,
          maximum: 200
        }
      },
      required: ["validatorAddress"]
    }
  },
  {
    name: "get-validator-commission",
    description: "Returns commission rates and earnings for a validator",
    inputSchema: {
      type: "object",
      properties: {
        validatorAddress: {
          type: "string",
          description: "The validator address"
        }
      },
      required: ["validatorAddress"]
    }
  },
  {
    name: "get-validator-self-delegation",
    description: "Returns the self-delegation amount for a validator",
    inputSchema: {
      type: "object",
      properties: {
        validatorAddress: {
          type: "string",
          description: "The validator address"
        }
      },
      required: ["validatorAddress"]
    }
  },
  {
    name: "prepare-delegate",
    description: "Prepares a transaction to delegate tokens to a validator",
    inputSchema: {
      type: "object",
      properties: {
        delegatorAddress: {
          type: "string",
          description: "The delegator's address"
        },
        validatorAddress: {
          type: "string",
          description: "The validator address to delegate to"
        },
        amount: {
          type: "string",
          description: "Amount of uosmo to delegate"
        }
      },
      required: ["delegatorAddress", "validatorAddress", "amount"]
    }
  },
  {
    name: "prepare-undelegate",
    description: "Prepares a transaction to undelegate tokens from a validator",
    inputSchema: {
      type: "object",
      properties: {
        delegatorAddress: {
          type: "string",
          description: "The delegator's address"
        },
        validatorAddress: {
          type: "string",
          description: "The validator address to undelegate from"
        },
        amount: {
          type: "string",
          description: "Amount of uosmo to undelegate"
        }
      },
      required: ["delegatorAddress", "validatorAddress", "amount"]
    }
  },
  {
    name: "prepare-redelegate",
    description: "Prepares a transaction to redelegate tokens between validators",
    inputSchema: {
      type: "object",
      properties: {
        delegatorAddress: {
          type: "string",
          description: "The delegator's address"
        },
        validatorSrcAddress: {
          type: "string",
          description: "The source validator address"
        },
        validatorDstAddress: {
          type: "string",
          description: "The destination validator address"
        },
        amount: {
          type: "string",
          description: "Amount of uosmo to redelegate"
        }
      },
      required: ["delegatorAddress", "validatorSrcAddress", "validatorDstAddress", "amount"]
    }
  },
  {
    name: "prepare-claim-rewards",
    description: "Prepares a transaction to claim staking rewards",
    inputSchema: {
      type: "object",
      properties: {
        delegatorAddress: {
          type: "string",
          description: "The delegator's address"
        },
        validatorAddresses: {
          type: "array",
          description: "Array of validator addresses to claim rewards from (empty for all)",
          items: {
            type: "string"
          }
        }
      },
      required: ["delegatorAddress"]
    }
  },
  {
    name: "get-staking-params",
    description: "Returns the staking module parameters",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "get-slashing-params",
    description: "Returns the slashing module parameters",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "get-distribution-params",
    description: "Returns the distribution module parameters",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  }
];