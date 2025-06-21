import { Rpc } from "../../helpers";
import { QueryClient } from "@cosmjs/stargate";
import { ModuleToDistributeCoinsRequest, ModuleToDistributeCoinsResponse, GaugeByIDRequest, GaugeByIDResponse, GaugesRequest, GaugesResponse, ActiveGaugesRequest, ActiveGaugesResponse, ActiveGaugesPerDenomRequest, ActiveGaugesPerDenomResponse, UpcomingGaugesRequest, UpcomingGaugesResponse, UpcomingGaugesPerDenomRequest, UpcomingGaugesPerDenomResponse, RewardsEstRequest, RewardsEstResponse, QueryLockableDurationsRequest, QueryLockableDurationsResponse, QueryAllGroupsRequest, QueryAllGroupsResponse, QueryAllGroupsGaugesRequest, QueryAllGroupsGaugesResponse, QueryAllGroupsWithGaugeRequest, QueryAllGroupsWithGaugeResponse, QueryGroupByGroupGaugeIDRequest, QueryGroupByGroupGaugeIDResponse, QueryCurrentWeightByGroupGaugeIDRequest, QueryCurrentWeightByGroupGaugeIDResponse } from "./query";
/** Query defines the gRPC querier service */
export interface Query {
    /** ModuleToDistributeCoins returns coins that are going to be distributed */
    moduleToDistributeCoins(request?: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse>;
    /** GaugeByID returns gauges by their respective ID */
    gaugeByID(request: GaugeByIDRequest): Promise<GaugeByIDResponse>;
    /** Gauges returns both upcoming and active gauges */
    gauges(request?: GaugesRequest): Promise<GaugesResponse>;
    /** ActiveGauges returns active gauges */
    activeGauges(request?: ActiveGaugesRequest): Promise<ActiveGaugesResponse>;
    /** ActiveGaugesPerDenom returns active gauges by denom */
    activeGaugesPerDenom(request: ActiveGaugesPerDenomRequest): Promise<ActiveGaugesPerDenomResponse>;
    /** Returns scheduled gauges that have not yet occurred */
    upcomingGauges(request?: UpcomingGaugesRequest): Promise<UpcomingGaugesResponse>;
    /**
     * UpcomingGaugesPerDenom returns scheduled gauges that have not yet occurred
     * by denom
     */
    upcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest): Promise<UpcomingGaugesPerDenomResponse>;
    /**
     * RewardsEst returns an estimate of the rewards from now until a specified
     * time in the future The querier either provides an address or a set of locks
     * for which they want to find the associated rewards
     */
    rewardsEst(request: RewardsEstRequest): Promise<RewardsEstResponse>;
    /**
     * LockableDurations returns lockable durations that are valid to distribute
     * incentives for
     */
    lockableDurations(request?: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse>;
    /** AllGroups returns all groups */
    allGroups(request?: QueryAllGroupsRequest): Promise<QueryAllGroupsResponse>;
    /** AllGroupsGauges returns all group gauges */
    allGroupsGauges(request?: QueryAllGroupsGaugesRequest): Promise<QueryAllGroupsGaugesResponse>;
    /** AllGroupsWithGauge returns all groups with their group gauge */
    allGroupsWithGauge(request?: QueryAllGroupsWithGaugeRequest): Promise<QueryAllGroupsWithGaugeResponse>;
    /** GroupByGroupGaugeID returns a group given its group gauge ID */
    groupByGroupGaugeID(request: QueryGroupByGroupGaugeIDRequest): Promise<QueryGroupByGroupGaugeIDResponse>;
    /**
     * CurrentWeightByGroupGaugeID returns the current weight since the
     * the last epoch given a group gauge ID
     */
    currentWeightByGroupGaugeID(request: QueryCurrentWeightByGroupGaugeIDRequest): Promise<QueryCurrentWeightByGroupGaugeIDResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    moduleToDistributeCoins(request?: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse>;
    gaugeByID(request: GaugeByIDRequest): Promise<GaugeByIDResponse>;
    gauges(request?: GaugesRequest): Promise<GaugesResponse>;
    activeGauges(request?: ActiveGaugesRequest): Promise<ActiveGaugesResponse>;
    activeGaugesPerDenom(request: ActiveGaugesPerDenomRequest): Promise<ActiveGaugesPerDenomResponse>;
    upcomingGauges(request?: UpcomingGaugesRequest): Promise<UpcomingGaugesResponse>;
    upcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest): Promise<UpcomingGaugesPerDenomResponse>;
    rewardsEst(request: RewardsEstRequest): Promise<RewardsEstResponse>;
    lockableDurations(request?: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse>;
    allGroups(request?: QueryAllGroupsRequest): Promise<QueryAllGroupsResponse>;
    allGroupsGauges(request?: QueryAllGroupsGaugesRequest): Promise<QueryAllGroupsGaugesResponse>;
    allGroupsWithGauge(request?: QueryAllGroupsWithGaugeRequest): Promise<QueryAllGroupsWithGaugeResponse>;
    groupByGroupGaugeID(request: QueryGroupByGroupGaugeIDRequest): Promise<QueryGroupByGroupGaugeIDResponse>;
    currentWeightByGroupGaugeID(request: QueryCurrentWeightByGroupGaugeIDRequest): Promise<QueryCurrentWeightByGroupGaugeIDResponse>;
}
export declare const createRpcQueryExtension: (base: QueryClient) => {
    moduleToDistributeCoins(request?: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse>;
    gaugeByID(request: GaugeByIDRequest): Promise<GaugeByIDResponse>;
    gauges(request?: GaugesRequest): Promise<GaugesResponse>;
    activeGauges(request?: ActiveGaugesRequest): Promise<ActiveGaugesResponse>;
    activeGaugesPerDenom(request: ActiveGaugesPerDenomRequest): Promise<ActiveGaugesPerDenomResponse>;
    upcomingGauges(request?: UpcomingGaugesRequest): Promise<UpcomingGaugesResponse>;
    upcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest): Promise<UpcomingGaugesPerDenomResponse>;
    rewardsEst(request: RewardsEstRequest): Promise<RewardsEstResponse>;
    lockableDurations(request?: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse>;
    allGroups(request?: QueryAllGroupsRequest): Promise<QueryAllGroupsResponse>;
    allGroupsGauges(request?: QueryAllGroupsGaugesRequest): Promise<QueryAllGroupsGaugesResponse>;
    allGroupsWithGauge(request?: QueryAllGroupsWithGaugeRequest): Promise<QueryAllGroupsWithGaugeResponse>;
    groupByGroupGaugeID(request: QueryGroupByGroupGaugeIDRequest): Promise<QueryGroupByGroupGaugeIDResponse>;
    currentWeightByGroupGaugeID(request: QueryCurrentWeightByGroupGaugeIDRequest): Promise<QueryCurrentWeightByGroupGaugeIDResponse>;
};
