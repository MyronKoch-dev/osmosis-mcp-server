#!/usr/bin/env node
// Working Osmosis MCP server using correct SDK API
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
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
const server = new Server(
  {
    name: "osmosis-blockchain-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get-blockchain-status",
        description: "Returns the current status of the Osmosis blockchain",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
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
        name: "get-epochs",
        description: "Returns information about all epochs",
        inputSchema: {
          type: "object", 
          properties: {},
          required: []
        }
      },
      {
        name: "get-proposals",
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
        name: "get-account-balance",
        description: "Returns token balances for an Osmosis address",
        inputSchema: {
          type: "object",
          properties: {
            address: {
              type: "string",
              description: "The Osmosis address to query balances for"
            }
          },
          required: ["address"]
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
        name: "get-proposal-details",
        description: "Returns detailed information about a specific governance proposal",
        inputSchema: {
          type: "object",
          properties: {
            proposalId: {
              type: "string",
              description: "The proposal ID"
            }
          },
          required: ["proposalId"]
        }
      },
      {
        name: "get-lockups",
        description: "Returns token lockup information for an address",
        inputSchema: {
          type: "object",
          properties: {
            owner: {
              type: "string",
              description: "The owner address"
            }
          },
          required: ["owner"]
        }
      },
      {
        name: "get-superfluid-assets",
        description: "Returns available superfluid staking assets",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "get-ibc-denom-trace",
        description: "Returns the source information for an IBC token",
        inputSchema: {
          type: "object",
          properties: {
            hash: {
              type: "string",
              description: "The IBC token hash"
            }
          },
          required: ["hash"]
        }
      },
      {
        name: "get-cl-pools",
        description: "Returns all Concentrated Liquidity pools",
        inputSchema: {
          type: "object",
          properties: {
            limit: {
              type: "string",
              description: "Optional: maximum number of CL pools to return (default 10)"
            }
          },
          required: []
        }
      },
      {
        name: "get-cl-positions",
        description: "Returns Concentrated Liquidity positions for an address",
        inputSchema: {
          type: "object",
          properties: {
            address: {
              type: "string",
              description: "The address to query CL positions for"
            }
          },
          required: ["address"]
        }
      },
      {
        name: "get-cl-position",
        description: "Returns details of a specific Concentrated Liquidity position",
        inputSchema: {
          type: "object",
          properties: {
            positionId: {
              type: "string",
              description: "The position ID"
            }
          },
          required: ["positionId"]
        }
      },
      {
        name: "get-twap",
        description: "Returns Time-Weighted Average Price for a pool",
        inputSchema: {
          type: "object",
          properties: {
            poolId: {
              type: "string",
              description: "The pool ID"
            },
            baseAsset: {
              type: "string",
              description: "Base asset denomination"
            },
            quoteAsset: {
              type: "string",
              description: "Quote asset denomination"
            },
            startTime: {
              type: "string",
              description: "Start time (RFC3339 format)"
            },
            endTime: {
              type: "string",
              description: "Optional: End time (RFC3339 format, defaults to now)"
            }
          },
          required: ["poolId", "baseAsset", "quoteAsset", "startTime"]
        }
      },
      {
        name: "get-proposal-votes",
        description: "Returns votes for a specific governance proposal",
        inputSchema: {
          type: "object",
          properties: {
            proposalId: {
              type: "string",
              description: "The proposal ID"
            },
            limit: {
              type: "string",
              description: "Optional: maximum number of votes to return (default 10)"
            }
          },
          required: ["proposalId"]
        }
      },
      {
        name: "get-proposal-tally",
        description: "Returns the vote tally for a governance proposal",
        inputSchema: {
          type: "object",
          properties: {
            proposalId: {
              type: "string",
              description: "The proposal ID"
            }
          },
          required: ["proposalId"]
        }
      },
      {
        name: "get-denoms-by-creator",
        description: "Returns all token factory denoms created by an address",
        inputSchema: {
          type: "object",
          properties: {
            creator: {
              type: "string",
              description: "The creator address"
            }
          },
          required: ["creator"]
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
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "get-blockchain-status": {
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

    case "get-pool-info": {
      try {
        const poolId = String(args?.poolId);
        if (!poolId) {
          throw new Error("poolId is required");
        }
        
        const poolInfo = await callOsmosisApi(`/osmosis/gamm/v1beta1/pools/${poolId}`);
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

    case "get-validators": {
      try {
        const params = {};
        if (args?.status) {
          params.status = String(args.status);
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

    case "get-epochs": {
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

    case "get-proposals": {
      try {
        const params = {};
        if (args?.status) {
          params.proposal_status = String(args.status);
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

    case "get-all-pools": {
      try {
        const params = {};
        if (args?.limit) {
          params['pagination.limit'] = String(args.limit);
        } else {
          params['pagination.limit'] = '10';
        }
        
        const pools = await callOsmosisApi("/osmosis/gamm/v1beta1/pools", params);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(pools, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching pools: ${error}`
          }]
        };
      }
    }

    case "get-account-balance": {
      try {
        const address = String(args?.address);
        if (!address) {
          throw new Error("address is required");
        }
        
        const balances = await callOsmosisApi(`/cosmos/bank/v1beta1/balances/${address}`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(balances, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching account balance: ${error}`
          }]
        };
      }
    }

    case "get-pool-spot-price": {
      try {
        const poolId = String(args?.poolId);
        const baseAssetDenom = String(args?.baseAssetDenom);
        const quoteAssetDenom = String(args?.quoteAssetDenom);
        
        if (!poolId || !baseAssetDenom || !quoteAssetDenom) {
          throw new Error("poolId, baseAssetDenom, and quoteAssetDenom are required");
        }
        
        const spotPrice = await callOsmosisApi(`/osmosis/gamm/v1beta1/pools/${poolId}/prices`, {
          base_asset_denom: baseAssetDenom,
          quote_asset_denom: quoteAssetDenom
        });
        return {
          content: [{
            type: "text",
            text: JSON.stringify(spotPrice, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching spot price: ${error}`
          }]
        };
      }
    }

    case "estimate-swap": {
      try {
        const poolId = String(args?.poolId);
        const tokenIn = String(args?.tokenIn);
        const tokenOut = String(args?.tokenOut);
        const amount = String(args?.amount);
        
        if (!poolId || !tokenIn || !tokenOut || !amount) {
          throw new Error("poolId, tokenIn, tokenOut, and amount are required");
        }
        
        const estimation = await callOsmosisApi(`/osmosis/gamm/v1beta1/pools/${poolId}/estimate/swap_exact_amount_in`, {
          token_in: `${amount}${tokenIn}`,
          token_out_denom: tokenOut
        });
        return {
          content: [{
            type: "text",
            text: JSON.stringify(estimation, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error estimating swap: ${error}`
          }]
        };
      }
    }

    case "get-delegations": {
      try {
        const delegatorAddress = String(args?.delegatorAddress);
        if (!delegatorAddress) {
          throw new Error("delegatorAddress is required");
        }
        
        const delegations = await callOsmosisApi(`/cosmos/staking/v1beta1/delegations/${delegatorAddress}`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(delegations, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching delegations: ${error}`
          }]
        };
      }
    }

    case "get-staking-rewards": {
      try {
        const delegatorAddress = String(args?.delegatorAddress);
        if (!delegatorAddress) {
          throw new Error("delegatorAddress is required");
        }
        
        const rewards = await callOsmosisApi(`/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(rewards, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching staking rewards: ${error}`
          }]
        };
      }
    }

    case "get-proposal-details": {
      try {
        const proposalId = String(args?.proposalId);
        if (!proposalId) {
          throw new Error("proposalId is required");
        }
        
        const proposal = await callOsmosisApi(`/cosmos/gov/v1beta1/proposals/${proposalId}`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(proposal, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching proposal details: ${error}`
          }]
        };
      }
    }

    case "get-lockups": {
      try {
        const owner = String(args?.owner);
        if (!owner) {
          throw new Error("owner is required");
        }
        
        const lockups = await callOsmosisApi(`/osmosis/lockup/v1beta1/account_locked_coins/${owner}`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(lockups, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching lockups: ${error}`
          }]
        };
      }
    }

    case "get-superfluid-assets": {
      try {
        const assets = await callOsmosisApi("/osmosis/superfluid/v1beta1/all_assets");
        return {
          content: [{
            type: "text",
            text: JSON.stringify(assets, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching superfluid assets: ${error}`
          }]
        };
      }
    }

    case "get-ibc-denom-trace": {
      try {
        const hash = String(args?.hash);
        if (!hash) {
          throw new Error("hash is required");
        }
        
        const trace = await callOsmosisApi(`/ibc/apps/transfer/v1/denom_traces/${hash}`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(trace, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching IBC denom trace: ${error}`
          }]
        };
      }
    }

    case "get-cl-pools": {
      try {
        const params = {};
        if (args?.limit) {
          params['pagination.limit'] = String(args.limit);
        } else {
          params['pagination.limit'] = '10';
        }
        
        const clPools = await callOsmosisApi("/osmosis/concentratedliquidity/v1beta1/pools", params);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(clPools, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching CL pools: ${error}`
          }]
        };
      }
    }

    case "get-cl-positions": {
      try {
        const address = String(args?.address);
        if (!address) {
          throw new Error("address is required");
        }
        
        const positions = await callOsmosisApi(`/osmosis/concentratedliquidity/v1beta1/user_positions`, {
          address: address
        });
        return {
          content: [{
            type: "text",
            text: JSON.stringify(positions, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching CL positions: ${error}`
          }]
        };
      }
    }

    case "get-cl-position": {
      try {
        const positionId = String(args?.positionId);
        if (!positionId) {
          throw new Error("positionId is required");
        }
        
        const position = await callOsmosisApi(`/osmosis/concentratedliquidity/v1beta1/position_by_id`, {
          position_id: positionId
        });
        return {
          content: [{
            type: "text",
            text: JSON.stringify(position, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching CL position: ${error}`
          }]
        };
      }
    }

    case "get-twap": {
      try {
        const poolId = String(args?.poolId);
        const baseAsset = String(args?.baseAsset);
        const quoteAsset = String(args?.quoteAsset);
        const startTime = String(args?.startTime);
        
        if (!poolId || !baseAsset || !quoteAsset || !startTime) {
          throw new Error("poolId, baseAsset, quoteAsset, and startTime are required");
        }
        
        const params = {
          pool_id: poolId,
          base_asset: baseAsset,
          quote_asset: quoteAsset,
          start_time: startTime
        };
        
        if (args?.endTime) {
          params.end_time = String(args.endTime);
        }
        
        const twap = await callOsmosisApi("/osmosis/twap/v1beta1/ArithmeticTwap", params);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(twap, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching TWAP: ${error}`
          }]
        };
      }
    }

    case "get-proposal-votes": {
      try {
        const proposalId = String(args?.proposalId);
        if (!proposalId) {
          throw new Error("proposalId is required");
        }
        
        const params = {};
        if (args?.limit) {
          params['pagination.limit'] = String(args.limit);
        } else {
          params['pagination.limit'] = '10';
        }
        
        const votes = await callOsmosisApi(`/cosmos/gov/v1beta1/proposals/${proposalId}/votes`, params);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(votes, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching proposal votes: ${error}`
          }]
        };
      }
    }

    case "get-proposal-tally": {
      try {
        const proposalId = String(args?.proposalId);
        if (!proposalId) {
          throw new Error("proposalId is required");
        }
        
        const tally = await callOsmosisApi(`/cosmos/gov/v1beta1/proposals/${proposalId}/tally`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(tally, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching proposal tally: ${error}`
          }]
        };
      }
    }

    case "get-denoms-by-creator": {
      try {
        const creator = String(args?.creator);
        if (!creator) {
          throw new Error("creator is required");
        }
        
        const denoms = await callOsmosisApi(`/osmosis/tokenfactory/v1beta1/denoms_from_creator/${creator}`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(denoms, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching denoms by creator: ${error}`
          }]
        };
      }
    }

    case "get-incentivized-pools": {
      try {
        const incentives = await callOsmosisApi("/osmosis/pool-incentives/v1beta1/incentivized_pools");
        return {
          content: [{
            type: "text",
            text: JSON.stringify(incentives, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching incentivized pools: ${error}`
          }]
        };
      }
    }

    case "get-pool-incentives": {
      try {
        const poolId = String(args?.poolId);
        if (!poolId) {
          throw new Error("poolId is required");
        }
        
        const incentives = await callOsmosisApi(`/osmosis/pool-incentives/v1beta1/pool_incentives/${poolId}`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(incentives, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching pool incentives: ${error}`
          }]
        };
      }
    }

    case "get-unbonding-delegations": {
      try {
        const delegatorAddress = String(args?.delegatorAddress);
        if (!delegatorAddress) {
          throw new Error("delegatorAddress is required");
        }
        
        const unbonding = await callOsmosisApi(`/cosmos/staking/v1beta1/delegators/${delegatorAddress}/unbonding_delegations`);
        return {
          content: [{
            type: "text",
            text: JSON.stringify(unbonding, null, 2)
          }]
        };
      } catch (error) {
        return {
          content: [{
            type: "text",
            text: `Error fetching unbonding delegations: ${error}`
          }]
        };
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Osmosis MCP Server started successfully");
  } catch (error) {
    console.error("Failed to start Osmosis MCP Server:", error);
    process.exit(1);
  }
}

main();