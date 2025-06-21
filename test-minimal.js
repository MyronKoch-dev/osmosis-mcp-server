#!/usr/bin/env node
// Ultra-minimal MCP server test
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "test-minimal",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Test what methods are available
console.error("Server methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(server)));

// Try to add a simple tool
try {
  server.setRequestHandler('tools/list', async () => {
    return {
      tools: [{
        name: "test",
        description: "Simple test",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      }]
    };
  });
  
  server.setRequestHandler('tools/call', async (request) => {
    return {
      content: [{
        type: "text",
        text: "Hello from minimal test server!"
      }]
    };
  });

  console.error("Request handlers set successfully");
} catch (error) {
  console.error("Error setting request handlers:", error);
}

// Start server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Minimal test server started");
  } catch (error) {
    console.error("Failed to start:", error);
    process.exit(1);
  }
}

main();