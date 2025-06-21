// Wallet utility functions for Osmosis MCP server
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { fromBech32 } from "@cosmjs/encoding";
import { EnglishMnemonic, Bip39 } from "@cosmjs/crypto";
/**
 * Generates a new wallet with mnemonic phrase
 */
export async function generateWallet(wordCount = 24, prefix = "osmo") {
    try {
        const validWordCounts = [12, 15, 18, 21, 24];
        const validWordCount = validWordCounts.includes(wordCount) ? wordCount : 24;
        const wallet = await DirectSecp256k1HdWallet.generate(validWordCount, {
            prefix: prefix,
        });
        const [firstAccount] = await wallet.getAccounts();
        return {
            address: firstAccount.address,
            publicKey: Buffer.from(firstAccount.pubkey).toString('hex'),
            mnemonic: wallet.mnemonic
        };
    }
    catch (error) {
        throw new Error(`Failed to generate wallet: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
/**
 * Restores a wallet from mnemonic phrase
 */
export async function restoreWalletFromMnemonic(mnemonic, prefix = "osmo", accountIndex = 0) {
    try {
        // Validate mnemonic first
        if (!validateMnemonic(mnemonic)) {
            throw new Error('Invalid mnemonic phrase');
        }
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
            prefix: prefix
        });
        const [firstAccount] = await wallet.getAccounts();
        return {
            address: firstAccount.address,
            publicKey: Buffer.from(firstAccount.pubkey).toString('hex')
            // Don't return mnemonic for security
        };
    }
    catch (error) {
        throw new Error(`Failed to restore wallet: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
/**
 * Gets address from mnemonic without exposing private key
 */
export async function getAddressFromMnemonic(mnemonic, prefix = "osmo", accountIndex = 0) {
    const walletInfo = await restoreWalletFromMnemonic(mnemonic, prefix, accountIndex);
    return walletInfo.address;
}
/**
 * Validates a BIP-39 mnemonic phrase
 */
export function validateMnemonic(mnemonic) {
    try {
        const mnemonicChecked = new EnglishMnemonic(mnemonic);
        return Bip39.decode(mnemonicChecked).length > 0;
    }
    catch {
        return false;
    }
}
/**
 * Validates an address for a given prefix
 */
export function validateAddress(address, expectedPrefix = "osmo") {
    try {
        const { prefix } = fromBech32(address);
        return prefix === expectedPrefix;
    }
    catch {
        return false;
    }
}
/**
 * Derives address from public key
 */
export async function deriveAddressFromPubkey(publicKeyHex, prefix = "osmo") {
    try {
        const publicKey = Buffer.from(publicKeyHex, 'hex');
        if (publicKey.length !== 33) {
            throw new Error('Invalid public key length. Expected 33 bytes for compressed secp256k1 public key');
        }
        // For now, return a placeholder - proper implementation would require additional crypto operations
        // This would need proper hash160 operation on the public key
        throw new Error('Address derivation from public key not yet implemented');
    }
    catch (error) {
        throw new Error(`Failed to derive address: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
/**
 * Generates a deterministic wallet for testing (INSECURE - for development only)
 */
export async function generateTestWallet(seed = "test", prefix = "osmo") {
    // Create deterministic entropy from seed (INSECURE)
    const testMnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
    console.warn('⚠️ WARNING: generateTestWallet creates deterministic wallets for testing only. Never use in production!');
    return await restoreWalletFromMnemonic(testMnemonic, prefix);
}
