import { Rpc } from "../../../helpers";
import { QueryClient } from "@cosmjs/stargate";
import { SpotPriceRequest, SpotPriceResponse } from "./query";
export interface Query {
    /**
     * SpotPriceV2 defines a gRPC query handler that returns the spot price given
     * a base denomination and a quote denomination.
     * The returned spot price has 36 decimal places. However, some of
     * modules perform sig fig rounding so most of the rightmost decimals can be
     * zeroes.
     */
    spotPriceV2(request: SpotPriceRequest): Promise<SpotPriceResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    spotPriceV2(request: SpotPriceRequest): Promise<SpotPriceResponse>;
}
export declare const createRpcQueryExtension: (base: QueryClient) => {
    spotPriceV2(request: SpotPriceRequest): Promise<SpotPriceResponse>;
};
