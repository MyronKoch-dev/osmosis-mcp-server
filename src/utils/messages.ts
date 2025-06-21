// Message builders for Osmosis transactions
// These create properly formatted Cosmos SDK messages for transaction execution

export interface Coin {
  denom: string;
  amount: string;
}

// Bank messages
export function createMsgSend(fromAddress: string, toAddress: string, amount: Coin[]) {
  return {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: {
      fromAddress,
      toAddress,
      amount
    }
  };
}

export function createMsgMultiSend(inputs: Array<{address: string, coins: Coin[]}>, outputs: Array<{address: string, coins: Coin[]}>) {
  return {
    typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
    value: {
      inputs,
      outputs
    }
  };
}

// Staking messages  
export function createMsgDelegate(delegatorAddress: string, validatorAddress: string, amount: Coin) {
  return {
    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
    value: {
      delegatorAddress,
      validatorAddress,
      amount
    }
  };
}

export function createMsgUndelegate(delegatorAddress: string, validatorAddress: string, amount: Coin) {
  return {
    typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
    value: {
      delegatorAddress,
      validatorAddress,
      amount
    }
  };
}

export function createMsgBeginRedelegate(delegatorAddress: string, validatorSrcAddress: string, validatorDstAddress: string, amount: Coin) {
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

export function createMsgWithdrawDelegatorReward(delegatorAddress: string, validatorAddress: string) {
  return {
    typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
    value: {
      delegatorAddress,
      validatorAddress
    }
  };
}

// Governance messages
export function createMsgSubmitProposal(proposer: string, initialDeposit: Coin[], title: string, description: string, content: any) {
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

export function createMsgVote(proposalId: string, voter: string, option: number, metadata: string = "") {
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

export function createMsgDeposit(proposalId: string, depositor: string, amount: Coin[]) {
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
export function createMsgTransfer(sourcePort: string, sourceChannel: string, token: Coin, sender: string, receiver: string, timeoutHeight: any, timeoutTimestamp: string) {
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
export function createMsgLockTokens(owner: string, duration: string, coins: Coin[]) {
  return {
    typeUrl: "/osmosis.lockup.MsgLockTokens",
    value: {
      owner,
      duration,
      coins
    }
  };
}

export function createMsgBeginUnlocking(owner: string, id: string, coins: Coin[] = []) {
  return {
    typeUrl: "/osmosis.lockup.MsgBeginUnlocking",
    value: {
      owner,
      id,
      coins
    }
  };
}

export function createMsgBeginUnlockingAll(owner: string) {
  return {
    typeUrl: "/osmosis.lockup.MsgBeginUnlockingAll",
    value: {
      owner
    }
  };
}

// Pool messages
export function createMsgSwapExactAmountIn(sender: string, routes: any[], tokenIn: Coin, tokenOutMinAmount: string) {
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

export function createMsgJoinPool(sender: string, poolId: string, shareOutAmount: string, tokenInMaxs: Coin[]) {
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

export function createMsgExitPool(sender: string, poolId: string, shareInAmount: string, tokenOutMins: Coin[]) {
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
export function createMsgSuperfluidDelegate(sender: string, lockId: string, valAddr: string) {
  return {
    typeUrl: "/osmosis.superfluid.MsgSuperfluidDelegate",
    value: {
      sender,
      lockId,
      valAddr
    }
  };
}

export function createMsgSuperfluidUndelegate(sender: string, lockId: string) {
  return {
    typeUrl: "/osmosis.superfluid.MsgSuperfluidUndelegate",
    value: {
      sender,
      lockId
    }
  };
}

// Token factory messages
export function createMsgCreateDenom(sender: string, subdenom: string) {
  return {
    typeUrl: "/osmosis.tokenfactory.v1beta1.MsgCreateDenom",
    value: {
      sender,
      subdenom
    }
  };
}

export function createMsgMint(sender: string, amount: Coin, mintToAddress: string) {
  return {
    typeUrl: "/osmosis.tokenfactory.v1beta1.MsgMint",
    value: {
      sender,
      amount,
      mintToAddress
    }
  };
}

export function createMsgBurn(sender: string, amount: Coin, burnFromAddress: string) {
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
} as const;

// Helper to get vote option number
export function getVoteOptionNumber(option: string): number {
  switch (option.toLowerCase()) {
    case 'yes': return VoteOption.YES;
    case 'no': return VoteOption.NO;
    case 'abstain': return VoteOption.ABSTAIN;
    case 'no_with_veto': return VoteOption.NO_WITH_VETO;
    default: throw new Error(`Invalid vote option: ${option}`);
  }
}