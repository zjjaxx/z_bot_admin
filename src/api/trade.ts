import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
interface Result {
  success: boolean;
  msg: string;
  data: Datum[];
}

interface Datum {
  id: number;
  strategy_name: string;
  symbol: string;
  entry_date: string;
  exit_date: string;
  entry: number;
  exit: number;
  shares: number;
  pnl: number;
  agg_pnl: number;
  return_pct: number;
  bars: number;
  pnl_per_bar: number;
  created: string;
  updated: string;
}

export const getTradeList = (strategyName: string) => {
  return http.request<Result>(
    "get",
    baseUrlApi("getStrategyTrade") + `?strategy_name=${strategyName}`
  );
};
export const generateTradeListQueryOptions = (strategyName: string) => {
  return {
    queryKey: ["tradeList", strategyName],
    queryFn: () => getTradeList(strategyName)
  };
};
