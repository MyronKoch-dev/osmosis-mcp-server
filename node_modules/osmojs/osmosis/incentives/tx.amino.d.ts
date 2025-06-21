import { MsgCreateGauge, MsgAddToGauge, MsgCreateGroup } from "./tx";
export declare const AminoConverter: {
    "/osmosis.incentives.MsgCreateGauge": {
        aminoType: string;
        toAmino: (message: MsgCreateGauge) => import("./tx").MsgCreateGaugeAmino;
        fromAmino: (object: import("./tx").MsgCreateGaugeAmino) => MsgCreateGauge;
    };
    "/osmosis.incentives.MsgAddToGauge": {
        aminoType: string;
        toAmino: (message: MsgAddToGauge) => import("./tx").MsgAddToGaugeAmino;
        fromAmino: (object: import("./tx").MsgAddToGaugeAmino) => MsgAddToGauge;
    };
    "/osmosis.incentives.MsgCreateGroup": {
        aminoType: string;
        toAmino: (message: MsgCreateGroup) => import("./tx").MsgCreateGroupAmino;
        fromAmino: (object: import("./tx").MsgCreateGroupAmino) => MsgCreateGroup;
    };
};
