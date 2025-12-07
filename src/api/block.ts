import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import type { QueryOptions } from "@tanstack/vue-query";
interface Result {
  success: boolean;
  msg: string;
  data: Datum[];
}

export interface Datum {
  block: string;
  block_rate: number;
  input: number;
  codeName: string;
  price: number;
  pnl_rate: number;
}
export const getBlockList = () => {
  return http.request<Result>("get", baseUrlApi("dragon_list"));
};

export const generateBlockListQueryOptions = (): QueryOptions<Result> => {
  return {
    queryKey: ["block"],
    queryFn: getBlockList
  };
};
