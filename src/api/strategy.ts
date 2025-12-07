import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
interface Result {
  success: boolean;
  msg: string;
  data: Datum[];
}
interface StrategySymbolResult {
  success: boolean;
  msg: string;
  data: string[];
}
interface Datum {
  id: number;
  strategy_name: string;
  risk_coefficient: number;
  strategy_rate: number;
  strategy_win_count: number;
  strategy_loss_count: number;
  strategy_total_count: number;
  strategy_total_profit: number;
  created: string;
  updated: string;
}
export const getStrategyList = () => {
  return http.request<Result>("get", baseUrlApi("getStrategyList"));
};

export const generateStrategyListQueryOptions = () => {
  return {
    queryKey: ["strategy"],
    queryFn: getStrategyList
  };
};

export const getStrategySymbol = (strategyName: string) => {
  return http.request<StrategySymbolResult>(
    "get",
    baseUrlApi("getStrategySymbol") + `?strategy_name=${strategyName}`
  );
};

export const generateStrategySymbolQueryOptions = (strategyName: string) => {
  return {
    queryKey: ["strategySymbol", strategyName],
    queryFn: () => getStrategySymbol(strategyName)
  };
};
