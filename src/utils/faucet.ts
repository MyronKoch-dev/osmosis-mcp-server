// Osmosis Testnet Faucet Utilities
import { OSMOSIS_CHAIN_ID, OSMOSIS_REST_ENDPOINT } from '../config/network.js';

export interface FaucetResult {
  success: boolean;
  txHash?: string;
  error?: string;
  message: string;
}

/**
 * Request tokens from Osmosis testnet faucet
 */
export async function requestTestnetTokens(address: string, amount: string = "10000000"): Promise<FaucetResult> {
  // Check if we're on testnet
  if (OSMOSIS_CHAIN_ID !== 'osmo-test-5') {
    return {
      success: false,
      error: 'Faucet only available on testnet',
      message: 'Current network is not testnet. Set OSMOSIS_NETWORK=testnet to use faucet.'
    };
  }

  try {
    // Osmosis testnet faucet endpoint
    const faucetUrl = 'https://faucet.testnet.osmosis.zone';
    
    const response = await fetch(`${faucetUrl}/credit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: address,
        denom: 'uosmo'
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        txHash: data.txhash || 'N/A',
        message: `Successfully requested ${amount} uosmo from testnet faucet`
      };
    } else {
      const errorText = await response.text();
      return {
        success: false,
        error: `Faucet request failed: ${response.status}`,
        message: `Faucet returned error: ${errorText}`
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to connect to testnet faucet'
    };
  }
}

/**
 * Get testnet token sources and instructions
 */
export function getTestnetTokenSources(address?: string): {
  sources: Array<{
    name: string;
    url: string;
    description: string;
    instructions: string;
  }>;
  generalInstructions: string[];
} {
  const sources = [
    {
      name: "Official Osmosis Testnet Faucet",
      url: "https://faucet.testnet.osmosis.zone",
      description: "Primary faucet for OSMO testnet tokens",
      instructions: address 
        ? `Visit the faucet and enter your address: ${address}`
        : "Visit the faucet and enter your Osmosis testnet address"
    },
    {
      name: "Cosmos Testnet Faucet",
      url: "https://faucet.cosmos.network",
      description: "Multi-chain faucet including Osmosis testnet",
      instructions: "Select Osmosis testnet and request tokens"
    },
    {
      name: "Community Discord Faucet",
      url: "https://discord.gg/osmosis",
      description: "Request tokens via Discord bot",
      instructions: "Join the Discord and use the !faucet command in testnet channels"
    }
  ];

  const generalInstructions = [
    "1. Generate or use an existing Osmosis testnet address",
    "2. Visit one of the faucet sources listed above",
    "3. Request testnet tokens (usually 1-10 OSMO)",
    "4. Wait for the transaction to confirm (1-2 minutes)",
    "5. Check your balance using get-account-balance",
    "6. Start testing execution tools with your funded wallet"
  ];

  return { sources, generalInstructions };
}

/**
 * Check current network and provide testnet status
 */
export function getTestnetStatus(): {
  isTestnet: boolean;
  chainId: string;
  network: string;
  endpoints: {
    rpc: string;
    rest: string;
  };
  faucetAvailable: boolean;
} {
  const isTestnet = OSMOSIS_CHAIN_ID === 'osmo-test-5';
  
  return {
    isTestnet,
    chainId: OSMOSIS_CHAIN_ID,
    network: isTestnet ? 'testnet' : 'mainnet',
    endpoints: {
      rpc: process.env.OSMOSIS_RPC_ENDPOINT || 'https://rpc.testnet.osmosis.zone',
      rest: OSMOSIS_REST_ENDPOINT
    },
    faucetAvailable: isTestnet
  };
}