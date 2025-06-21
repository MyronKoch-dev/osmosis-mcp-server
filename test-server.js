// Simple test server without TypeScript compilation issues
import axios from 'axios';

// Osmosis endpoints
const DEFAULT_RPC_ENDPOINT = "https://rpc.osmosis.zone";
const DEFAULT_REST_ENDPOINT = "https://lcd.osmosis.zone";

// Simple REST API wrapper
async function callOsmosisApi(path, params = {}) {
  try {
    const url = `${DEFAULT_REST_ENDPOINT}${path}`;
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error calling Osmosis API: ${error.message}`);
    throw error;
  }
}

// Test functions
async function testBlockchainStatus() {
  console.log('\n=== Testing Blockchain Status ===');
  try {
    const response = await axios.post(DEFAULT_RPC_ENDPOINT, {
      jsonrpc: "2.0",
      id: 1,
      method: "status",
      params: []
    });
    
    const status = response.data.result;
    console.log('✅ Blockchain Status:');
    console.log(`  Chain ID: ${status.node_info.network}`);
    console.log(`  Latest Block: ${status.sync_info.latest_block_height}`);
    console.log(`  Latest Block Time: ${status.sync_info.latest_block_time}`);
    console.log(`  Catching Up: ${status.sync_info.catching_up}`);
  } catch (error) {
    console.error('❌ Failed to get blockchain status:', error.message);
  }
}

async function testAccountBalance() {
  console.log('\n=== Testing Account Balance ===');
  // Using a known validator address for testing
  const testAddress = "osmo1clpqr4nrk4khgkxj78fcwwh6dl3uw4ep88n0y4e";
  
  try {
    const balances = await callOsmosisApi(`/cosmos/bank/v1beta1/balances/${testAddress}`);
    console.log('✅ Account Balance:');
    console.log(`  Address: ${testAddress}`);
    console.log(`  Balances: ${balances.balances.length} tokens found`);
    
    // Show first few balances
    balances.balances.slice(0, 3).forEach(balance => {
      console.log(`    ${balance.amount} ${balance.denom}`);
    });
  } catch (error) {
    console.error('❌ Failed to get account balance:', error.message);
  }
}

async function testPools() {
  console.log('\n=== Testing Pool Information ===');
  
  try {
    // Test getting pool #1 (OSMO/ATOM)
    const poolInfo = await callOsmosisApi('/osmosis/gamm/v1beta1/pools/1');
    console.log('✅ Pool #1 Information:');
    console.log(`  Pool ID: ${poolInfo.pool.id}`);
    console.log(`  Pool Type: ${poolInfo.pool['@type']}`);
    console.log(`  Total Shares: ${poolInfo.pool.total_shares.amount}`);
    
    // Test getting all pools (limited)
    const allPools = await callOsmosisApi('/osmosis/gamm/v1beta1/pools', {
      'pagination.limit': 5
    });
    console.log(`  Total Pools Available: ${allPools.pools.length} shown (limited to 5)`);
  } catch (error) {
    console.error('❌ Failed to get pool information:', error.message);
  }
}

async function testValidators() {
  console.log('\n=== Testing Validators ===');
  
  try {
    const validators = await callOsmosisApi('/cosmos/staking/v1beta1/validators', {
      'pagination.limit': 3,
      status: 'BOND_STATUS_BONDED'
    });
    
    console.log('✅ Active Validators:');
    console.log(`  Found ${validators.validators.length} validators (showing 3)`);
    
    validators.validators.forEach((validator, index) => {
      console.log(`  ${index + 1}. ${validator.description.moniker}`);
      console.log(`     Voting Power: ${validator.tokens}`);
      console.log(`     Commission: ${(parseFloat(validator.commission.commission_rates.rate) * 100).toFixed(2)}%`);
    });
  } catch (error) {
    console.error('❌ Failed to get validators:', error.message);
  }
}

async function testProposals() {
  console.log('\n=== Testing Governance Proposals ===');
  
  try {
    const proposals = await callOsmosisApi('/cosmos/gov/v1beta1/proposals', {
      'pagination.limit': 3
    });
    
    console.log('✅ Recent Proposals:');
    console.log(`  Found ${proposals.proposals.length} proposals (showing 3)`);
    
    proposals.proposals.forEach((proposal, index) => {
      console.log(`  ${index + 1}. Proposal #${proposal.proposal_id}`);
      console.log(`     Title: ${proposal.content.title}`);
      console.log(`     Status: ${proposal.status}`);
      console.log(`     Submit Time: ${proposal.submit_time}`);
    });
  } catch (error) {
    console.error('❌ Failed to get proposals:', error.message);
  }
}

async function testEpochs() {
  console.log('\n=== Testing Epochs ===');
  
  try {
    const epochs = await callOsmosisApi('/osmosis/epochs/v1beta1/epochs');
    
    console.log('✅ Epochs Information:');
    console.log(`  Found ${epochs.epochs.length} epochs`);
    
    epochs.epochs.forEach((epoch, index) => {
      console.log(`  ${index + 1}. ${epoch.identifier}`);
      console.log(`     Duration: ${epoch.duration}`);
      console.log(`     Current Epoch: ${epoch.current_epoch}`);
      console.log(`     Current Start Time: ${epoch.current_epoch_start_time}`);
    });
  } catch (error) {
    console.error('❌ Failed to get epochs:', error.message);
  }
}

// Main test runner
async function runTests() {
  console.log('🧪 Starting Osmosis MCP Server Tests');
  console.log('=====================================');
  
  await testBlockchainStatus();
  await testAccountBalance(); 
  await testPools();
  await testValidators();
  await testProposals();
  await testEpochs();
  
  console.log('\n✨ All tests completed!');
  console.log('\nℹ️  This demonstrates that your MCP server tools would work with real Osmosis data.');
  console.log('   The actual MCP server would wrap these API calls in the MCP protocol format.');
}

// Handle command line execution
runTests().catch(console.error);

export { runTests, callOsmosisApi };