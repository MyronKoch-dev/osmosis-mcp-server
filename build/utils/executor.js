// Transaction Execution Utilities for Osmosis
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient, GasPrice, calculateFee } from '@cosmjs/stargate';
import { OSMOSIS_RPC_ENDPOINT } from '../config/network.js';
/**
 * Create a signing client from mnemonic
 */
export async function createSigningClient(mnemonic) {
    try {
        // Create wallet from mnemonic
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
            prefix: 'osmo'
        });
        // Get first account
        const [firstAccount] = await wallet.getAccounts();
        // Create signing client
        const client = await SigningStargateClient.connectWithSigner(OSMOSIS_RPC_ENDPOINT, wallet, {
            gasPrice: GasPrice.fromString('0.025uosmo'),
        });
        return {
            client,
            address: firstAccount.address
        };
    }
    catch (error) {
        throw new Error(`Failed to create signing client: ${error.message}`);
    }
}
/**
 * Execute a transaction with automatic gas estimation
 */
export async function executeTransaction(mnemonic, messages, options = {}) {
    try {
        const { client, address } = await createSigningClient(mnemonic);
        // Fill in sender addresses in messages
        const processedMessages = messages.map(msg => {
            const value = { ...msg.value };
            // Replace empty sender/address fields with actual address
            if ('sender' in value && (!value.sender || value.sender === '')) {
                value.sender = address;
            }
            if ('fromAddress' in value && (!value.fromAddress || value.fromAddress === '')) {
                value.fromAddress = address;
            }
            if ('delegatorAddress' in value && (!value.delegatorAddress || value.delegatorAddress === '')) {
                value.delegatorAddress = address;
            }
            if ('voter' in value && (!value.voter || value.voter === '')) {
                value.voter = address;
            }
            if ('depositor' in value && (!value.depositor || value.depositor === '')) {
                value.depositor = address;
            }
            if ('proposer' in value && (!value.proposer || value.proposer === '')) {
                value.proposer = address;
            }
            if ('owner' in value && (!value.owner || value.owner === '')) {
                value.owner = address;
            }
            return {
                ...msg,
                value
            };
        });
        // Set default options
        const memo = options.memo || '';
        const gasPrice = GasPrice.fromString(options.gasPrice || '0.025uosmo');
        // Calculate fee
        let fee;
        if (options.fee) {
            fee = {
                amount: options.fee,
                gas: options.gas || '200000'
            };
        }
        else {
            // Auto-estimate gas if not provided
            const gasEstimate = options.gas ? parseInt(options.gas) : 200000;
            fee = calculateFee(gasEstimate, gasPrice);
        }
        // Broadcast transaction
        const result = await client.signAndBroadcast(address, processedMessages, fee, memo);
        // Check if transaction was successful
        if (result.code !== 0) {
            return {
                success: false,
                error: `Transaction failed with code ${result.code}: ${result.rawLog}`,
                txHash: result.transactionHash,
                gasUsed: result.gasUsed?.toString(),
                gasWanted: result.gasWanted?.toString(),
                height: result.height
            };
        }
        return {
            success: true,
            txHash: result.transactionHash,
            gasUsed: result.gasUsed?.toString(),
            gasWanted: result.gasWanted?.toString(),
            height: result.height
        };
    }
    catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
/**
 * Validate mnemonic before execution
 */
export function validateMnemonicForExecution(mnemonic) {
    if (!mnemonic || typeof mnemonic !== 'string') {
        return false;
    }
    const words = mnemonic.trim().split(/\s+/);
    return [12, 15, 18, 21, 24].includes(words.length);
}
/**
 * Get account info for execution validation
 */
export async function getAccountInfo(mnemonic) {
    try {
        const { client, address } = await createSigningClient(mnemonic);
        const account = await client.getAccount(address);
        if (!account) {
            throw new Error('Account not found on chain');
        }
        return {
            address,
            accountNumber: account.accountNumber,
            sequence: account.sequence
        };
    }
    catch (error) {
        throw new Error(`Failed to get account info: ${error.message}`);
    }
}
/**
 * Check account balance before execution
 */
export async function checkBalance(mnemonic, requiredAmount, denom) {
    try {
        const { client, address } = await createSigningClient(mnemonic);
        const balances = await client.getAllBalances(address);
        let hasRequiredBalance = true;
        if (requiredAmount && denom) {
            const balance = balances.find(b => b.denom === denom);
            const available = balance ? parseInt(balance.amount) : 0;
            const required = parseInt(requiredAmount);
            hasRequiredBalance = available >= required;
        }
        return {
            address,
            balances: balances.map(b => ({ denom: b.denom, amount: b.amount })),
            hasRequiredBalance
        };
    }
    catch (error) {
        throw new Error(`Failed to check balance: ${error.message}`);
    }
}
/**
 * Simulate transaction before execution
 */
export async function simulateTransaction(mnemonic, messages, memo = '') {
    try {
        const { client, address } = await createSigningClient(mnemonic);
        // Use a minimal fee for simulation
        const gasPrice = GasPrice.fromString('0.025uosmo');
        const fee = calculateFee(200000, gasPrice);
        const result = await client.simulate(address, messages, memo);
        return {
            gasUsed: result,
            gasWanted: Math.ceil(result * 1.3), // Add 30% buffer
            success: true
        };
    }
    catch (error) {
        return {
            gasUsed: 0,
            gasWanted: 0,
            success: false,
            error: error.message
        };
    }
}
