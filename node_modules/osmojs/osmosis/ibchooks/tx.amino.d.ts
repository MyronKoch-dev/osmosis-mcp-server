import { MsgEmitIBCAck } from "./tx";
export declare const AminoConverter: {
    "/osmosis.ibchooks.MsgEmitIBCAck": {
        aminoType: string;
        toAmino: (message: MsgEmitIBCAck) => import("./tx").MsgEmitIBCAckAmino;
        fromAmino: (object: import("./tx").MsgEmitIBCAckAmino) => MsgEmitIBCAck;
    };
};
