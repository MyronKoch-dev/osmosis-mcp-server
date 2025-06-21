// Osmosis Constants and Configuration

// API Request Configuration
export const API_CONFIG = {
  timeout: 10000, // 10 seconds
  retries: 3,
  defaultPageLimit: '10',
  maxPageLimit: '100'
};

// Common Osmosis Asset Denominations
export const ASSET_DENOMS = {
  OSMO: 'uosmo',
  ATOM: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  USDC: 'ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858',
  USDT: 'ibc/4ABBEF4C8926DDDB320AE5188CFD63267ABBCEFC0583E4AE05D6E5AA2401DDAB',
  DAI: 'ibc/0CD3A0285E1341859B5E86B6AB7682F023D03E97607CCC1DC95706411D866DF7',
  WBTC: 'ibc/D1542AA8762DB13087D8364F3EA6509FD6F009A34F00426AF9E4F9FA85CBBF1F',
  WETH: 'ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5'
};

// Popular Pool IDs for reference
export const POPULAR_POOLS = {
  OSMO_ATOM: '1',
  OSMO_USDC: '678', 
  ATOM_USDC: '1135',
  OSMO_DAI: '674',
  OSMO_USDT: '816'
};

// Validator Status Constants
export const VALIDATOR_STATUS = {
  BONDED: 'BOND_STATUS_BONDED',
  UNBONDING: 'BOND_STATUS_UNBONDING', 
  UNBONDED: 'BOND_STATUS_UNBONDED'
};

// Proposal Status Constants
export const PROPOSAL_STATUS = {
  UNSPECIFIED: 'PROPOSAL_STATUS_UNSPECIFIED',
  DEPOSIT_PERIOD: 'PROPOSAL_STATUS_DEPOSIT_PERIOD',
  VOTING_PERIOD: 'PROPOSAL_STATUS_VOTING_PERIOD',
  PASSED: 'PROPOSAL_STATUS_PASSED',
  REJECTED: 'PROPOSAL_STATUS_REJECTED',
  FAILED: 'PROPOSAL_STATUS_FAILED'
};

// API Endpoint Templates
export const API_ENDPOINTS = {
  // Core blockchain
  status: '/status',
  nodeInfo: '/cosmos/base/tendermint/v1beta1/node_info',
  
  // Accounts & Balances
  accountBalance: '/cosmos/bank/v1beta1/balances/{address}',
  accountInfo: '/cosmos/auth/v1beta1/accounts/{address}',
  
  // Pools
  pools: '/osmosis/gamm/v1beta1/pools',
  poolInfo: '/osmosis/gamm/v1beta1/pools/{poolId}',
  poolPrices: '/osmosis/gamm/v1beta1/pools/{poolId}/prices',
  estimateSwap: '/osmosis/gamm/v1beta1/pools/{poolId}/estimate/swap_exact_amount_in',
  
  // Concentrated Liquidity
  clPools: '/osmosis/concentratedliquidity/v1beta1/pools',
  clUserPositions: '/osmosis/concentratedliquidity/v1beta1/user_positions',
  clPositionById: '/osmosis/concentratedliquidity/v1beta1/position_by_id',
  
  // Staking
  validators: '/cosmos/staking/v1beta1/validators',
  delegations: '/cosmos/staking/v1beta1/delegations/{delegatorAddress}',
  unbondingDelegations: '/cosmos/staking/v1beta1/delegators/{delegatorAddress}/unbonding_delegations',
  stakingRewards: '/cosmos/distribution/v1beta1/delegators/{delegatorAddress}/rewards',
  
  // Governance
  proposals: '/cosmos/gov/v1beta1/proposals',
  proposalDetails: '/cosmos/gov/v1beta1/proposals/{proposalId}',
  proposalVotes: '/cosmos/gov/v1beta1/proposals/{proposalId}/votes',
  proposalTally: '/cosmos/gov/v1beta1/proposals/{proposalId}/tally',
  
  // TWAP
  arithmeticTwap: '/osmosis/twap/v1beta1/ArithmeticTwap',
  
  // Incentives
  incentivizedPools: '/osmosis/pool-incentives/v1beta1/incentivized_pools',
  poolIncentives: '/osmosis/pool-incentives/v1beta1/pool_incentives/{poolId}',
  
  // Epochs
  epochs: '/osmosis/epochs/v1beta1/epochs',
  
  // Lockup
  accountLockedCoins: '/osmosis/lockup/v1beta1/account_locked_coins/{owner}',
  
  // Superfluid
  superfluidAssets: '/osmosis/superfluid/v1beta1/all_assets',
  
  // Token Factory
  denomsFromCreator: '/osmosis/tokenfactory/v1beta1/denoms_from_creator/{creator}',
  
  // IBC
  denomTraces: '/ibc/apps/transfer/v1/denom_traces/{hash}'
};