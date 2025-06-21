# Osmosis MCP Server

A comprehensive MCP (Model Context Protocol) server for interacting with the Osmosis blockchain. This server provides AI assistants with **158 tools** covering every aspect of the Osmosis ecosystem, from basic blockchain queries to advanced DeFi operations, smart contract interactions, wallet management, **direct transaction execution**, and **testnet utilities**.

## Features

### Core Blockchain Operations
- Query blockchain status, blocks, and transactions
- Get account balances and token information
- Retrieve chain parameters and module accounts
- Monitor epochs and network state

### Liquidity Pools & Trading
- Query all pool types (Balancer, Stableswap, Concentrated Liquidity)
- Get pool information, liquidity, fees, and APR
- Estimate swaps and prepare trading transactions
- Access historical price data and trading records

### Concentrated Liquidity (CL)
- Manage CL positions and liquidity ranges
- Convert between prices and ticks
- Query pool incentives and fee growth
- Prepare position creation and management transactions

### Staking & Governance
- Query validators, delegations, and rewards
- Prepare staking, unstaking, and redelegation transactions
- Access governance proposals, votes, and tallies
- Get staking parameters and commission rates

### DeFi & Advanced Features
- Time-Weighted Average Price (TWAP) calculations
- Token lockups and superfluid staking
- IBC denomination tracing
- MEV/arbitrage tracking via ProtoRev

### Smart Contracts (CosmWasm)
- Query and execute smart contracts
- Get contract information and history
- Prepare contract instantiation and migration
- Estimate gas fees for contract operations

### Token Factory
- Create custom tokens with metadata
- Mint and burn token factory denominations
- Manage token administration and parameters

### Specialized Features
- Downtime detection and validator preferences
- IBC rate limiting and fee token management

### 🚀 **NEW: Direct Transaction Execution (37 Tools)**
- **Bank Operations**: Send tokens, multi-send transactions
- **Governance**: Submit proposals, vote, deposit on proposals
- **Lockup & Incentives**: Lock tokens, claim rewards, create gauges
- **IBC Transfers**: Cross-chain token transfers
- **Superfluid Staking**: Liquid staking with LP tokens
- **Pool Operations**: Create pools, advanced swaps
- **Token Factory**: Create custom tokens, mint/burn
- **Module Administration**: Parameter updates, upgrades

### 🔐 **Wallet Management (6 Tools)**
- Generate new Osmosis wallets with BIP-39 mnemonics
- Restore wallets from seed phrases
- Validate addresses and mnemonics
- Derive addresses from public keys

### 🧪 **NEW: Testnet Utilities (3 Tools)**
- **Check Network Status**: Verify if on testnet/mainnet with safety warnings
- **Get Testnet Tokens**: Complete guide to faucets and token sources
- **Testnet Faucet**: Direct integration with Osmosis testnet faucet
- Pool incentives and superfluid parameters

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/osmosis-mcp-server.git
cd osmosis-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Running the Server

```bash
# Start the server
npm start

# Or run with the MCP inspector (for testing)
npm run inspect
```

### Configuring in Claude Desktop

1. Open Claude Desktop
2. Go to Settings
3. Navigate to the MCP section
4. Add a new server with the following configuration:
   - Name: Osmosis Blockchain Server
   - Command: path/to/osmosis-mcp-server/build/index.js

## Available Tools

The server exposes **158 tools** organized into 12 categories:

### 📊 Blockchain Tools (9 tools)
- `get-blockchain-status` - Get current blockchain status
- `get-account-balance` - Get token balances for an address
- `get-epochs` - Get epoch information
- `get-transaction` - Get transaction details by hash
- `get-latest-blocks` - Get recent block information
- `get-token-info` - Get token metadata
- `get-supply` - Get token supply information
- `get-chain-params` - Get chain parameters
- `get-module-accounts` - Get module account information

### 🏊 Pool Tools (18 tools)
- `get-pool-info` - Get pool information
- `get-all-pools` - Get all liquidity pools
- `get-pool-spot-price` - Get current spot price
- `estimate-swap` - Estimate swap results
- `get-incentivized-pools` - Get pools with incentives
- `get-pool-incentives` - Get pool incentive information
- `get-pool-type` - Get pool type (balancer/stableswap/CL)
- `get-historical-prices` - Get historical price data
- `prepare-swap-transaction` - Prepare swap transaction
- `get-pool-total-shares` - Get total LP shares
- `get-pool-liquidity` - Get pool liquidity details
- `get-pool-swap-fee` - Get pool swap fees
- `get-pool-exit-fee` - Get pool exit fees
- `get-pool-join-exit-records` - Get join/exit history
- `get-pool-total-value-locked` - Get pool TVL
- `prepare-join-pool` - Prepare join pool transaction
- `prepare-exit-pool` - Prepare exit pool transaction
- `get-pool-apr` - Get pool APR

