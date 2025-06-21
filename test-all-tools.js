#!/usr/bin/env node

// Comprehensive test script for all 115 Osmosis MCP Server tools
import { allTools, toolCounts } from './build/tools/index.js';

console.log('🧪 COMPREHENSIVE OSMOSIS MCP SERVER TEST');
console.log('='.repeat(50));
console.log(`Testing all ${allTools.length} tools across ${Object.keys(toolCounts).length - 1} categories`);
console.log('');

// Test results tracking
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  categories: {}
};

// Test a single tool's schema validity
function testTool(tool, category) {
  results.total++;
  
  try {
    // Check required properties
    if (!tool.name) throw new Error('Missing name');
    if (!tool.description) throw new Error('Missing description');
    if (!tool.inputSchema) throw new Error('Missing inputSchema');
    if (!tool.inputSchema.type) throw new Error('Missing inputSchema.type');
    if (!tool.inputSchema.properties) throw new Error('Missing inputSchema.properties');
    if (!tool.inputSchema.required) throw new Error('Missing inputSchema.required');
    
    // Validate name format (should be kebab-case)
    if (!/^[a-z]+(-[a-z]+)*$/.test(tool.name)) {
      throw new Error('Invalid name format - should be kebab-case');
    }
    
    // Validate description
    if (tool.description.length < 10) {
      throw new Error('Description too short');
    }
    
    // Validate input schema structure
    if (tool.inputSchema.type !== 'object') {
      throw new Error('inputSchema.type must be "object"');
    }
    
    // Check that required fields exist in properties
    if (tool.inputSchema.required) {
      for (const requiredField of tool.inputSchema.required) {
        if (!tool.inputSchema.properties[requiredField]) {
          throw new Error(`Required field "${requiredField}" not found in properties`);
        }
      }
    }
    
    console.log(`  ✅ ${tool.name}`);
    results.passed++;
    results.categories[category].passed++;
    
  } catch (error) {
    console.log(`  ❌ ${tool.name} - ${error.message}`);
    results.failed++;
    results.categories[category].failed++;
  }
}

// Test tools by category
async function testAllTools() {
  // Import all tool categories
  const { 
    blockchainTools, 
    poolTools, 
    concentratedLiquidityTools, 
    stakingTools, 
    governanceTools, 
    defiTools,
    cosmwasmTools,
    tokenFactoryTools,
    protorevTools,
    specializedTools
  } = await import('./build/tools/index.js');
  
  const categories = [
    { name: '📊 Blockchain Tools', tools: blockchainTools, expected: 9 },
    { name: '🏊 Pool Tools', tools: poolTools, expected: 18 },
    { name: '🎯 Concentrated Liquidity Tools', tools: concentratedLiquidityTools, expected: 15 },
    { name: '🥩 Staking Tools', tools: stakingTools, expected: 15 },
    { name: '🗳️ Governance Tools', tools: governanceTools, expected: 4 },
    { name: '💰 DeFi Tools', tools: defiTools, expected: 5 },
    { name: '📜 CosmWasm Tools', tools: cosmwasmTools, expected: 20 },
    { name: '🏭 Token Factory Tools', tools: tokenFactoryTools, expected: 10 },
    { name: '⚡ ProtoRev Tools', tools: protorevTools, expected: 8 },
    { name: '🔧 Specialized Tools', tools: specializedTools, expected: 11 }
  ];
  
  for (const category of categories) {
    console.log(`\n${category.name} (${category.tools.length}/${category.expected} tools):`);
    
    // Initialize category results
    results.categories[category.name] = { passed: 0, failed: 0, total: category.tools.length };
    
    // Check tool count
    if (category.tools.length !== category.expected) {
      console.log(`  ⚠️  Expected ${category.expected} tools, found ${category.tools.length}`);
    }
    
    // Test each tool in the category
    for (const tool of category.tools) {
      testTool(tool, category.name);
    }
  }
}

// Test for duplicate tool names
function testForDuplicates() {
  console.log('\n🔍 Checking for duplicate tool names:');
  const toolNames = new Set();
  const duplicates = [];
  
  for (const tool of allTools) {
    if (toolNames.has(tool.name)) {
      duplicates.push(tool.name);
    } else {
      toolNames.add(tool.name);
    }
  }
  
  if (duplicates.length > 0) {
    console.log(`  ❌ Found ${duplicates.length} duplicate tool names: ${duplicates.join(', ')}`);
  } else {
    console.log('  ✅ No duplicate tool names found');
  }
}

// Test tool name conventions
function testNamingConventions() {
  console.log('\n📝 Checking naming conventions:');
  const conventions = {
    'get-': 'Query/retrieval operations',
    'prepare-': 'Transaction preparation operations',
    'estimate-': 'Estimation operations',
    'validate-': 'Validation operations',
    'query-': 'Smart contract queries'
  };
  
  const stats = {};
  for (const prefix of Object.keys(conventions)) {
    stats[prefix] = allTools.filter(tool => tool.name.startsWith(prefix)).length;
  }
  
  console.log('  Tool name distribution:');
  for (const [prefix, count] of Object.entries(stats)) {
    console.log(`    ${prefix}* : ${count} tools (${conventions[prefix]})`);
  }
}

// Main test execution
async function runTests() {
  try {
    console.log(`Expected total: 115 tools`);
    console.log(`Actual total: ${allTools.length} tools`);
    
    if (allTools.length !== 115) {
      console.log(`⚠️  Tool count mismatch!`);
    }
    
    await testAllTools();
    testForDuplicates();
    testNamingConventions();
    
    // Print final results
    console.log('\n📊 TEST RESULTS SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total tools tested: ${results.total}`);
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`Success rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);
    
    console.log('\nResults by category:');
    for (const [category, stats] of Object.entries(results.categories)) {
      const rate = ((stats.passed / stats.total) * 100).toFixed(1);
      console.log(`  ${category}: ${stats.passed}/${stats.total} (${rate}%)`);
    }
    
    if (results.failed === 0) {
      console.log('\n🎉 ALL TESTS PASSED! The MCP server is ready for production.');
    } else {
      console.log(`\n⚠️  ${results.failed} tests failed. Please review and fix the issues above.`);
      process.exit(1);
    }
    
  } catch (error) {
    console.error('Test execution failed:', error);
    process.exit(1);
  }
}

// Run the tests
runTests();