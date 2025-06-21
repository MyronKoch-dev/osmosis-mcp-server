// Pool-related tools for Osmosis MCP server
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const poolTools: Tool[] = [
  {
    name: "get-pool-info",
    description: "Returns information about a specific liquidity pool",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        }
      },
      required: ["poolId"]
    }
  },
  {
    name: "get-all-pools",
    description: "Returns information about all liquidity pools",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "string",
          description: "Optional: maximum number of pools to return (default 10)"
        }
      },
      required: []
    }
  },
  {
    name: "get-pool-spot-price",
    description: "Returns the current spot price between two tokens in a pool",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        },
        baseAssetDenom: {
          type: "string",
          description: "The base asset denomination"
        },
        quoteAssetDenom: {
          type: "string",
          description: "The quote asset denomination"
        }
      },
      required: ["poolId", "baseAssetDenom", "quoteAssetDenom"]
    }
  },
  {
    name: "estimate-swap",
    description: "Estimates the result of a token swap",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        },
        tokenIn: {
          type: "string",
          description: "Input token denomination"
        },
        tokenOut: {
          type: "string",
          description: "Output token denomination"
        },
        amount: {
          type: "string",
          description: "Amount to swap"
        }
      },
      required: ["poolId", "tokenIn", "tokenOut", "amount"]
    }
  },
  {
    name: "get-incentivized-pools",
    description: "Returns pools that have active incentives",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "get-pool-incentives",
    description: "Returns incentive information for a specific pool",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The pool ID"
        }
      },
      required: ["poolId"]
    }
  },
  {
    name: "get-pool-type",
    description: "Returns the type of a pool (balancer, stableswap, concentrated-liquidity)",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        }
      },
      required: ["poolId"]
    }
  },
  {
    name: "get-historical-prices",
    description: "Returns historical price data for a token pair",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        },
        baseAssetDenom: {
          type: "string",
          description: "The base asset denomination"
        },
        quoteAssetDenom: {
          type: "string",
          description: "The quote asset denomination"
        },
        startTime: {
          type: "string",
          description: "Start time for historical data (ISO 8601 format)"
        },
        endTime: {
          type: "string",
          description: "End time for historical data (ISO 8601 format)"
        },
        resolution: {
          type: "string",
          description: "Data resolution (1m, 5m, 15m, 1h, 4h, 1d)",
          enum: ["1m", "5m", "15m", "1h", "4h", "1d"]
        }
      },
      required: ["poolId", "baseAssetDenom", "quoteAssetDenom"]
    }
  },
  {
    name: "prepare-swap-transaction",
    description: "Prepares an unsigned transaction for token swap",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        },
        sender: {
          type: "string",
          description: "The sender's Osmosis address"
        },
        tokenIn: {
          type: "object",
          properties: {
            denom: {
              type: "string",
              description: "Input token denomination"
            },
            amount: {
              type: "string",
              description: "Amount to swap"
            }
          },
          required: ["denom", "amount"]
        },
        tokenOutMinAmount: {
          type: "string",
          description: "Minimum amount of output token to receive"
        },
        slippageTolerance: {
          type: "number",
          description: "Slippage tolerance percentage (e.g., 0.01 for 1%)"
        }
      },
      required: ["poolId", "sender", "tokenIn", "tokenOutMinAmount"]
    }
  },
  {
    name: "get-pool-total-shares",
    description: "Returns the total number of LP shares for a pool",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        }
      },
      required: ["poolId"]
    }
  },
  {
    name: "get-pool-liquidity",
    description: "Returns detailed liquidity information for a pool",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        }
      },
      required: ["poolId"]
    }
  },
  {
    name: "get-pool-swap-fee",
    description: "Returns the swap fee percentage for a pool",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        }
      },
      required: ["poolId"]
    }
  },
  {
    name: "get-pool-exit-fee",
    description: "Returns the exit fee percentage for a pool",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        }
      },
      required: ["poolId"]
    }
  },
  {
    name: "get-pool-join-exit-records",
    description: "Returns historical join and exit records for a pool",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        },
        address: {
          type: "string",
          description: "Optional: filter by specific address"
        },
        limit: {
          type: "number",
          description: "Maximum number of records to return (default: 50)",
          minimum: 1,
          maximum: 100
        }
      },
      required: ["poolId"]
    }
  },
  {
    name: "get-pool-total-value-locked",
    description: "Returns the total value locked (TVL) for a pool in USD",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        }
      },
      required: ["poolId"]
    }
  },
  {
    name: "prepare-join-pool",
    description: "Prepares an unsigned transaction to join a pool",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        },
        sender: {
          type: "string",
          description: "The sender's Osmosis address"
        },
        tokensIn: {
          type: "array",
          description: "Array of tokens to provide",
          items: {
            type: "object",
            properties: {
              denom: {
                type: "string",
                description: "Token denomination"
              },
              amount: {
                type: "string",
                description: "Amount to provide"
              }
            },
            required: ["denom", "amount"]
          }
        },
        shareOutMinAmount: {
          type: "string",
          description: "Minimum LP shares to receive"
        }
      },
      required: ["poolId", "sender", "tokensIn", "shareOutMinAmount"]
    }
  },
  {
    name: "prepare-exit-pool",
    description: "Prepares an unsigned transaction to exit a pool",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        },
        sender: {
          type: "string",
          description: "The sender's Osmosis address"
        },
        shareInAmount: {
          type: "string",
          description: "Amount of LP shares to redeem"
        },
        tokenOutMins: {
          type: "array",
          description: "Minimum amounts of each token to receive",
          items: {
            type: "object",
            properties: {
              denom: {
                type: "string",
                description: "Token denomination"
              },
              amount: {
                type: "string",
                description: "Minimum amount to receive"
              }
            },
            required: ["denom", "amount"]
          }
        }
      },
      required: ["poolId", "sender", "shareInAmount", "tokenOutMins"]
    }
  },
  {
    name: "get-pool-apr",
    description: "Returns the annual percentage rate (APR) for a pool",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        }
      },
      required: ["poolId"]
    }
  }
];