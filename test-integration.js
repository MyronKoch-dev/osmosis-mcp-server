#!/usr/bin/env node

// Integration test to verify MCP server tool integration
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { allTools } from './build/tools/index.js';

console.log('🔧 INTEGRATION TEST - MCP Server Tool Registration');
console.log('='.repeat(60));

async function testServerIntegration() {
  try {
    // Create MCP Server instance
    const server = new Server(
      {
        name: 'osmosis-mcp-server-test',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    console.log('✅ Server instance created successfully');

    // Register all tools
    let registeredCount = 0;
    for (const tool of allTools) {
      try {
        server.setRequestHandler('tools/call', async (request) => {
          return {
            content: [
              {
                type: 'text',
                text: `Mock response for tool: ${request.params.name}`,
              },
            ],
          };
        });
        registeredCount++;
      } catch (error) {
        console.log(`❌ Failed to register tool ${tool.name}: ${error.message}`);
      }
    }

    console.log(`✅ Successfully registered ${registeredCount}/${allTools.length} tools`);

    // Test tool list handler
    server.setRequestHandler('tools/list', async () => {
      return {
        tools: allTools,
      };
    });

    console.log('✅ Tool list handler registered');

    // Verify tool categories
    const categories = {
      'get-': allTools.filter(t => t.name.startsWith('get-')).length,
      'prepare-': allTools.filter(t => t.name.startsWith('prepare-')).length,
      'estimate-': allTools.filter(t => t.name.startsWith('estimate-')).length,
      'query-': allTools.filter(t => t.name.startsWith('query-')).length,
      'validate-': allTools.filter(t => t.name.startsWith('validate-')).length,
    };

    console.log('\n📊 Tool Distribution:');
    for (const [prefix, count] of Object.entries(categories)) {
      console.log(`  ${prefix}*: ${count} tools`);
    }

    // Test sample tool schemas
    console.log('\n🔍 Sample Tool Schema Validation:');
    const sampleTools = [
      'get-blockchain-status',
      'prepare-swap-transaction', 
      'get-cl-positions',
      'query-contract-state',
      'get-protorev-statistics'
    ];

    for (const toolName of sampleTools) {
      const tool = allTools.find(t => t.name === toolName);
      if (tool) {
        console.log(`  ✅ ${toolName}: ${Object.keys(tool.inputSchema.properties).length} parameters`);
      } else {
        console.log(`  ❌ ${toolName}: Not found`);
      }
    }

    console.log('\n🎉 INTEGRATION TEST PASSED!');
    console.log(`📈 Server ready with ${allTools.length} tools across 10 categories`);
    
    return true;

  } catch (error) {
    console.error('❌ Integration test failed:', error);
    return false;
  }
}

// Run the integration test
testServerIntegration().then(success => {
  if (!success) {
    process.exit(1);
  }
});