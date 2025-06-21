#!/usr/bin/env node

// NETWORK SWITCHING TEST
// Test switching between testnet and mainnet configurations
import { NETWORK_CONFIG, NETWORKS } from './build/config/network.js';

console.log('🌐 NETWORK CONFIGURATION TEST');
console.log('=============================');
console.log('');

function testNetworkConfig() {
  console.log('📊 Current Network Configuration:');
  console.log(`  Chain ID: ${NETWORK_CONFIG.chainId}`);
  console.log(`  RPC Endpoint: ${NETWORK_CONFIG.rpcEndpoint}`);
  console.log(`  REST Endpoint: ${NETWORK_CONFIG.restEndpoint}`);
  console.log(`  Default Denom: ${NETWORK_CONFIG.defaultDenom}`);
  console.log(`  Explorer URL: ${NETWORK_CONFIG.explorerUrl}`);
  console.log('');
  
  console.log('🔍 Available Networks:');
  Object.entries(NETWORKS).forEach(([name, config]) => {
    const isCurrent = config.chainId === NETWORK_CONFIG.chainId;
    console.log(`  ${name}${isCurrent ? ' (CURRENT)' : ''}:`);
    console.log(`    Chain ID: ${config.chainId}`);
    console.log(`    RPC: ${config.rpcEndpoint}`);
    console.log(`    REST: ${config.restEndpoint}`);
    console.log('');
  });
  
  console.log('✅ NETWORK VERIFICATION:');
  
  // Verify testnet is current default
  if (NETWORK_CONFIG.chainId === 'osmo-test-5') {
    console.log('✅ Default network is TESTNET (safe for execution tools)');
  } else if (NETWORK_CONFIG.chainId === 'osmosis-1') {
    console.log('⚠️  Default network is MAINNET (be careful with execution tools!)');
  } else {
    console.log('❌ Unknown network configuration');
    return;
  }
  
  // Verify network structure
  const requiredFields = ['chainId', 'rpcEndpoint', 'restEndpoint', 'defaultDenom', 'explorerUrl'];
  let configValid = true;
  
  requiredFields.forEach(field => {
    if (!NETWORK_CONFIG[field]) {
      console.log(`❌ Missing required field: ${field}`);
      configValid = false;
    }
  });
  
  if (configValid) {
    console.log('✅ Network configuration is valid');
  }
  
  // Verify endpoints are URLs
  try {
    new URL(NETWORK_CONFIG.rpcEndpoint);
    console.log('✅ RPC endpoint is valid URL');
  } catch {
    console.log('❌ RPC endpoint is not a valid URL');
  }
  
  try {
    new URL(NETWORK_CONFIG.restEndpoint);
    console.log('✅ REST endpoint is valid URL');
  } catch {
    console.log('❌ REST endpoint is not a valid URL');
  }
  
  try {
    new URL(NETWORK_CONFIG.explorerUrl);
    console.log('✅ Explorer URL is valid');
  } catch {
    console.log('❌ Explorer URL is not valid');
  }
  
  console.log('');
  console.log('🔧 Environment Variable Instructions:');
  console.log('=====================================');
  console.log('To switch networks, set environment variable:');
  console.log('');
  console.log('For testnet (default):');
  console.log('  export OSMOSIS_NETWORK=testnet');
  console.log('  # or leave unset for testnet default');
  console.log('');
  console.log('For mainnet:');
  console.log('  export OSMOSIS_NETWORK=mainnet');
  console.log('');
  console.log('⚠️  SECURITY WARNING:');
  console.log('When using mainnet:');
  console.log('- Always test with small amounts first');
  console.log('- Verify addresses carefully');
  console.log('- Double-check transaction parameters');
  console.log('- Keep mnemonic phrases secure');
  console.log('');
  
  return configValid;
}

testNetworkConfig();