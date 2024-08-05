import { useState } from "react";
import AntdSearch from "../../common/AntdSearch";
import { useGlobalSearch } from "../../services/search/setUp";
import MatchView from "./MatchView";
import SearchSider from "./SearchSider";
import debounce from "lodash/debounce";

const Search = () => {
  const [querySearchParams, setQuerySearchParams] = useState({
    q: "",
    vacancyType: [],
    careerLevel: [],
    gender: [],
    qualifications: [],
  });

  const { data, isLoading, isError } = useGlobalSearch(querySearchParams);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setQuerySearchParams({ q: value });
  };

  return (
    <div className="grid grid-cols-12 px-[50px] py-8 gap-[24px]">
      <div className="col-span-12">
        <div className="w-[60%]">
          <AntdSearch
            placeholder={"Enter Any Keywords.."}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="col-span-4">
        <SearchSider setQuerySearchParams={setQuerySearchParams} />
      </div>
      <div className="col-span-8">
        <MatchView matchedData={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Search;
