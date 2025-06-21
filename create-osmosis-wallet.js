#!/usr/bin/env node

// Osmosis Wallet Creator - Generate real Osmosis wallets
import { generateWallet, validateAddress } from './build/utils/wallet.js';

console.log('🔑 OSMOSIS WALLET CREATOR');
console.log('========================');
console.log('⚠️  SECURITY WARNING: Keep your mnemonic phrase safe!');
console.log('   • Store it securely offline');
console.log('   • Never share it with anyone');
console.log('   • This phrase controls your funds');
console.log('');

async function createWallet() {
  try {
    // Get word count from command line args or default to 24
    const args = process.argv.slice(2);
    const wordCount = args.includes('--12-words') ? 12 : 24;
    
    console.log(`🔄 Generating ${wordCount}-word Osmosis wallet...`);
    console.log('');
    
    const wallet = await generateWallet(wordCount, 'osmo');
    
    console.log('✅ NEW OSMOSIS WALLET CREATED');
    console.log('============================');
    console.log('');
    console.log('🏠 Address:');
    console.log(`   ${wallet.address}`);
    console.log('');
    console.log('🔑 Public Key:');
    console.log(`   ${wallet.publicKey}`);
    console.log('');
    console.log(`🌱 Recovery Phrase (${wordCount} words):`);
    console.log(`   ${wallet.mnemonic}`);
    console.log('');
    
    // Verify the wallet
    const isValid = validateAddress(wallet.address, 'osmo');
    console.log(`✅ Address validation: ${isValid ? 'VALID' : 'INVALID'}`);
    console.log('');
    
    console.log('📋 NEXT STEPS:');
    console.log('1. 💾 SAVE your recovery phrase in a secure location');
    console.log('2. 🔒 Import into Keplr, Cosmostation, or other Cosmos wallet');
    console.log('3. 💰 Send OSMO to your new address to start using it');
    console.log('4. 🧪 Test with small amounts first');
    console.log('');
    
    console.log('🔗 USEFUL LINKS:');
    console.log('• Osmosis App: https://app.osmosis.zone');
    console.log('• Keplr Wallet: https://wallet.keplr.app');
    console.log('• Block Explorer: https://www.mintscan.io/osmosis');
    console.log('');
    
    console.log('🧪 TEST WITH MCP SERVER:');
    console.log(`• get-account-balance --address ${wallet.address}`);
    console.log(`• get-staking-rewards --delegatorAddress ${wallet.address}`);
    console.log(`• get-cl-positions --address ${wallet.address}`);
    
  } catch (error) {
    console.error('❌ Failed to create wallet:', error.message);
    process.exit(1);
  }
}

// Show usage info
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: node create-osmosis-wallet.js [options]');
  console.log('');
  console.log('Options:');
  console.log('  --12-words    Generate 12-word mnemonic (default: 24 words)');
  console.log('  --help, -h    Show this help message');
  console.log('');
  console.log('Examples:');
  console.log('  node create-osmosis-wallet.js           # Create 24-word wallet');
  console.log('  node create-osmosis-wallet.js --12-words # Create 12-word wallet');
  process.exit(0);
}

// Create the wallet
createWallet();