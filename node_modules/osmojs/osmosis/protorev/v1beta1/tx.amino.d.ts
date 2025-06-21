import { MsgSetHotRoutes, MsgSetDeveloperAccount, MsgSetMaxPoolPointsPerTx, MsgSetMaxPoolPointsPerBlock, MsgSetInfoByPoolType, MsgSetBaseDenoms } from "./tx";
export declare const AminoConverter: {
    "/osmosis.protorev.v1beta1.MsgSetHotRoutes": {
        aminoType: string;
        toAmino: (message: MsgSetHotRoutes) => import("./tx").MsgSetHotRoutesAmino;
        fromAmino: (object: import("./tx").MsgSetHotRoutesAmino) => MsgSetHotRoutes;
    };
    "/osmosis.protorev.v1beta1.MsgSetDeveloperAccount": {
        aminoType: string;
        toAmino: (message: MsgSetDeveloperAccount) => import("./tx").MsgSetDeveloperAccountAmino;
        fromAmino: (object: import("./tx").MsgSetDeveloperAccountAmino) => MsgSetDeveloperAccount;
    };
    "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerTx": {
        aminoType: string;
        toAmino: (message: MsgSetMaxPoolPointsPerTx) => import("./tx").MsgSetMaxPoolPointsPerTxAmino;
        fromAmino: (object: import("./tx").MsgSetMaxPoolPointsPerTxAmino) => MsgSetMaxPoolPointsPerTx;
    };
    "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerBlock": {
        aminoType: string;
        toAmino: (message: MsgSetMaxPoolPointsPerBlock) => import("./tx").MsgSetMaxPoolPointsPerBlockAmino;
        fromAmino: (object: import("./tx").MsgSetMaxPoolPointsPerBlockAmino) => MsgSetMaxPoolPointsPerBlock;
    };
    "/osmosis.protorev.v1beta1.MsgSetInfoByPoolType": {
        aminoType: string;
        toAmino: (message: MsgSetInfoByPoolType) => import("./tx").MsgSetInfoByPoolTypeAmino;
        fromAmino: (object: import("./tx").MsgSetInfoByPoolTypeAmino) => MsgSetInfoByPoolType;
    };
    "/osmosis.protorev.v1beta1.MsgSetBaseDenoms": {
        aminoType: string;
        toAmino: (message: MsgSetBaseDenoms) => import("./tx").MsgSetBaseDenomsAmino;
        fromAmino: (object: import("./tx").MsgSetBaseDenomsAmino) => MsgSetBaseDenoms;
    };
};
