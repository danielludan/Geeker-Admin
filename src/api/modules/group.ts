import { ResultData } from "@/api/interface/index";
import { PORT3 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 地域组Tree
 */
// 获取用户列表
export const getAreaGroupTreeSelect = () => {
  const params = { group_type: "area" };
  return http.get<ResultData>(PORT3 + `/user_group/tree_select/`, params);
};