### 🎯 Concentrated Liquidity Tools (15 tools)
- `get-cl-pools` - Get all CL pools
- `get-cl-positions` - Get CL positions for address
- `get-cl-position` - Get specific CL position details
- `get-cl-positions-by-pool` - Get all positions in a pool
- `get-cl-user-positions` - Get user's CL positions
- `price-to-tick` - Convert price to tick
- `tick-to-price` - Convert tick to price
- `get-cl-pool-incentives` - Get CL pool incentives
- `get-cl-pool-liquidity` - Get CL pool liquidity
- `get-cl-pool-tick-data` - Get tick spacing and current tick
- `get-cl-pool-fee-growth` - Get fee growth statistics
- `prepare-cl-create-position` - Prepare create position transaction
- `prepare-cl-add-liquidity` - Prepare add liquidity transaction
- `prepare-cl-remove-liquidity` - Prepare remove liquidity transaction
- `get-cl-swap-estimates` - Get CL-specific swap estimates

### 🥩 Staking Tools (15 tools)
- `get-validators` - Get validator information
- `get-delegations` - Get delegations for address
- `get-staking-rewards` - Get pending staking rewards
- `get-unbonding-delegations` - Get unbonding delegations
- `get-validator-delegations` - Get all delegations to validator
- `get-validator-unbonding-delegations` - Get validator unbonding delegations
- `get-validator-commission` - Get validator commission
- `get-validator-self-delegation` - Get validator self-delegation
- `prepare-delegate` - Prepare delegation transaction
- `prepare-undelegate` - Prepare undelegation transaction
- `prepare-redelegate` - Prepare redelegation transaction
- `prepare-claim-rewards` - Prepare claim rewards transaction
- `get-staking-params` - Get staking parameters
- `get-slashing-params` - Get slashing parameters
- `get-distribution-params` - Get distribution parameters

### 🗳️ Governance Tools (4 tools)
- `get-proposals` - Get governance proposals
- `get-proposal-details` - Get proposal details
- `get-proposal-votes` - Get proposal votes
- `get-proposal-tally` - Get proposal vote tally

### 💰 DeFi Tools (5 tools)
- `get-twap` - Get Time-Weighted Average Price
- `get-lockups` - Get token lockup information
- `get-superfluid-assets` - Get superfluid staking assets
- `get-denoms-by-creator` - Get token factory denoms by creator
- `get-ibc-denom-trace` - Get IBC token source information

### 📜 CosmWasm Tools (20 tools)
- `get-wasm-codes` - Get all uploaded WASM codes
- `get-wasm-code-info` - Get WASM code information
- `get-contracts-by-code` - Get contracts by code ID
- `get-contract-info` - Get contract metadata
- `query-contract-state` - Query contract state
- `get-contract-history` - Get contract migration history
- `prepare-instantiate-contract` - Prepare contract instantiation
- `prepare-execute-contract` - Prepare contract execution
- `prepare-migrate-contract` - Prepare contract migration
- `get-contract-code-id` - Get contract code ID
- `get-contract-admin` - Get contract admin
- `get-contract-label` - Get contract label
- `query-contract-raw` - Query raw contract storage
- `get-pinned-codes` - Get pinned code IDs
- `get-code-metadata` - Get code metadata
- `validate-contract-address` - Validate contract address
- `estimate-instantiate-fee` - Estimate instantiation gas
- `estimate-execute-fee` - Estimate execution gas
- `get-contract-ibc-port` - Get contract IBC port
- `get-contract-events` - Get contract events

### 🏭 Token Factory Tools (10 tools)
- `get-token-factory-denoms` - Get all token factory denoms
- `get-token-factory-denom-info` - Get token factory denom metadata
- `get-token-factory-creator` - Get token creator address
- `prepare-create-token-factory-denom` - Prepare create token transaction
- `prepare-mint-token-factory-tokens` - Prepare mint tokens transaction
- `prepare-burn-token-factory-tokens` - Prepare burn tokens transaction
- `prepare-change-token-factory-admin` - Prepare change admin transaction
- `get-token-factory-params` - Get token factory parameters
- `validate-token-factory-denom` - Validate token factory denom
- `get-token-factory-total-supply` - Get token total supply

