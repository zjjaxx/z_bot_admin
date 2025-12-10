import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
interface Result {
  success: boolean;
  msg: string;
  data: Datum[];
}

interface Datum {
  id: number;
  type: string;
  symbol: string;
  date: string;
  shares: number;
  strategy_name: string;
  fill_price: number;
  created: string;
  updated: string;
}

export const getOrderList = (strategyName: string) => {
  return http.request<Result>(
    "get",
    baseUrlApi("getStrategyOrder") + `?strategy_name=${strategyName}`
  );
};
export const generateOrderListQueryOptions = (strategyName: string) => {
  return {
    queryKey: ["orderList", strategyName],
    queryFn: () => getOrderList(strategyName)
  };
};
export const getOrderDetailList = (strategyName: string, symbol: string) => {
  return http.request<Result>(
    "get",
    baseUrlApi("getStrategyOrderDetail") +
      `?strategy_name=${strategyName}&symbol=${symbol}`
  );
};
export const generateOrderDetailListQueryOptions = (
  strategyName: string,
  symbol: string
) => {
  return {
    queryKey: ["orderDetailList", strategyName, symbol],
    queryFn: () => getOrderDetailList(strategyName, symbol)
  };
};
