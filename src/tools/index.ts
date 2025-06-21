// Central export for all Osmosis MCP tools
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { blockchainTools } from './blockchain.js';
import { poolTools } from './pools.js';
import { concentratedLiquidityTools } from './concentratedLiquidity.js';
import { stakingTools } from './staking.js';
import { governanceTools } from './governance.js';
import { defiTools } from './defi.js';
import { cosmwasmTools } from './cosmwasm.js';
import { tokenFactoryTools } from './tokenFactory.js';
import { protorevTools } from './protorev.js';
import { specializedTools } from './specialized.js';
import { walletTools } from './wallet.js';
import { allExecutionTools } from './execution/index.js';
import { testnetTools } from './testnet.js';

// Combine all tools into a single export
export const allTools: Tool[] = [
  ...blockchainTools,
  ...poolTools,
  ...concentratedLiquidityTools,
  ...stakingTools,
  ...governanceTools,
  ...defiTools,
  ...cosmwasmTools,
  ...tokenFactoryTools,
  ...protorevTools,
  ...specializedTools,
  ...walletTools,
  ...allExecutionTools,
  ...testnetTools
];

// Export individual categories for modular access
export {
  blockchainTools,
  poolTools,
  concentratedLiquidityTools,
  stakingTools,
  governanceTools,
  defiTools,
  cosmwasmTools,
  tokenFactoryTools,
  protorevTools,
  specializedTools,
  walletTools,
  allExecutionTools,
  testnetTools
};

// Tool count summary
export const toolCounts = {
  blockchain: blockchainTools.length,
  pools: poolTools.length,
  concentratedLiquidity: concentratedLiquidityTools.length,
  staking: stakingTools.length,
  governance: governanceTools.length,
  defi: defiTools.length,
  cosmwasm: cosmwasmTools.length,
  tokenFactory: tokenFactoryTools.length,
  protorev: protorevTools.length,
  specialized: specializedTools.length,
  wallet: walletTools.length,
  execution: allExecutionTools.length,
  testnet: testnetTools.length,
  total: allTools.length
};