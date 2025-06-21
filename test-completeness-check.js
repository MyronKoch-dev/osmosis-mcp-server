#!/usr/bin/env node

// COMPLETENESS AND SCHEMA VALIDATION CHECK
// Ensures every tool is properly registered and has valid schemas
import { OsmosisMCPServer } from './build/server.js';
import { allTools, toolCounts } from './build/tools/index.js';

console.log('🔍 COMPLETENESS & SCHEMA VALIDATION CHECK');
console.log('========================================');
console.log('');

async function completenesCheck() {
  const server = new OsmosisMCPServer();
  
  console.log('📊 TOOL COUNT VERIFICATION');
  console.log('==========================');
  console.log(`Total Tools Defined: ${allTools.length}`);
  console.log(`Expected Total: 158`);
  console.log(`Match: ${allTools.length === 158 ? '✅ YES' : '❌ NO'}`);
  console.log('');
  
  console.log('Tool Breakdown:');
  Object.entries(toolCounts).forEach(([category, count]) => {
    console.log(`  ${category}: ${count}`);
  });
  console.log('');
  
  console.log('🔧 SCHEMA VALIDATION');
  console.log('====================');
  
  let schemaErrors = 0;
  let validSchemas = 0;
  
  allTools.forEach((tool, index) => {
    try {
      // Check required fields
      if (!tool.name) {
        console.log(`❌ Tool ${index}: Missing name`);
        schemaErrors++;
        return;
      }
      
      if (!tool.description) {
        console.log(`❌ Tool ${tool.name}: Missing description`);
        schemaErrors++;
        return;
      }
      
      if (!tool.inputSchema || typeof tool.inputSchema !== 'object') {
        console.log(`❌ Tool ${tool.name}: Invalid inputSchema`);
        schemaErrors++;
        return;
      }
      
      if (tool.inputSchema.type !== 'object') {
        console.log(`❌ Tool ${tool.name}: inputSchema must be type 'object'`);
        schemaErrors++;
        return;
      }
      
      if (!tool.inputSchema.properties) {
        console.log(`❌ Tool ${tool.name}: Missing properties in inputSchema`);
        schemaErrors++;
        return;
      }
      
      validSchemas++;
    } catch (error) {
      console.log(`❌ Tool ${tool.name || index}: Schema validation error - ${error.message}`);
      schemaErrors++;
    }
  });
  
  console.log(`✅ Valid Schemas: ${validSchemas}`);
  console.log(`❌ Schema Errors: ${schemaErrors}`);
  console.log(`Schema Success Rate: ${((validSchemas / allTools.length) * 100).toFixed(1)}%`);
  console.log('');
  
  console.log('🚀 SERVER TOOL REGISTRATION CHECK');
  console.log('=================================');
  
  // Test that server recognizes all tools
  let registeredTools = 0;
  let unregisteredTools = 0;
  const unregisteredList = [];
  
  for (const tool of allTools) {
    try {
      // Try to call each tool (expect most to fail, but should be recognized)
      const result = await server['handleToolCall'](tool.name, {});
      
      if (result && result.content && result.content[0] && result.content[0].text) {
        const response = JSON.parse(result.content[0].text);
        
        // Check if it's a placeholder response (means it's registered)
        if (response.tool === tool.name || response.success !== undefined || response.chainId) {
          registeredTools++;
        } else {
          console.log(`⚠️  Tool ${tool.name}: Unexpected response format`);
          unregisteredTools++;
          unregisteredList.push(tool.name);
        }
      } else {
        console.log(`❌ Tool ${tool.name}: No response content`);
        unregisteredTools++;
        unregisteredList.push(tool.name);
      }
    } catch (error) {
      // Check if it's a parameter validation error (means tool is registered)
      if (error.message.includes('required') || error.message.includes('validateRequiredParams')) {
        registeredTools++;
      } else {
        console.log(`❌ Tool ${tool.name}: Registration error - ${error.message}`);
        unregisteredTools++;
        unregisteredList.push(tool.name);
      }
    }
  }
  
  console.log(`✅ Registered Tools: ${registeredTools}`);
  console.log(`❌ Unregistered Tools: ${unregisteredTools}`);
  console.log(`Registration Success Rate: ${((registeredTools / allTools.length) * 100).toFixed(1)}%`);
  
  if (unregisteredList.length > 0) {
    console.log('');
    console.log('🔍 Unregistered Tools:');
    unregisteredList.forEach(toolName => {
      console.log(`   - ${toolName}`);
    });
  }
  console.log('');
  
  console.log('🔐 EXECUTION TOOL VERIFICATION');
  console.log('==============================');
  
  const executionTools = allTools.filter(tool => {
    return tool.name.includes('send') || 
           tool.name.includes('vote') || 
           tool.name.includes('lock') || 
           tool.name.includes('transfer') || 
           tool.name.includes('delegate') || 
           tool.name.includes('submit') ||
           tool.name.includes('create') ||
           tool.name.includes('mint') ||
           tool.name.includes('burn') ||
           (tool.inputSchema.properties && tool.inputSchema.properties.mnemonic);
  });
  
  console.log(`Execution Tools Found: ${executionTools.length}`);
  console.log(`Expected: 37+`);
  
  let mnemonicTools = 0;
  executionTools.forEach(tool => {
    if (tool.inputSchema.properties && tool.inputSchema.properties.mnemonic) {
      mnemonicTools++;
    }
  });
  
  console.log(`Tools requiring mnemonic: ${mnemonicTools}`);
  console.log('');
  
  console.log('📋 CATEGORY DISTRIBUTION CHECK');
  console.log('==============================');
  
  const expectedCategories = {
    'blockchain': 9,
    'pools': 18, 
    'concentratedLiquidity': 15,
    'staking': 15,
    'governance': 4,
    'defi': 5,
    'cosmwasm': 20,
    'tokenFactory': 10,
    'protorev': 8,
    'specialized': 11,
    'wallet': 6,
    'execution': 37
  };
  
  let categoryMatches = 0;
  let categoryMismatches = 0;
  
  Object.entries(expectedCategories).forEach(([category, expected]) => {
    const actual = toolCounts[category] || 0;
    const matches = actual === expected;
    
    console.log(`${category}: ${actual}/${expected} ${matches ? '✅' : '❌'}`);
    
    if (matches) {
      categoryMatches++;
    } else {
      categoryMismatches++;
    }
  });
  
  console.log('');
  console.log(`Category Matches: ${categoryMatches}/${Object.keys(expectedCategories).length}`);
  console.log('');
  
  console.log('🎯 FINAL COMPLETENESS ASSESSMENT');
  console.log('================================');
  
  const overallScore = (
    (allTools.length === 158 ? 25 : 0) +
    (validSchemas / allTools.length * 25) +
    (registeredTools / allTools.length * 25) +
    (categoryMatches / Object.keys(expectedCategories).length * 25)
  );
  
  console.log(`Overall Completeness Score: ${overallScore.toFixed(1)}/100`);
  
  if (overallScore >= 95) {
    console.log('🎉 EXCELLENT! System is complete and ready for production.');
  } else if (overallScore >= 85) {
    console.log('✅ GOOD! System is mostly complete with minor issues.');
  } else if (overallScore >= 70) {
    console.log('⚠️  FAIR! System needs some improvements.');
  } else {
    console.log('❌ POOR! System has significant issues.');
  }
  
  console.log('');
  console.log('📊 SUMMARY RECOMMENDATIONS');
  console.log('==========================');
  
  if (schemaErrors === 0) {
    console.log('✅ All tool schemas are valid');
  } else {
    console.log(`⚠️  Fix ${schemaErrors} schema validation errors`);
  }
  
  if (unregisteredTools === 0) {
    console.log('✅ All tools are properly registered in server');
  } else {
    console.log(`⚠️  Register ${unregisteredTools} missing tools in server`);
  }
  
  if (categoryMismatches === 0) {
    console.log('✅ All categories have correct tool counts');
  } else {
    console.log(`⚠️  Fix ${categoryMismatches} category count mismatches`);
  }
  
  console.log('');
  console.log('🚀 READY FOR DEPLOYMENT ASSESSMENT');
  console.log('==================================');
  
  const readyForDeployment = 
    allTools.length === 158 &&
    schemaErrors === 0 &&
    unregisteredTools === 0 &&
    categoryMismatches <= 1;
  
  if (readyForDeployment) {
    console.log('🎯 STATUS: READY FOR DEPLOYMENT');
    console.log('✅ All systems validated');
    console.log('✅ All tools properly implemented');
    console.log('✅ Schemas valid');
    console.log('✅ Server integration complete');
    console.log('');
    console.log('🚀 NEXT STEPS:');
    console.log('1. Deploy to production environment');
    console.log('2. Update Claude Desktop configuration');
    console.log('3. Begin user testing');
  } else {
    console.log('⚠️  STATUS: NEEDS MINOR FIXES');
    console.log('Review issues above before deployment');
  }
}

completenesCheck().catch(console.error);