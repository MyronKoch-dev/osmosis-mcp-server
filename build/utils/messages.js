// Message builders for Osmosis transactions
// These create properly formatted Cosmos SDK messages for transaction execution
// Bank messages
export function createMsgSend(fromAddress, toAddress, amount) {
    return {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: {
            fromAddress,
            toAddress,
            amount
        }
    };
}
export function createMsgMultiSend(inputs, outputs) {
    return {
        typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
        value: {
            inputs,
            outputs
        }
    };
}
// Staking messages  
export function createMsgDelegate(delegatorAddress, validatorAddress, amount) {
    return {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: {
            delegatorAddress,
            validatorAddress,
            amount
        }
    };
}
export function createMsgUndelegate(delegatorAddress, validatorAddress, amount) {
    return {
        typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
        value: {
            delegatorAddress,
            validatorAddress,
            amount
        }
    };
}
export function createMsgBeginRedelegate(delegatorAddress, validatorSrcAddress, validatorDstAddress, amount) {
    return {
        typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
        value: {
            delegatorAddress,
            validatorSrcAddress,
            validatorDstAddress,
            amount
        }
    };
}
export function createMsgWithdrawDelegatorReward(delegatorAddress, validatorAddress) {
    return {
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: {
            delegatorAddress,
            validatorAddress
        }
    };
}
// Governance messages
export function createMsgSubmitProposal(proposer, initialDeposit, title, description, content) {
    return {
        typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
        value: {
            content,
            initialDeposit,
            proposer,
            metadata: JSON.stringify({ title, description })
        }
    };
}
export function createMsgVote(proposalId, voter, option, metadata = "") {
    return {
        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
        value: {
            proposalId,
            voter,
            option,
            metadata
        }
    };
}
export function createMsgDeposit(proposalId, depositor, amount) {
    return {
        typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
        value: {
            proposalId,
            depositor,
            amount
        }
    };
}
// IBC messages
export function createMsgTransfer(sourcePort, sourceChannel, token, sender, receiver, timeoutHeight, timeoutTimestamp) {
    return {
        typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
        value: {
            sourcePort,
            sourceChannel,
            token,
            sender,
            receiver,
            timeoutHeight,
            timeoutTimestamp
        }
    };
}
// Lockup messages
export function createMsgLockTokens(owner, duration, coins) {
    return {
        typeUrl: "/osmosis.lockup.MsgLockTokens",
        value: {
            owner,
            duration,
            coins
        }
    };
}
export function createMsgBeginUnlocking(owner, id, coins = []) {
    return {
        typeUrl: "/osmosis.lockup.MsgBeginUnlocking",
        value: {
            owner,
            id,
            coins
        }
    };
}
export function createMsgBeginUnlockingAll(owner) {
    return {
        typeUrl: "/osmosis.lockup.MsgBeginUnlockingAll",
        value: {
            owner
        }
    };
}
// Pool messages
export function createMsgSwapExactAmountIn(sender, routes, tokenIn, tokenOutMinAmount) {
    return {
        typeUrl: "/osmosis.poolmanager.v1beta1.MsgSwapExactAmountIn",
        value: {
            sender,
            routes,
            tokenIn,
            tokenOutMinAmount
        }
    };
}
export function createMsgJoinPool(sender, poolId, shareOutAmount, tokenInMaxs) {
    return {
        typeUrl: "/osmosis.gamm.v1beta1.MsgJoinPool",
        value: {
            sender,
            poolId,
            shareOutAmount,
            tokenInMaxs
        }
    };
}
export function createMsgExitPool(sender, poolId, shareInAmount, tokenOutMins) {
    return {
        typeUrl: "/osmosis.gamm.v1beta1.MsgExitPool",
        value: {
            sender,
            poolId,
            shareInAmount,
            tokenOutMins
        }
    };
}
// Superfluid messages
export function createMsgSuperfluidDelegate(sender, lockId, valAddr) {
    return {
        typeUrl: "/osmosis.superfluid.MsgSuperfluidDelegate",
        value: {
            sender,
            lockId,
            valAddr
        }
    };
}
export function createMsgSuperfluidUndelegate(sender, lockId) {
    return {
        typeUrl: "/osmosis.superfluid.MsgSuperfluidUndelegate",
        value: {
            sender,
            lockId
        }
    };
}
// Token factory messages
export function createMsgCreateDenom(sender, subdenom) {
    return {
        typeUrl: "/osmosis.tokenfactory.v1beta1.MsgCreateDenom",
        value: {
            sender,
            subdenom
        }
    };
}
export function createMsgMint(sender, amount, mintToAddress) {
    return {
        typeUrl: "/osmosis.tokenfactory.v1beta1.MsgMint",
        value: {
            sender,
            amount,
            mintToAddress
        }
    };
}
export function createMsgBurn(sender, amount, burnFromAddress) {
    return {
        typeUrl: "/osmosis.tokenfactory.v1beta1.MsgBurn",
        value: {
            sender,
            amount,
            burnFromAddress
        }
    };
}
// Vote option mapping
export const VoteOption = {
    UNSPECIFIED: 0,
    YES: 1,
    ABSTAIN: 2,
    NO: 3,
    NO_WITH_VETO: 4
};
// Helper to get vote option number
export function getVoteOptionNumber(option) {
    switch (option.toLowerCase()) {
        case 'yes': return VoteOption.YES;
        case 'no': return VoteOption.NO;
        case 'abstain': return VoteOption.ABSTAIN;
        case 'no_with_veto': return VoteOption.NO_WITH_VETO;
        default: throw new Error(`Invalid vote option: ${option}`);
    }
}
