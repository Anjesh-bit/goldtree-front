import { useQuery } from "@tanstack/react-query";
import { searchQueryKeys } from "../../queryKeys/keys";
import { fetcher } from "../../axios/fetcher";
import isEmpty from "lodash/isEmpty";

export const useGlobalSearch = (params) => {
  const urlSearchParams = new URLSearchParams();
  const { q, ty, le, ge, qu } = params;
  if (q) {
    urlSearchParams.append("q", q);
  }

  const addArrayToParams = (key, array) => {
    if (!isEmpty(array)) {
      urlSearchParams.append(key, array.join(","));
    }
  };

  addArrayToParams("ty", ty);
  addArrayToParams("le", le);
  addArrayToParams("ge", ge);
  addArrayToParams("qu", qu);

  return useQuery({
    queryFn: () => fetcher(`search?${urlSearchParams.toString()}`),
    queryKey: [
      searchQueryKeys.setUp.globalSearch,
      params.q,
      ty?.join(","),
      le?.join(","),
      ge?.join(","),
      qu?.join(","),
    ],
    enabled: !!(q ?? ty ?? le ?? ge ?? qu),
  });
};