### ⚡ ProtoRev Tools (8 tools)
- `get-protorev-profits-by-denom` - Get MEV profits by denomination
- `get-protorev-profits-by-tx` - Get MEV profits by transaction
- `get-protorev-statistics` - Get overall MEV statistics
- `get-protorev-number-of-trades` - Get ProtoRev trade count
- `get-protorev-enabled` - Check if ProtoRev is enabled
- `get-protorev-developer-account` - Get developer account
- `get-protorev-max-pool-points` - Get max pool points per tx
- `get-protorev-pool-weights` - Get pool weight configuration

### 🔧 Specialized Tools (11 tools)
- `get-downtime-detector-params` - Get downtime detector parameters
- `get-downtime-status` - Get current downtime status
- `get-validator-set-preference` - Get validator set preferences
- `get-ibc-rate-limits` - Get IBC rate limiting info
- `get-mint-params` - Get token minting parameters
- `get-epoch-provisions` - Get current epoch provisions
- `get-all-locks-by-type` - Get locks by type
- `get-synthetic-locks-by-lock-id` - Get synthetic lock details
- `get-fee-tokens` - Get accepted fee tokens
- `get-pool-incentives-params` - Get pool incentives parameters
- `get-superfluid-params` - Get superfluid parameters

### 🔐 Wallet Management Tools (6 tools)
- `generate-wallet` - Generate new Osmosis wallet with mnemonic
- `restore-wallet-from-mnemonic` - Restore wallet from seed phrase
- `get-wallet-address` - Get address from mnemonic
- `validate-mnemonic` - Validate BIP-39 mnemonic phrase
- `validate-address` - Validate Osmosis address format
- `derive-address-from-pubkey` - Derive address from public key

### 🚀 **Execution Tools (37 tools) - NEW!**
#### Bank Operations (3 tools)
- `send` - Send tokens to another address
- `multi-send` - Send tokens to multiple addresses
- `set-send-enabled` - Enable/disable sending for token types

#### Governance Operations (4 tools)
- `submit-proposal` - Submit governance proposal
- `vote-proposal` - Vote on governance proposal
- `deposit-proposal` - Deposit tokens to proposal
- `claim-community-pool` - Claim community pool rewards

#### Lockup & Incentive Operations (6 tools)
- `lock-tokens` - Lock tokens for incentive rewards
- `begin-unlocking` - Start unlocking specific locked tokens
- `begin-unlocking-all` - Start unlocking all locked tokens
- `unlock-period-lock` - Unlock completed period locks
- `claim-incentives` - Claim available incentive rewards
- `create-gauge` - Create new incentive gauge

#### IBC Operations (4 tools)
- `ibc-transfer` - Transfer tokens across chains
- `timeout-packet` - Handle IBC packet timeouts
- `acknowledge-packet` - Acknowledge IBC packets
- `update-client` - Update IBC light clients

#### Advanced Pool Operations (8 tools)
- `create-pool` - Create new liquidity pools
- `join-swap-extern-amount-in` - Advanced join-swap operations
- `join-swap-share-amount-out` - Join-swap with share output
- `exit-swap-extern-amount-out` - Advanced exit-swap operations
- `exit-swap-share-amount-in` - Exit-swap with share input
- `create-cosmwasm-pool` - Create CosmWasm-based pools
- `stable-swap` - Perform stable asset swaps
- `set-pool-weights` - Adjust pool weights

#### Superfluid Staking Operations (4 tools)
- `superfluid-delegate` - Delegate LP tokens via Superfluid
- `superfluid-undelegate` - Undelegate Superfluid tokens
- `lock-and-superfluid-delegate` - Lock and delegate in one tx
- `unlock-and-migrate-superfluid-tokens` - Unlock and migrate

#### Token Factory Advanced Operations (3 tools)
- `set-token-metadata` - Set custom token metadata
- `force-transfer` - Admin force transfer tokens
- `set-before-send-hook` - Set token transfer hooks

#### Module Administration (5 tools)
- `update-params` - Update module parameters
- `upgrade-proposal` - Submit software upgrade proposal
- `cancel-upgrade` - Cancel pending upgrade
- `set-withdrawal-address` - Set reward withdrawal address
- `fund-community-pool` - Fund community pool

