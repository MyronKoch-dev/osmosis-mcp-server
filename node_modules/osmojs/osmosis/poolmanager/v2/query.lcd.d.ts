import { LCDClient } from "@cosmology/lcd";
import { SpotPriceRequest, SpotPriceResponseSDKType } from "./query";
export declare class LCDQueryClient {
    req: LCDClient;
    constructor({ requestClient }: {
        requestClient: LCDClient;
    });
    spotPriceV2(params: SpotPriceRequest): Promise<SpotPriceResponseSDKType>;
}
