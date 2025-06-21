// Governance Execution Tools - Direct transaction execution
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const governanceExecutionTools: Tool[] = [
  {
    name: "submit-proposal",
    description: "Submit a governance proposal to the Osmosis network",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase for signing the transaction"
        },
        title: {
          type: "string",
          description: "Proposal title"
        },
        description: {
          type: "string",
          description: "Detailed proposal description"
        },
        type: {
          type: "string",
          enum: ["text", "parameter_change", "software_upgrade", "cancel_software_upgrade", "community_pool_spend"],
          description: "Type of governance proposal"
        },
        initialDeposit: {
          type: "string",
          description: "Initial deposit amount in uosmo (e.g., '10000000')",
          default: "10000000"
        },
        changes: {
          type: "array",
          description: "Parameter changes (for parameter_change proposals)",
          items: {
            type: "object",
            properties: {
              subspace: { type: "string" },
              key: { type: "string" },
              value: { type: "string" }
            },
            required: ["subspace", "key", "value"]
          }
        },
        plan: {
          type: "object",
          description: "Upgrade plan (for software_upgrade proposals)",
          properties: {
            name: { type: "string" },
            height: { type: "number" },
            info: { type: "string" }
          }
        },
        recipient: {
          type: "string",
          description: "Recipient address (for community_pool_spend proposals)"
        },
        amount: {
          type: "array",
          description: "Amount to spend (for community_pool_spend proposals)",
          items: {
            type: "object",
            properties: {
              denom: { type: "string" },
              amount: { type: "string" }
            },
            required: ["denom", "amount"]
          }
        },
        gas: {
          type: "string",
          description: "Gas limit (default: auto-estimate)"
        },
        gasPrice: {
          type: "string",
          description: "Gas price (default: 0.025uosmo)"
        },
        memo: {
          type: "string",
          description: "Transaction memo"
        }
      },
      required: ["mnemonic", "title", "description", "type"]
    }
  },
  {
    name: "vote-proposal",
    description: "Vote on a governance proposal",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase for signing the transaction"
        },
        proposalId: {
          type: "string",
          description: "ID of the proposal to vote on"
        },
        option: {
          type: "string",
          enum: ["yes", "no", "abstain", "no_with_veto"],
          description: "Vote option"
        },
        metadata: {
          type: "string",
          description: "Optional vote metadata/reasoning"
        },
        gas: {
          type: "string",
          description: "Gas limit (default: auto-estimate)"
        },
        gasPrice: {
          type: "string",
          description: "Gas price (default: 0.025uosmo)"
        },
        memo: {
          type: "string",
          description: "Transaction memo"
        }
      },
      required: ["mnemonic", "proposalId", "option"]
    }
  },
  {
    name: "deposit-proposal",
    description: "Deposit tokens to a governance proposal",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase for signing the transaction"
        },
        proposalId: {
          type: "string",
          description: "ID of the proposal to deposit to"
        },
        amount: {
          type: "string",
          description: "Deposit amount in uosmo (e.g., '1000000')"
        },
        denom: {
          type: "string",
          description: "Token denomination",
          default: "uosmo"
        },
        gas: {
          type: "string",
          description: "Gas limit (default: auto-estimate)"
        },
        gasPrice: {
          type: "string",
          description: "Gas price (default: 0.025uosmo)"
        },
        memo: {
          type: "string",
          description: "Transaction memo"
        }
      },
      required: ["mnemonic", "proposalId", "amount"]
    }
  },
  {
    name: "claim-community-pool",
    description: "Claim rewards from the community pool (validator commission)",
    inputSchema: {
      type: "object",
      properties: {
        mnemonic: {
          type: "string",
          description: "BIP-39 mnemonic phrase for signing the transaction"
        },
        validatorAddress: {
          type: "string",
          description: "Validator address to claim commission from"
        },
        gas: {
          type: "string",
          description: "Gas limit (default: auto-estimate)"
        },
        gasPrice: {
          type: "string",
          description: "Gas price (default: 0.025uosmo)"
        },
        memo: {
          type: "string",
          description: "Transaction memo"
        }
      },
      required: ["mnemonic", "validatorAddress"]
    }
  }
];