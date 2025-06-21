#!/usr/bin/env node
/**
 * Osmosis MCP Server v2.0.0 - Modular Architecture
 *
 * A comprehensive Model Context Protocol server for the Osmosis blockchain
 * providing access to pools, staking, governance, DeFi features, and more.
 *
 * Features:
 * - 25+ blockchain query tools across 6 categories
 * - Modular architecture for easy maintenance and expansion
 * - Type-safe validation and error handling
 * - Network-agnostic configuration (mainnet/testnet)
 * - Comprehensive API coverage of Osmosis ecosystem
 */
import { OsmosisMCPServer } from './server.js';
import { toolCounts } from './tools/index.js';
async function main() {
    try {
        console.error('🌊 Initializing Osmosis MCP Server...');
        console.error(`📊 Loading ${toolCounts.total} tools across ${Object.keys(toolCounts).length - 1} categories:`);
        console.error(`   • Blockchain: ${toolCounts.blockchain} tools`);
        console.error(`   • Pools: ${toolCounts.pools} tools`);
        console.error(`   • Concentrated Liquidity: ${toolCounts.concentratedLiquidity} tools`);
        console.error(`   • Staking: ${toolCounts.staking} tools`);
        console.error(`   • Governance: ${toolCounts.governance} tools`);
        console.error(`   • DeFi: ${toolCounts.defi} tools`);
        const server = new OsmosisMCPServer();
        await server.start();
    }
    catch (error) {
        console.error('❌ Failed to start Osmosis MCP Server:', error);
        process.exit(1);
    }
}
main();
