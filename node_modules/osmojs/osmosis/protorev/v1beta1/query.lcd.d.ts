import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryGetProtoRevNumberOfTradesRequest, QueryGetProtoRevNumberOfTradesResponseSDKType, QueryGetProtoRevProfitsByDenomRequest, QueryGetProtoRevProfitsByDenomResponseSDKType, QueryGetProtoRevAllProfitsRequest, QueryGetProtoRevAllProfitsResponseSDKType, QueryGetProtoRevStatisticsByRouteRequest, QueryGetProtoRevStatisticsByRouteResponseSDKType, QueryGetProtoRevAllRouteStatisticsRequest, QueryGetProtoRevAllRouteStatisticsResponseSDKType, QueryGetProtoRevTokenPairArbRoutesRequest, QueryGetProtoRevTokenPairArbRoutesResponseSDKType, QueryGetProtoRevAdminAccountRequest, QueryGetProtoRevAdminAccountResponseSDKType, QueryGetProtoRevDeveloperAccountRequest, QueryGetProtoRevDeveloperAccountResponseSDKType, QueryGetProtoRevInfoByPoolTypeRequest, QueryGetProtoRevInfoByPoolTypeResponseSDKType, QueryGetProtoRevMaxPoolPointsPerTxRequest, QueryGetProtoRevMaxPoolPointsPerTxResponseSDKType, QueryGetProtoRevMaxPoolPointsPerBlockRequest, QueryGetProtoRevMaxPoolPointsPerBlockResponseSDKType, QueryGetProtoRevBaseDenomsRequest, QueryGetProtoRevBaseDenomsResponseSDKType, QueryGetProtoRevEnabledRequest, QueryGetProtoRevEnabledResponseSDKType, QueryGetProtoRevPoolRequest, QueryGetProtoRevPoolResponseSDKType, QueryGetAllProtocolRevenueRequest, QueryGetAllProtocolRevenueResponseSDKType } from "./query";
export declare class LCDQueryClient {
    req: LCDClient;
    constructor({ requestClient }: {
        requestClient: LCDClient;
    });
    params(_params?: QueryParamsRequest): Promise<QueryParamsResponseSDKType>;
    getProtoRevNumberOfTrades(_params?: QueryGetProtoRevNumberOfTradesRequest): Promise<QueryGetProtoRevNumberOfTradesResponseSDKType>;
    getProtoRevProfitsByDenom(params: QueryGetProtoRevProfitsByDenomRequest): Promise<QueryGetProtoRevProfitsByDenomResponseSDKType>;
    getProtoRevAllProfits(_params?: QueryGetProtoRevAllProfitsRequest): Promise<QueryGetProtoRevAllProfitsResponseSDKType>;
    getProtoRevStatisticsByRoute(params: QueryGetProtoRevStatisticsByRouteRequest): Promise<QueryGetProtoRevStatisticsByRouteResponseSDKType>;
    getProtoRevAllRouteStatistics(_params?: QueryGetProtoRevAllRouteStatisticsRequest): Promise<QueryGetProtoRevAllRouteStatisticsResponseSDKType>;
    getProtoRevTokenPairArbRoutes(_params?: QueryGetProtoRevTokenPairArbRoutesRequest): Promise<QueryGetProtoRevTokenPairArbRoutesResponseSDKType>;
    getProtoRevAdminAccount(_params?: QueryGetProtoRevAdminAccountRequest): Promise<QueryGetProtoRevAdminAccountResponseSDKType>;
    getProtoRevDeveloperAccount(_params?: QueryGetProtoRevDeveloperAccountRequest): Promise<QueryGetProtoRevDeveloperAccountResponseSDKType>;
    getProtoRevInfoByPoolType(_params?: QueryGetProtoRevInfoByPoolTypeRequest): Promise<QueryGetProtoRevInfoByPoolTypeResponseSDKType>;
    getProtoRevMaxPoolPointsPerTx(_params?: QueryGetProtoRevMaxPoolPointsPerTxRequest): Promise<QueryGetProtoRevMaxPoolPointsPerTxResponseSDKType>;
    getProtoRevMaxPoolPointsPerBlock(_params?: QueryGetProtoRevMaxPoolPointsPerBlockRequest): Promise<QueryGetProtoRevMaxPoolPointsPerBlockResponseSDKType>;
    getProtoRevBaseDenoms(_params?: QueryGetProtoRevBaseDenomsRequest): Promise<QueryGetProtoRevBaseDenomsResponseSDKType>;
    getProtoRevEnabled(_params?: QueryGetProtoRevEnabledRequest): Promise<QueryGetProtoRevEnabledResponseSDKType>;
    getProtoRevPool(params: QueryGetProtoRevPoolRequest): Promise<QueryGetProtoRevPoolResponseSDKType>;
    getAllProtocolRevenue(_params?: QueryGetAllProtocolRevenueRequest): Promise<QueryGetAllProtocolRevenueResponseSDKType>;
}
