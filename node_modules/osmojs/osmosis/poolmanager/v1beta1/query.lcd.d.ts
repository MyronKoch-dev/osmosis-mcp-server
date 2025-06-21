import { LCDClient } from "@cosmology/lcd";
import { ParamsRequest, ParamsResponseSDKType, EstimateSwapExactAmountInRequest, EstimateSwapExactAmountInResponseSDKType, EstimateSwapExactAmountInWithPrimitiveTypesRequest, EstimateSinglePoolSwapExactAmountInRequest, EstimateSwapExactAmountOutRequest, EstimateSwapExactAmountOutResponseSDKType, EstimateSwapExactAmountOutWithPrimitiveTypesRequest, EstimateSinglePoolSwapExactAmountOutRequest, NumPoolsRequest, NumPoolsResponseSDKType, PoolRequest, PoolResponseSDKType, AllPoolsRequest, AllPoolsResponseSDKType, ListPoolsByDenomRequest, ListPoolsByDenomResponseSDKType, SpotPriceRequest, SpotPriceResponseSDKType, TotalPoolLiquidityRequest, TotalPoolLiquidityResponseSDKType, TotalLiquidityRequest, TotalLiquidityResponseSDKType, TotalVolumeForPoolRequest, TotalVolumeForPoolResponseSDKType, TradingPairTakerFeeRequest, TradingPairTakerFeeResponseSDKType, EstimateTradeBasedOnPriceImpactRequest, EstimateTradeBasedOnPriceImpactResponseSDKType } from "./query";
export declare class LCDQueryClient {
    req: LCDClient;
    constructor({ requestClient }: {
        requestClient: LCDClient;
    });
    params(_params?: ParamsRequest): Promise<ParamsResponseSDKType>;
    estimateSwapExactAmountIn(params: EstimateSwapExactAmountInRequest): Promise<EstimateSwapExactAmountInResponseSDKType>;
    estimateSwapExactAmountInWithPrimitiveTypes(params: EstimateSwapExactAmountInWithPrimitiveTypesRequest): Promise<EstimateSwapExactAmountInResponseSDKType>;
    estimateSinglePoolSwapExactAmountIn(params: EstimateSinglePoolSwapExactAmountInRequest): Promise<EstimateSwapExactAmountInResponseSDKType>;
    estimateSwapExactAmountOut(params: EstimateSwapExactAmountOutRequest): Promise<EstimateSwapExactAmountOutResponseSDKType>;
    estimateSwapExactAmountOutWithPrimitiveTypes(params: EstimateSwapExactAmountOutWithPrimitiveTypesRequest): Promise<EstimateSwapExactAmountOutResponseSDKType>;
    estimateSinglePoolSwapExactAmountOut(params: EstimateSinglePoolSwapExactAmountOutRequest): Promise<EstimateSwapExactAmountOutResponseSDKType>;
    numPools(_params?: NumPoolsRequest): Promise<NumPoolsResponseSDKType>;
    pool(params: PoolRequest): Promise<PoolResponseSDKType>;
    allPools(_params?: AllPoolsRequest): Promise<AllPoolsResponseSDKType>;
    listPoolsByDenom(params: ListPoolsByDenomRequest): Promise<ListPoolsByDenomResponseSDKType>;
    spotPrice(params: SpotPriceRequest): Promise<SpotPriceResponseSDKType>;
    totalPoolLiquidity(params: TotalPoolLiquidityRequest): Promise<TotalPoolLiquidityResponseSDKType>;
    totalLiquidity(_params?: TotalLiquidityRequest): Promise<TotalLiquidityResponseSDKType>;
    totalVolumeForPool(params: TotalVolumeForPoolRequest): Promise<TotalVolumeForPoolResponseSDKType>;
    tradingPairTakerFee(params: TradingPairTakerFeeRequest): Promise<TradingPairTakerFeeResponseSDKType>;
    estimateTradeBasedOnPriceImpact(params: EstimateTradeBasedOnPriceImpactRequest): Promise<EstimateTradeBasedOnPriceImpactResponseSDKType>;
}
