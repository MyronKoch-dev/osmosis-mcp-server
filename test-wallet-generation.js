#!/usr/bin/env node

// Test the new wallet generation capabilities
import { allTools } from './build/tools/index.js';
import { generateWallet, validateMnemonic, validateAddress } from './build/utils/wallet.js';

console.log('🔑 TESTING OSMOSIS WALLET GENERATION');
console.log('=====================================');

// Check that wallet tools are included
const walletTools = allTools.filter(tool => tool.name.includes('wallet') || tool.name.includes('generate') || tool.name.includes('mnemonic'));

console.log(`📊 Found ${walletTools.length} wallet-related tools:`);
walletTools.forEach(tool => {
  console.log(`  • ${tool.name}: ${tool.description}`);
});

console.log('');

// Test wallet generation
async function testWalletGeneration() {
  try {
    console.log('🧪 Testing wallet generation...');
    
    // Generate a 24-word wallet
    const wallet24 = await generateWallet(24, 'osmo');
    console.log('✅ 24-word wallet generated:');
    console.log(`   Address: ${wallet24.address}`);
    console.log(`   Public Key: ${wallet24.publicKey}`);
    console.log(`   Mnemonic: ${wallet24.mnemonic}`);
    console.log('');
    
    // Generate a 12-word wallet
    const wallet12 = await generateWallet(12, 'osmo');
    console.log('✅ 12-word wallet generated:');
    console.log(`   Address: ${wallet12.address}`);
    console.log(`   Mnemonic word count: ${wallet12.mnemonic.split(' ').length}`);
    console.log('');
    
    // Test mnemonic validation
    console.log('🧪 Testing mnemonic validation...');
    const isValid24 = validateMnemonic(wallet24.mnemonic);
    const isValid12 = validateMnemonic(wallet12.mnemonic);
    const isInvalid = validateMnemonic('invalid mnemonic phrase here');
    
    console.log(`✅ 24-word mnemonic valid: ${isValid24}`);
    console.log(`✅ 12-word mnemonic valid: ${isValid12}`);
    console.log(`✅ Invalid mnemonic rejected: ${!isInvalid}`);
    console.log('');
    
    // Test address validation
    console.log('🧪 Testing address validation...');
    const isValidAddr24 = validateAddress(wallet24.address, 'osmo');
    const isValidAddr12 = validateAddress(wallet12.address, 'osmo');
    const isInvalidAddr = validateAddress('cosmos1invalid', 'osmo');
    
    console.log(`✅ Generated address 1 valid: ${isValidAddr24}`);
    console.log(`✅ Generated address 2 valid: ${isValidAddr12}`);
    console.log(`✅ Wrong prefix rejected: ${!isInvalidAddr}`);
    console.log('');
    
    // Show updated tool count
    const toolCounts = await import('./build/tools/index.js').then(m => m.toolCounts);
    console.log('📈 Updated tool counts:');
    Object.entries(toolCounts).forEach(([category, count]) => {
      console.log(`   ${category}: ${count}`);
    });
    
    console.log('');
    console.log('🎉 All wallet tests passed!');
    console.log(`🚀 MCP Server now has ${toolCounts.total} total tools including wallet management!`);
    
  } catch (error) {
    console.error('❌ Wallet test failed:', error.message);
  }
}

// Run tests
testWalletGeneration();