#!/usr/bin/env node
// Working Osmosis MCP server with older SDK API
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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
    console.error(`Error calling Osmosis API: ${error}`)
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
const server = new McpServer({
  name: "osmosis-blockchain-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {}
  }
});

// Register tools
server.tool("get-blockchain-status", "Returns the current status of the Osmosis blockchain", {
  type: "object",
  properties: {},
  required: []
}, async () => {
  try {
    const status = await callOsmosisRpc("status");
    return [{
      type: "text",
      text: JSON.stringify({
        chainId: status.node_info.network,
        latestBlockHeight: status.sync_info.latest_block_height,
        latestBlockTime: status.sync_info.latest_block_time,
        catchingUp: status.sync_info.catching_up
      }, null, 2)
    }];
  } catch (error) {
    return [{
      type: "text",
      text: `Error fetching blockchain status: ${error}`
    }];
  }
});

server.tool("get-pool-info", "Returns information about a specific liquidity pool", {
  type: "object",
  properties: {
    poolId: {
      type: "string",
      description: "The ID of the liquidity pool"
    }
  },
  required: ["poolId"]
}, async (args) => {
  try {
    const poolInfo = await callOsmosisApi(`/osmosis/gamm/v1beta1/pools/${args.poolId}`);
    return [{
      type: "text",
      text: JSON.stringify(poolInfo, null, 2)
    }];
  } catch (error) {
    return [{
      type: "text",
      text: `Error fetching pool information: ${error}`
    }];
  }
});

server.tool("get-validators", "Returns information about validators on Osmosis", {
  type: "object",
  properties: {
    status: {
      type: "string",
      description: "Optional: validator status filter"
    }
  },
  required: []
}, async (args) => {
  try {
    const params = {};
    if (args.status) {
      params.status = args.status;
    }
    
    const validators = await callOsmosisApi("/cosmos/staking/v1beta1/validators", params);
    return [{
      type: "text",
      text: JSON.stringify(validators, null, 2)
    }];
  } catch (error) {
    return [{
      type: "text",
      text: `Error fetching validators: ${error}`
    }];
  }
});

server.tool("get-proposals", "Returns governance proposals on Osmosis", {
  type: "object", 
  properties: {
    status: {
      type: "string",
      description: "Optional: proposal status filter"
    }
  },
  required: []
}, async (args) => {
  try {
    const params = {};
    if (args.status) {
      params.proposal_status = args.status;
    }
    
    const proposals = await callOsmosisApi("/cosmos/gov/v1beta1/proposals", params);
    return [{
      type: "text",
      text: JSON.stringify(proposals, null, 2)
    }];
  } catch (error) {
    return [{
      type: "text",
      text: `Error fetching proposals: ${error}`
    }];
  }
});

server.tool("get-epochs", "Returns information about all epochs", {
  type: "object",
  properties: {},
  required: []
}, async () => {
  try {
    const epochs = await callOsmosisApi("/osmosis/epochs/v1beta1/epochs");
    return [{
      type: "text",
      text: JSON.stringify(epochs, null, 2)
    }];
  } catch (error) {
    return [{
      type: "text",
      text: `Error fetching epochs: ${error}`
    }];
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Osmosis MCP Server started successfully");
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});