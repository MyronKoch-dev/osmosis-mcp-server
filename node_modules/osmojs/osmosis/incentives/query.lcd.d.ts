import { LCDClient } from "@cosmology/lcd";
import { ModuleToDistributeCoinsRequest, ModuleToDistributeCoinsResponseSDKType, GaugeByIDRequest, GaugeByIDResponseSDKType, GaugesRequest, GaugesResponseSDKType, ActiveGaugesRequest, ActiveGaugesResponseSDKType, ActiveGaugesPerDenomRequest, ActiveGaugesPerDenomResponseSDKType, UpcomingGaugesRequest, UpcomingGaugesResponseSDKType, UpcomingGaugesPerDenomRequest, UpcomingGaugesPerDenomResponseSDKType, RewardsEstRequest, RewardsEstResponseSDKType, QueryLockableDurationsRequest, QueryLockableDurationsResponseSDKType, QueryAllGroupsRequest, QueryAllGroupsResponseSDKType, QueryAllGroupsGaugesRequest, QueryAllGroupsGaugesResponseSDKType, QueryAllGroupsWithGaugeRequest, QueryAllGroupsWithGaugeResponseSDKType, QueryGroupByGroupGaugeIDRequest, QueryGroupByGroupGaugeIDResponseSDKType, QueryCurrentWeightByGroupGaugeIDRequest, QueryCurrentWeightByGroupGaugeIDResponseSDKType } from "./query";
export declare class LCDQueryClient {
    req: LCDClient;
    constructor({ requestClient }: {
        requestClient: LCDClient;
    });
    moduleToDistributeCoins(_params?: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponseSDKType>;
    gaugeByID(params: GaugeByIDRequest): Promise<GaugeByIDResponseSDKType>;
    gauges(params?: GaugesRequest): Promise<GaugesResponseSDKType>;
    activeGauges(params?: ActiveGaugesRequest): Promise<ActiveGaugesResponseSDKType>;
    activeGaugesPerDenom(params: ActiveGaugesPerDenomRequest): Promise<ActiveGaugesPerDenomResponseSDKType>;
    upcomingGauges(params?: UpcomingGaugesRequest): Promise<UpcomingGaugesResponseSDKType>;
    upcomingGaugesPerDenom(params: UpcomingGaugesPerDenomRequest): Promise<UpcomingGaugesPerDenomResponseSDKType>;
    rewardsEst(params: RewardsEstRequest): Promise<RewardsEstResponseSDKType>;
    lockableDurations(_params?: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponseSDKType>;
    allGroups(_params?: QueryAllGroupsRequest): Promise<QueryAllGroupsResponseSDKType>;
    allGroupsGauges(_params?: QueryAllGroupsGaugesRequest): Promise<QueryAllGroupsGaugesResponseSDKType>;
    allGroupsWithGauge(_params?: QueryAllGroupsWithGaugeRequest): Promise<QueryAllGroupsWithGaugeResponseSDKType>;
    groupByGroupGaugeID(params: QueryGroupByGroupGaugeIDRequest): Promise<QueryGroupByGroupGaugeIDResponseSDKType>;
    currentWeightByGroupGaugeID(params: QueryCurrentWeightByGroupGaugeIDRequest): Promise<QueryCurrentWeightByGroupGaugeIDResponseSDKType>;
}
