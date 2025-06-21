#!/usr/bin/env node

// Demo Osmosis Wallet Generator (For Educational Purposes Only)
// DO NOT USE FOR REAL FUNDS - This is for demonstration only

import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

console.log('🔑 OSMOSIS WALLET GENERATOR DEMO');
console.log('⚠️  FOR EDUCATIONAL PURPOSES ONLY - DO NOT USE WITH REAL FUNDS');
console.log('='.repeat(70));

async function generateDemoWallet() {
  try {
    // Generate a random wallet with a 24-word mnemonic
    const wallet = await DirectSecp256k1HdWallet.generate(24, {
      prefix: "osmo", // Osmosis address prefix
    });

    // Get the first account
    const [firstAccount] = await wallet.getAccounts();
    
    // Get the mnemonic
    const mnemonic = wallet.mnemonic;

    console.log('📝 Generated Demo Wallet:');
    console.log('');
    console.log('🏠 Address:', firstAccount.address);
    console.log('🔑 Public Key:', Buffer.from(firstAccount.pubkey).toString('hex'));
    console.log('');
    console.log('🌱 Mnemonic (24 words):');
    console.log(mnemonic);
    console.log('');
    console.log('⚠️  SECURITY WARNINGS:');
    console.log('   • This is a DEMO wallet - do not send real funds to it');
    console.log('   • Never share your mnemonic phrase with anyone');
    console.log('   • Store mnemonic securely offline');
    console.log('   • This demo does not use secure entropy');
    console.log('');
    
    // Now show how to use this address with the MCP server
    console.log('🧪 Test with MCP Server:');
    console.log('You can now use this address with MCP tools like:');
    console.log(`   • get-account-balance --address ${firstAccount.address}`);
    console.log(`   • get-delegations --delegatorAddress ${firstAccount.address}`);
    console.log(`   • get-staking-rewards --delegatorAddress ${firstAccount.address}`);
    
    return {
      address: firstAccount.address,
      pubkey: firstAccount.pubkey,
      mnemonic: mnemonic
    };

  } catch (error) {
    console.error('❌ Error generating demo wallet:', error.message);
    return null;
  }
}

// Generate demo wallet
generateDemoWallet();