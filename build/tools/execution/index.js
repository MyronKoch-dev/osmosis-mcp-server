// Execution Tools Index - All direct transaction execution tools
import { governanceExecutionTools } from './governance.js';
import { lockupExecutionTools } from './lockup.js';
import { ibcExecutionTools } from './ibc.js';
import { bankExecutionTools } from './bank.js';
import { poolExecutionTools } from './pools.js';
import { superfluidExecutionTools } from './superfluid.js';
import { tokenfactoryExecutionTools } from './tokenfactory.js';
import { adminExecutionTools } from './admin.js';
// Combine all execution tools
export const allExecutionTools = [
    ...governanceExecutionTools, // 4 tools
    ...lockupExecutionTools, // 6 tools  
    ...ibcExecutionTools, // 4 tools
    ...bankExecutionTools, // 3 tools
    ...poolExecutionTools, // 8 tools
    ...superfluidExecutionTools, // 4 tools
    ...tokenfactoryExecutionTools, // 3 tools
    ...adminExecutionTools // 5 tools
];
// Export individual categories
export { governanceExecutionTools, lockupExecutionTools, ibcExecutionTools, bankExecutionTools, poolExecutionTools, superfluidExecutionTools, tokenfactoryExecutionTools, adminExecutionTools };
// Execution tool counts
export const executionToolCounts = {
    governance: governanceExecutionTools.length,
    lockup: lockupExecutionTools.length,
    ibc: ibcExecutionTools.length,
    bank: bankExecutionTools.length,
    pools: poolExecutionTools.length,
    superfluid: superfluidExecutionTools.length,
    tokenfactory: tokenfactoryExecutionTools.length,
    admin: adminExecutionTools.length,
    total: allExecutionTools.length
};
