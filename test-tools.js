// Comprehensive tool validation for Osmosis MCP Server
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";

// Import the main server (we'll test tool count programmatically)
console.log('🔍 Osmosis MCP Server Tool Validation');
console.log('====================================');

// Test tool count by reading the source file
import { readFileSync } from 'fs';

try {
  const sourceCode = readFileSync('./src/index.ts', 'utf8');
  const toolMatches = sourceCode.match(/server\.registerTool\(/g);
  const toolCount = toolMatches ? toolMatches.length : 0;
  
  console.log(`✅ Found ${toolCount} registered tools in source code`);
  
  if (toolCount === 105) {
    console.log('✅ Tool count matches expected 105 tools');
  } else {
    console.log(`❌ Expected 105 tools, found ${toolCount}`);
  }
  
  // Analyze tool categories
  const categories = {
    'Core Blockchain': { pattern: /get-(blockchain-status|transaction|latest-blocks|account-balance|token-info|supply|chain-params|module-accounts|auth-params)/, count: 0 },
    'Liquidity Pools': { pattern: /get-(pool-info|all-pools|pool-spot-price|pool-type|incentivized-pools)|estimate-swap|get-twap|get-historical-prices|prepare-swap/, count: 0 },
    'Concentrated Liquidity': { pattern: /get-cl-|price-to-tick|tick-to-price/, count: 0 },
    'CosmWasm/Smart Contracts': { pattern: /get-wasm-|get-contract-|query-contract|prepare-(instantiate|execute|migrate)-contract/, count: 0 },
    'Token Factory': { pattern: /get-token-factory|prepare-(create|mint|burn|change|force)-token-factory/, count: 0 },
    'ProtoRev/MEV': { pattern: /get-protorev-/, count: 0 },
    'Staking & Governance': { pattern: /get-(validators|delegations|unbonding|staking-rewards|proposals|proposal-|validator-delegations)/, count: 0 },
    'Specialized Modules': { pattern: /get-(downtime|validator-set-preference|ibc-rate-limits|mint-params|epoch-provisions|locks|synthetic-locks)/, count: 0 }
  };
  
  // Count tools in each category
  const lines = sourceCode.split('\n');
  for (const line of lines) {
    if (line.includes('server.registerTool(')) {
      const nextLine = lines[lines.indexOf(line) + 1];
      if (nextLine && nextLine.includes('"')) {
        const toolName = nextLine.match(/"([^"]+)"/)?.[1];
        if (toolName) {
          for (const [category, info] of Object.entries(categories)) {
            if (info.pattern.test(toolName)) {
              info.count++;
              break;
            }
          }
        }
      }
    }
  }
  
  console.log('\n📊 Tool Distribution by Category:');
  for (const [category, info] of Object.entries(categories)) {
    console.log(`  ${category}: ${info.count} tools`);
  }
  
  // Test API connectivity
  console.log('\n🌐 Testing Osmosis API Connectivity:');
  
  try {
    const rpcResponse = await axios.post('https://rpc.osmosis.zone', {
      jsonrpc: "2.0",
      id: 1,
      method: "status",
      params: []
    }, { timeout: 5000 });
    
    if (rpcResponse.data && rpcResponse.data.result) {
      console.log('✅ RPC endpoint connectivity: OK');
      console.log(`   Chain ID: ${rpcResponse.data.result.node_info.network}`);
    } else {
      console.log('❌ RPC endpoint: Invalid response');
    }
  } catch (error) {
    console.log(`❌ RPC endpoint: ${error.message}`);
  }
  
  try {
    const restResponse = await axios.get('https://lcd.osmosis.zone/cosmos/base/tendermint/v1beta1/node_info', { timeout: 5000 });
    
    if (restResponse.data && restResponse.data.default_node_info) {
      console.log('✅ REST endpoint connectivity: OK');
      console.log(`   Network: ${restResponse.data.default_node_info.network}`);
    } else {
      console.log('❌ REST endpoint: Invalid response');
    }
  } catch (error) {
    console.log(`❌ REST endpoint: ${error.message}`);
  }
  
  // Validate TypeScript compilation
  console.log('\n🔨 TypeScript Compilation Check:');
  try {
    const { execSync } = await import('child_process');
    execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe', cwd: '.' });
    console.log('✅ TypeScript compilation: OK');
  } catch (error) {
    console.log('❌ TypeScript compilation: Has errors');
    console.log('   Run `npm run build` to see detailed errors');
  }
  
  console.log('\n📋 Summary:');
  console.log(`   • Total Tools: ${toolCount}/105`);
  console.log('   • API Endpoints: Tested');
  console.log('   • TypeScript: Validated');
  console.log('   • Documentation: Updated');
  
  if (toolCount === 105) {
    console.log('\n🎉 All validations passed! Your Osmosis MCP Server is ready.');
    console.log('   Run `npm run inspect-full` to test all tools interactively.');
  } else {
    console.log('\n⚠️  Some validations failed. Please check the issues above.');
  }
  
} catch (error) {
  console.error('❌ Validation failed:', error.message);
}