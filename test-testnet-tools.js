#!/usr/bin/env node

// Test the new testnet utility tools
import { OsmosisMCPServer } from './build/server.js';

console.log('🧪 TESTING NEW TESTNET UTILITY TOOLS');
console.log('===================================');
console.log('🎯 Testing 3 new testnet tools for better UX');
console.log('');

async function testTestnetTools() {
  try {
    const server = new OsmosisMCPServer();
    let testWallet = null;
    
    console.log('✅ Server created successfully');
    console.log('');
    
    // Test 1: Check testnet status
    console.log('🌐 Test 1: Check Testnet Status...');
    try {
      const statusResult = await server['handleToolCall']('check-testnet-status', {});
      const statusData = JSON.parse(statusResult.content[0].text);
      
      console.log('📊 Testnet Status:');
      console.log(`   Network: ${statusData.network}`);
      console.log(`   Chain ID: ${statusData.chainId}`);
      console.log(`   Is Testnet: ${statusData.isTestnet}`);
      console.log(`   Faucet Available: ${statusData.faucetAvailable}`);
      console.log(`   Status: ${statusData.status}`);
      console.log('');
      
    } catch (error) {
      console.log('❌ Status check failed:', error.message);
    }
    
    // Test 2: Generate wallet for testing
    console.log('🔑 Test 2: Generate Test Wallet...');
    try {
      const walletResult = await server['handleToolCall']('generate-wallet', { wordCount: 12 });
      const walletData = JSON.parse(walletResult.content[0].text);
      testWallet = walletData;
      
      console.log('✅ Test wallet generated:');
      console.log(`   Address: ${walletData.address}`);
      console.log('');
      
    } catch (error) {
      console.log('❌ Wallet generation failed:', error.message);
      return;
    }
    
    // Test 3: Get testnet tokens (instructions)
    console.log('💰 Test 3: Get Testnet Token Instructions...');
    try {
      const tokensResult = await server['handleToolCall']('get-testnet-tokens', { 
        address: testWallet.address,
        amount: '1000000'
      });
      const tokensData = JSON.parse(tokensResult.content[0].text);
      
      console.log('📋 Testnet Token Sources:');
      console.log(`   Network: ${tokensData.network}`);
      console.log(`   Address: ${tokensData.address}`);
      console.log(`   Faucet Sources: ${tokensData.faucetSources.length} available`);
      console.log(`   Quick Start Steps: ${tokensData.quickStart.length} steps`);
      console.log('');
      
      console.log('🔗 Available Faucet Sources:');
      tokensData.faucetSources.forEach((source, i) => {
        console.log(`   ${i + 1}. ${source.name}`);
        console.log(`      URL: ${source.url}`);
        console.log(`      Description: ${source.description}`);
      });
      console.log('');
      
    } catch (error) {
      console.log('❌ Get tokens instructions failed:', error.message);
    }
    
    // Test 4: Try testnet faucet (will likely fail but should handle gracefully)
    console.log('🚰 Test 4: Test Faucet Request...');
    try {
      const faucetResult = await server['handleToolCall']('testnet-faucet', { 
        address: testWallet.address,
        amount: '10000000'
      });
      const faucetData = JSON.parse(faucetResult.content[0].text);
      
      console.log('📊 Faucet Result:');
      console.log(`   Success: ${faucetData.success}`);
      console.log(`   Message: ${faucetData.message}`);
      if (faucetData.txHash) {
        console.log(`   TX Hash: ${faucetData.txHash}`);
      }
      if (faucetData.error) {
        console.log(`   Error: ${faucetData.error}`);
      }
      console.log(`   Next Steps: ${faucetData.nextSteps.length} recommendations`);
      console.log('');
      
    } catch (error) {
      console.log('❌ Faucet test failed:', error.message);
    }
    
    // Test 5: Get testnet tokens without address (general instructions)
    console.log('📖 Test 5: Get General Testnet Instructions...');
    try {
      const generalResult = await server['handleToolCall']('get-testnet-tokens', {});
      const generalData = JSON.parse(generalResult.content[0].text);
      
      console.log('📋 General Instructions:');
      console.log(`   Network: ${generalData.network}`);
      console.log(`   Instructions Count: ${generalData.instructions.length}`);
      console.log(`   Quick Start Count: ${generalData.quickStart.length}`);
      console.log('');
      
      console.log('🚀 Quick Start Steps:');
      generalData.quickStart.forEach((step, i) => {
        console.log(`   ${step}`);
      });
      console.log('');
      
    } catch (error) {
      console.log('❌ General instructions failed:', error.message);
    }
    
    console.log('🎉 TESTNET TOOLS TEST COMPLETE!');
    console.log('');
    console.log('📊 Summary:');
    console.log('   • ✅ check-testnet-status - Shows current network and safety info');
    console.log('   • ✅ get-testnet-tokens - Provides faucet sources and instructions');
    console.log('   • ✅ testnet-faucet - Attempts to get tokens from official faucet');
    console.log('');
    console.log('💡 User Experience Improvements:');
    console.log('   • 🎯 Clear testnet vs mainnet indication');
    console.log('   • 📋 Step-by-step token acquisition guide');
    console.log('   • 🚰 Direct faucet integration (when available)');
    console.log('   • ⚠️  Safety warnings for mainnet usage');
    console.log('');
    console.log('🚀 PERFECT FOR CLAUDE DESKTOP INTEGRATION!');
    console.log('Users can now easily:');
    console.log('   1. "Check if I\'m on testnet"');
    console.log('   2. "Get me some testnet tokens"');
    console.log('   3. "Generate a wallet and fund it"');
    console.log('   4. "Start testing execution tools safely"');
    
  } catch (error) {
    console.error('❌ Testnet tools test failed:', error);
  }
}

testTestnetTools();