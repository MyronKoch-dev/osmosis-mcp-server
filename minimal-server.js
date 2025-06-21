#!/usr/bin/env node
// Minimal working MCP server for testing
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "osmosis-test",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {}
  }
});

// Single test tool
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [{
      name: "test-osmosis",
      description: "Simple test tool",
      inputSchema: {
        type: "object",
        properties: {},
        required: []
      }
    }]
  };
});

server.setRequestHandler('tools/call', async (request) => {
  const { name } = request.params;
  
  if (name === "test-osmosis") {
    return {
      content: [{
        type: "text",
        text: "✅ Osmosis MCP server is working!"
      }]
    };
  }
  
  throw new Error(`Unknown tool: ${name}`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Minimal Osmosis MCP Server started");
}

main().catch((error) => {
  console.error("Server failed:", error);
  process.exit(1);
});