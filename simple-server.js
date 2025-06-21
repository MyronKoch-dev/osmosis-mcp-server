// Simple working MCP server for testing
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";

// Osmosis endpoints
const DEFAULT_RPC_ENDPOINT = "https://rpc.osmosis.zone";
const DEFAULT_REST_ENDPOINT = "https://lcd.osmosis.zone";

// Utility functions
async function callOsmosisApi(path, params = {}) {
  try {
    const url = `${DEFAULT_REST_ENDPOINT}${path}`;
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error calling Osmosis API: ${error}`);
    throw error;
  }
}

async function callOsmosisRpc(method, params = []) {
  try {
    const response = await axios.post(DEFAULT_RPC_ENDPOINT, {
      jsonrpc: "2.0",
      id: 1,
      method,
      params
    });
    return response.data.result;
  } catch (error) {
    console.error(`Error calling Osmosis RPC: ${error}`);
    throw error;
  }
}

// Create server
const server = new Server({
  name: "osmosis-blockchain-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {}
  }
});

// Tool handlers
const tools = {
  'get-blockchain-status': {
    description: "Returns the current status of the Osmosis blockchain",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    },
    handler: async () => {
      try {
        const status = await callOsmosisRpc("status");
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              chainId: status.node_info.network,
              latestBlockHeight: status.sync_info.latest_block_height,
              latestBlockTime: status.sync_info.latest_block_time,
              catchingUp: status.sync_info.catching_up
            }, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text", 
            text: `Error fetching blockchain status: ${error}`
          }]
        };
      }
    }
  },

  'get-pool-info': {
    description: "Returns information about a specific liquidity pool on Osmosis",
    inputSchema: {
      type: "object",
      properties: {
        poolId: {
          type: "string",
          description: "The ID of the liquidity pool"
        }
      },
      required: ["poolId"]
    },
    handler: async (args) => {
      try {
        const poolInfo = await callOsmosisApi(`/osmosis/gamm/v1beta1/pools/${args.poolId}`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(poolInfo, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching pool information: ${error}`
          }]
        };
      }
    }
  },

  'get-validators': {
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
    },
    handler: async (args) => {
      try {
        const params = {};
        if (args.status) {
          params.status = args.status;
        }
        
        const validators = await callOsmosisApi("/cosmos/staking/v1beta1/validators", params);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(validators, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching validators: ${error}`
          }]
        };
      }
    }
  },

  'get-proposals': {
    description: "Returns governance proposals on Osmosis",
    inputSchema: {
      type: "object", 
      properties: {
        status: {
          type: "string",
          description: "Optional: proposal status filter"
        }
      },
      required: []
    },
    handler: async (args) => {
      try {
        const params = {};
        if (args.status) {
          params.proposal_status = args.status;
        }
        
        const proposals = await callOsmosisApi("/cosmos/gov/v1beta1/proposals", params);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(proposals, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching proposals: ${error}`
          }]
        };
      }
    }
  },

  'get-epochs': {
    description: "Returns information about all epochs",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    },
    handler: async () => {
      try {
        const epochs = await callOsmosisApi("/osmosis/epochs/v1beta1/epochs");
        return {
          content: [{
            type: "text",
            text: JSON.stringify(epochs, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching epochs: ${error}`
          }]
        };
      }
    }
  }
};

// Register request handlers
server.setRequestHandler('tools/list', async () => {
  return {
    tools: Object.entries(tools).map(([name, tool]) => ({
      name,
      description: tool.description,
      inputSchema: tool.inputSchema
    }))
  };
});

server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  
  if (!tools[name]) {
    throw new Error(`Tool ${name} not found`);
  }
  
  return await tools[name].handler(args || {});
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Osmosis MCP Server started successfully");
}

main().catch(console.error);