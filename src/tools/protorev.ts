// ProtoRev/MEV tools for Osmosis MCP server
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const protorevTools: Tool[] = [
  {
    name: "get-protorev-profits-by-denom",
    description: "Returns ProtoRev MEV profits aggregated by denomination",
    inputSchema: {
      type: "object",
      properties: {
        denom: {
          type: "string",
          description: "Optional: filter by specific denomination"
        },
        limit: {
          type: "number",
          description: "Maximum number of results to return (default: 50)",
          minimum: 1,
          maximum: 200
        }
      },
      required: []
    }
  },
  {
    name: "get-protorev-profits-by-tx",
    description: "Returns ProtoRev MEV profits by transaction",
    inputSchema: {
      type: "object",
      properties: {
        txHash: {
          type: "string",
          description: "The transaction hash to query"
        }
      },
      required: ["txHash"]
    }
  },
  {
    name: "get-protorev-statistics",
    description: "Returns overall ProtoRev MEV statistics",
    inputSchema: {
      type: "object",
      properties: {
        startDate: {
          type: "string",
          description: "Start date for statistics (ISO 8601 format)"
        },
        endDate: {
          type: "string",
          description: "End date for statistics (ISO 8601 format)"
        }
      },
      required: []
    }
  },
  {
    name: "get-protorev-number-of-trades",
    description: "Returns the total number of ProtoRev trades executed",
    inputSchema: {
      type: "object",
      properties: {
        denom: {
          type: "string",
          description: "Optional: filter by specific denomination"
        }
      },
      required: []
    }
  },
  {
    name: "get-protorev-enabled",
    description: "Returns whether ProtoRev is currently enabled",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "get-protorev-developer-account",
    description: "Returns the developer account receiving ProtoRev profits",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "get-protorev-max-pool-points",
    description: "Returns the maximum pool points per transaction for ProtoRev",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "get-protorev-pool-weights",
    description: "Returns the pool weight configuration for ProtoRev",
    inputSchema: {
      type: "object",
      properties: {
        poolType: {
          type: "string",
          description: "Optional: filter by pool type (balancer, stableswap, concentrated)",
          enum: ["balancer", "stableswap", "concentrated"]
        }
      },
      required: []
    }
  }
];