# Testing the Osmosis MCP Server

This guide shows you multiple ways to test your Osmosis MCP server to ensure all the tools are working correctly.

## Prerequisites

Make sure you have installed dependencies:
```bash
npm install
```

## Testing Methods

### 1. Quick API Tests

Test the underlying Osmosis API connectivity:
```bash
npm run test
```

This runs `test-server.js` which tests:
- ✅ Blockchain status from RPC
- ✅ Pool information 
- ✅ Validator data
- ✅ Governance proposals
- ✅ Epochs information
- ❌ Account balance (requires valid address)

### 2. MCP Inspector (Recommended)

The MCP Inspector provides a web interface to test your server interactively:

```bash
npm run inspect
```

This will:
1. Start the MCP server
2. Launch a proxy server
3. Provide a web URL with authentication token

**Open the provided URL in your browser** to access the inspector.

#### Using the Inspector:

1. **List Tools**: Click "Refresh" to see all 105 available tools
2. **Test Individual Tools**: 
   - Click on any tool (e.g., "get-blockchain-status")
   - Fill in required parameters if any
   - Click "Call Tool" to see results

#### Example Tests in Inspector:

**Get Blockchain Status:**
- Tool: `get-blockchain-status`
- Parameters: None
- Expected: Current chain info, block height, sync status

**Get Pool Info:**
- Tool: `get-pool-info` 
- Parameters: `{"poolId": "1"}`
- Expected: OSMO/ATOM pool details

**Get Validators:**
- Tool: `get-validators`
- Parameters: `{"status": "BOND_STATUS_BONDED"}`
- Expected: List of active validators

**Get Proposals:**
- Tool: `get-proposals`
- Parameters: `{"status": "PROPOSAL_STATUS_VOTING_PERIOD"}`
- Expected: Active governance proposals

**Get Epochs:**
- Tool: `get-epochs`
- Parameters: None
- Expected: Day and week epoch information

### 3. Command Line Testing

You can also test the server directly from command line using the MCP protocol:

```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | node simple-server.js
```

### 4. Manual Testing with curl

Test specific endpoints directly:

```bash
# Get blockchain status
curl -X POST https://rpc.osmosis.zone \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"status","params":[]}'

# Get pool info
curl "https://lcd.osmosis.zone/osmosis/gamm/v1beta1/pools/1"

# Get validators
curl "https://lcd.osmosis.zone/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=5"
```

## Available Tools

Your server now includes **105 tools** covering:

### Core Blockchain (Tools 1-9):
- `get-blockchain-status` - Chain status and sync info
- `get-transaction` - Transaction details by hash
- `get-latest-blocks` - Recent block information
- `get-account-balance` - Account token balances
- `get-token-info` - Token metadata
- `get-supply` - Token supply information
- `get-chain-params` - Chain parameters
- `get-module-accounts` - Module account information
- `get-auth-params` - Authentication parameters

### Liquidity Pools (Tools 10-27):
- `get-pool-info` - Specific pool details
- `get-all-pools` - List all pools
- `get-pool-spot-price` - Current price between tokens
- `get-pool-type` - Pool type (balancer, stableswap, etc.)
- `get-incentivized-pools` - Pools with rewards
- `estimate-swap` - Estimate swap results
- `get-twap` - Time-weighted average prices
- `get-historical-prices` - Historical price data
- `prepare-swap-transaction` - Unsigned swap transactions
- Plus 9 more pool management tools...

### Concentrated Liquidity (Tools 28-42):
- `get-cl-pools` - Concentrated liquidity pools
- `get-cl-position` - Specific CL position details
- `get-cl-positions-by-pool` - All positions in a pool
- `get-cl-user-positions` - User's CL positions
- `price-to-tick` - Convert price to tick
- `tick-to-price` - Convert tick to price
- `get-cl-pool-incentives` - CL pool incentives
- Plus 8 more CL tools...

### CosmWasm/Smart Contracts (Tools 43-62):
- `get-wasm-codes` - All uploaded WASM codes
- `get-wasm-code-info` - Specific code information
- `get-contracts-by-code` - Contracts using specific code
- `get-contract-info` - Contract metadata
- `query-contract-state` - Query contract state
- `get-contract-history` - Contract upgrade history
- `prepare-instantiate-contract` - Prepare contract instantiation
- Plus 13 more CosmWasm tools...

### Token Factory (Tools 63-72):
- `get-token-factory-denoms` - All factory tokens
- `get-token-factory-denom-info` - Token metadata
- `get-token-factory-creator` - Token creator info
- `prepare-create-token-factory-denom` - Create new token
- `prepare-mint-token-factory-tokens` - Mint tokens
- `prepare-burn-token-factory-tokens` - Burn tokens
- Plus 4 more token factory tools...

### ProtoRev/MEV (Tools 73-80):
- `get-protorev-profits-by-denom` - MEV profits by token
- `get-protorev-profits-by-tx` - MEV profits by transaction
- `get-protorev-statistics` - Overall MEV statistics
- `get-protorev-number-of-trades` - Trade count statistics
- Plus 4 more ProtoRev tools...

### Staking & Governance (Tools 81-95):
- `get-validators` - Validator information
- `get-delegations` - Delegation details
- `get-unbonding-delegations` - Unbonding delegations
- `get-staking-rewards` - Pending staking rewards
- `get-proposals` - Governance proposals
- `get-proposal-details` - Detailed proposal info
- `get-proposal-votes` - Proposal voting details
- `get-validator-delegations` - Validator's delegations
- Plus 7 more staking/governance tools...

### Specialized Modules (Tools 96-105):
- `get-downtime-detector-params` - Downtime detection settings
- `get-downtime-status` - Current downtime status
- `get-validator-set-preference` - User validator preferences
- `get-ibc-rate-limits` - IBC rate limiting info
- `get-mint-params` - Token minting parameters
- `get-epoch-provisions` - Current epoch provisions
- `get-all-locks-by-type` - Lock information by type
- `get-synthetic-locks-by-lock-id` - Synthetic lock details
- Plus 2 more specialized tools...

## Troubleshooting

### Common Issues:

1. **Inspector not loading**: Make sure to use the full URL with auth token
2. **API errors**: Some tools require specific valid addresses/IDs
3. **Timeout errors**: Osmosis endpoints may be slow during high traffic

### Successful Test Indicators:

- ✅ Inspector shows 105 tools
- ✅ `get-blockchain-status` returns current block height
- ✅ `get-pool-info` with poolId "1" returns OSMO/ATOM pool data
- ✅ `get-validators` returns active validator list
- ✅ `get-epochs` returns day/week epoch data

## Integration with AI Assistants

Once tested, your MCP server can be used by AI assistants to:

1. **Query real-time blockchain data**
2. **Analyze DeFi pools and trading opportunities** 
3. **Monitor governance proposals**
4. **Track staking and validator performance**
5. **Provide cross-chain asset information**

The server provides read-only access to comprehensive Osmosis data without requiring private keys or signatures.

## Next Steps

After successful testing:
1. Deploy to production environment
2. Configure AI assistant to use your MCP server
3. Monitor performance and add error handling
4. Consider adding caching for frequently accessed data

Your Osmosis MCP server is now ready for production use! 🚀