import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";

interface Result {
  success: boolean;
  msg: string;
  data: Datum[];
}
export interface Datum {
  stock_id: string;
  strateOperateTime: string;
  action: string;
  strateOperate: string;
  strateName: string;
  createdAt: string;
}
export const getDaylyRecommand = () => {
  return http.request<Result>("get", baseUrlApi("stock_dayly_recommand"));
};
export const generateDaylyRecommandQueryOptions = () => {
  return {
    queryKey: ["daylyRecommand"],
    queryFn: () => getDaylyRecommand()
  };
};