## Example Interactions

### Basic Blockchain Queries

Ask Claude:
```
What's the current status of the Osmosis blockchain?
```

```
Can you tell me about the OSMO token on Osmosis?
```

```
What's the balance of osmosis1abc...xyz?
```

### Pool and Trading Operations

```
Show me information about pool #1
```

```
I want to swap 10 OSMO for ATOM. Can you estimate how much ATOM I would get?
```

```
What pools have the highest APR right now?
```

```
Help me prepare a transaction to join pool #678 with 100 OSMO and 50 ATOM
```

### Concentrated Liquidity Management

```
Show me all my concentrated liquidity positions for address osmosis1...
```

```
Convert a price of 1.25 ATOM/OSMO to tick format for pool #1066
```

```
Help me create a new CL position in the OSMO/USDC pool with a price range of $0.8 to $1.2
```

### Staking and Governance

```
Show me all active validators and their commission rates
```

```
What are my pending staking rewards for osmosis1...?
```

```
What governance proposals are currently active?
```

```
Prepare a transaction to delegate 100 OSMO to validator osmovaloper1...
```

### Smart Contract Interactions

```
Show me all smart contracts deployed with code ID 123
```

```
Query the state of contract osmosis14... with message {"get_config": {}}
```

```
Help me prepare a transaction to execute contract osmosis14... with the "swap" function
```

### Token Factory Operations

```
Show me all custom tokens created by address osmosis1...
```

```
Help me create a new token called "MyToken" with symbol "MTK"
```

```
Prepare a transaction to mint 1000 MTK tokens to address osmosis1...
```

### Advanced Analytics

```
What are the current ProtoRev MEV profits for OSMO?
```

```
Show me the time-weighted average price for OSMO/ATOM over the last 24 hours
```

```
What's the total value locked in pool #1?
```

### 🚀 **NEW: Direct Transaction Execution**

```
Generate a new Osmosis wallet for me
```

```
Send 10 OSMO from my wallet to osmosis1abc...xyz using my mnemonic phrase
```

```
Vote 'yes' on governance proposal #42 using my wallet
```

```
Lock 100 OSMO for 14 days to earn incentive rewards
```

```
Create an IBC transfer of 50 ATOM to the Cosmos Hub
```

```
Submit a text governance proposal titled "Improve Pool Incentives"
```

## Security Notes

⚠️ **UPDATED SECURITY MODEL:**
- **Default Network**: TESTNET (for safety during execution tools testing)
- **Execution Tools**: Can sign and broadcast transactions directly using provided mnemonics
- **Query Tools**: Read-only operations, no private key handling
- **Production Use**: Set `OSMOSIS_NETWORK=mainnet` environment variable for mainnet
- **Mnemonic Handling**: Mnemonics are processed in-memory only, never stored
- **Testnet First**: Always test with testnet before using mainnet funds

## Development

```bash
# Run in development mode with auto-reloading
npm run dev

# Test with the MCP inspector  
npm run inspect

# Run all tests
npm run test

# Validate everything works
npm run validate
```

## Tool Categories Summary

| Category | Count | Description |
|----------|--------|-------------|
| 📊 Blockchain | 9 | Core blockchain operations and queries |
| 🏊 Pools | 18 | Liquidity pool management and trading |
| 🎯 Concentrated Liquidity | 15 | Advanced CL position management |
| 🥩 Staking | 15 | Validator operations and delegation |
| 🗳️ Governance | 4 | Proposal voting and governance |
| 💰 DeFi | 5 | Advanced DeFi features and analytics |
| 📜 CosmWasm | 20 | Smart contract interactions |
| 🏭 Token Factory | 10 | Custom token creation and management |
| ⚡ ProtoRev | 8 | MEV and arbitrage tracking |
| 🔧 Specialized | 11 | Advanced module features |
| 🔐 Wallet | 6 | Wallet generation and management |
| 🚀 Execution | 37 | **Direct transaction execution** |
| **Total** | **158** | **Complete Osmosis ecosystem coverage** |

## Architecture

The server is built with:
- **TypeScript** for type safety
- **@modelcontextprotocol/sdk** for MCP protocol implementation  
- **@cosmjs/stargate** for Cosmos SDK interactions
- **osmojs** for Osmosis-specific operations
- **axios** for HTTP API calls
- **zod** for input validation

Each tool category is modular and can be used independently, making the server highly maintainable and extensible.

## License

MIT