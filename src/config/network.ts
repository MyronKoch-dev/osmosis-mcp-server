// Osmosis Network Configuration
export interface NetworkConfig {
  chainId: string;
  rpcEndpoint: string;
  restEndpoint: string;
  defaultDenom: string;
  explorerUrl: string;
}

export const NETWORKS: Record<string, NetworkConfig> = {
  mainnet: {
    chainId: 'osmosis-1',
    rpcEndpoint: 'https://rpc.osmosis.zone',
    restEndpoint: 'https://lcd.osmosis.zone',
    defaultDenom: 'uosmo',
    explorerUrl: 'https://www.mintscan.io/osmosis'
  },
  testnet: {
    chainId: 'osmo-test-5',
    rpcEndpoint: 'https://rpc.testnet.osmosis.zone',
    restEndpoint: 'https://lcd.testnet.osmosis.zone', 
    defaultDenom: 'uosmo',
    explorerUrl: 'https://testnet.mintscan.io/osmosis-testnet'
  }
};

// Environment-based configuration - default to testnet for safety
const OSMOSIS_NETWORK = process.env.OSMOSIS_NETWORK || 'testnet';
export const NETWORK_CONFIG = NETWORKS[OSMOSIS_NETWORK];

if (!NETWORK_CONFIG) {
  throw new Error(`Unknown network: ${OSMOSIS_NETWORK}`);
}

// Export current network settings
export const {
  chainId: OSMOSIS_CHAIN_ID,
  rpcEndpoint: OSMOSIS_RPC_ENDPOINT,
  restEndpoint: OSMOSIS_REST_ENDPOINT,
  defaultDenom: OSMOSIS_DEFAULT_DENOM,
  explorerUrl: OSMOSIS_EXPLORER_URL
} = NETWORK_CONFIG;