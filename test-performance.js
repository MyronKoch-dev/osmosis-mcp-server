#!/usr/bin/env node

// PERFORMANCE AND CONCURRENT REQUEST TESTING
// Test server performance with multiple concurrent requests
import { OsmosisMCPServer } from './build/server.js';

console.log('⚡ PERFORMANCE & CONCURRENCY TEST');
console.log('=================================');
console.log('');

async function performanceTest() {
  const server = new OsmosisMCPServer();
  
  console.log('🔍 Test 1: Sequential Request Performance');
  console.log('=========================================');
  
  const sequentialTests = [
    () => server['handleToolCall']('get-blockchain-status', {}),
    () => server['handleToolCall']('generate-wallet', { wordCount: 12 }),
    () => server['handleToolCall']('get-all-pools', { limit: '5' }),
    () => server['handleToolCall']('get-validators', {}),
    () => server['handleToolCall']('validate-address', { address: 'osmo1abc123' }),
    () => server['handleToolCall']('get-superfluid-assets', {}),
    () => server['handleToolCall']('get-wasm-codes', {}), // placeholder
    () => server['handleToolCall']('get-cl-pools', { limit: '3' }),
  ];
  
  console.log(`Testing ${sequentialTests.length} sequential requests...`);
  const seqStart = Date.now();
  
  let seqSuccess = 0;
  let seqFailed = 0;
  
  for (const test of sequentialTests) {
    try {
      await test();
      seqSuccess++;
    } catch (error) {
      seqFailed++;
    }
  }
  
  const seqTime = Date.now() - seqStart;
  const avgSeqTime = seqTime / sequentialTests.length;
  
  console.log(`✅ Sequential Results:`);
  console.log(`   Success: ${seqSuccess}/${sequentialTests.length}`);
  console.log(`   Total Time: ${seqTime}ms`);
  console.log(`   Average Time per Request: ${avgSeqTime.toFixed(1)}ms`);
  console.log('');
  
  console.log('🚀 Test 2: Concurrent Request Performance');
  console.log('=========================================');
  
  const concurrentTests = [
    () => server['handleToolCall']('get-blockchain-status', {}),
    () => server['handleToolCall']('generate-wallet', { wordCount: 24 }),
    () => server['handleToolCall']('get-all-pools', { limit: '3' }),
    () => server['handleToolCall']('get-validators', {}),
    () => server['handleToolCall']('validate-mnemonic', { mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about' }),
    () => server['handleToolCall']('get-superfluid-assets', {}),
    () => server['handleToolCall']('get-token-factory-denoms', {}), // placeholder
    () => server['handleToolCall']('get-cl-pools', { limit: '2' }),
    () => server['handleToolCall']('validate-address', { address: 'osmo1test' }),
    () => server['handleToolCall']('get-protorev-statistics', {}), // placeholder
  ];
  
  console.log(`Testing ${concurrentTests.length} concurrent requests...`);
  const concStart = Date.now();
  
  const concurrentResults = await Promise.allSettled(
    concurrentTests.map(test => test())
  );
  
  const concTime = Date.now() - concStart;
  const concSuccess = concurrentResults.filter(r => r.status === 'fulfilled').length;
  const concFailed = concurrentResults.filter(r => r.status === 'rejected').length;
  
  console.log(`✅ Concurrent Results:`);
  console.log(`   Success: ${concSuccess}/${concurrentTests.length}`);
  console.log(`   Total Time: ${concTime}ms`);
  console.log(`   Speedup vs Sequential: ${(seqTime / concTime).toFixed(1)}x`);
  console.log('');
  
  console.log('🧠 Test 3: Memory Usage & Wallet Generation Load');
  console.log('================================================');
  
  const walletGenStart = Date.now();
  const walletPromises = Array(10).fill().map(() => 
    server['handleToolCall']('generate-wallet', { wordCount: 12 })
  );
  
  const walletResults = await Promise.allSettled(walletPromises);
  const walletTime = Date.now() - walletGenStart;
  const walletSuccess = walletResults.filter(r => r.status === 'fulfilled').length;
  
  console.log(`✅ Wallet Generation Load Test:`);
  console.log(`   Generated: ${walletSuccess}/10 wallets`);
  console.log(`   Total Time: ${walletTime}ms`);
  console.log(`   Average per Wallet: ${(walletTime / 10).toFixed(1)}ms`);
  console.log('');
  
  console.log('📊 Test 4: Tool Schema Performance');
  console.log('==================================');
  
  const schemaStart = Date.now();
  
  // Test tool listing performance
  const listResults = await Promise.all([
    server['handleToolCall']('generate-wallet', {}),
    server['handleToolCall']('validate-mnemonic', { mnemonic: 'test' }),
    server['handleToolCall']('validate-address', { address: 'test' }),
    server['handleToolCall']('get-blockchain-status', {}),
    server['handleToolCall']('get-all-pools', {}),
  ].map(p => p.catch(e => ({ error: e.message }))));
  
  const schemaTime = Date.now() - schemaStart;
  
  console.log(`✅ Schema Validation Performance:`);
  console.log(`   Processed 5 different tool types`);
  console.log(`   Total Time: ${schemaTime}ms`);
  console.log(`   All tools responded (with data or validation errors)`);
  console.log('');
  
  console.log('🎯 PERFORMANCE SUMMARY');
  console.log('=====================');
  
  const overallScore = (
    (seqSuccess / sequentialTests.length) * 25 +
    (concSuccess / concurrentTests.length) * 25 +
    (walletSuccess / 10) * 25 +
    (concTime < seqTime ? 25 : 15) // Concurrency improvement
  );
  
  console.log(`Overall Performance Score: ${overallScore.toFixed(1)}/100`);
  
  if (overallScore >= 90) {
    console.log('🎉 EXCELLENT performance! Ready for production load.');
  } else if (overallScore >= 75) {
    console.log('✅ GOOD performance! Suitable for most use cases.');
  } else if (overallScore >= 60) {
    console.log('⚠️  FAIR performance! May need optimization.');
  } else {
    console.log('❌ POOR performance! Requires investigation.');
  }
  
  console.log('');
  console.log('📈 PERFORMANCE METRICS');
  console.log('======================');
  console.log(`Sequential Requests: ${avgSeqTime.toFixed(1)}ms average`);
  console.log(`Concurrent Requests: ${concTime}ms total (${concurrentTests.length} requests)`);
  console.log(`Wallet Generation: ${(walletTime / 10).toFixed(1)}ms per wallet`);
  console.log(`Concurrency Improvement: ${(seqTime / concTime).toFixed(1)}x faster`);
  console.log('');
  
  console.log('🚀 PRODUCTION READINESS');
  console.log('=======================');
  
  const productionReady = 
    avgSeqTime < 2000 && // Under 2 seconds average
    concSuccess >= concurrentTests.length * 0.8 && // 80% success rate
    walletSuccess >= 8 && // 80% wallet generation success
    concTime < seqTime; // Concurrency helps
  
  if (productionReady) {
    console.log('✅ READY FOR PRODUCTION');
    console.log('   • Fast response times');
    console.log('   • Good concurrency handling');
    console.log('   • Reliable wallet generation');
    console.log('   • Suitable for Claude Desktop integration');
  } else {
    console.log('⚠️  NEEDS OPTIMIZATION');
    console.log('   Review performance metrics above');
  }
}

performanceTest().catch(console.error);