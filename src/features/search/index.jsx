import { useState } from 'react';
import AntdSearch from '../../shared/components/AntdSearch';
import { useGlobalSearch } from '../../services/search/setUp';
import { MatchView } from './MatchView';
import { SearchSider } from './SearchSider';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const { state } = useLocation();

  const [querySearchParams, setQuerySearchParams] = useState({
    q: state,
    vacancyType: [],
    careerLevel: [],
    gender: [],
    qualifications: [],
  });

  const { data, isLoading } = useGlobalSearch(querySearchParams);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setQuerySearchParams({ q: value });
  };

  return (
    <div className="grid grid-cols-12 gap-6 px-6 md:px-12 lg:px-16 py-8">
      <div className="col-span-12">
        <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
          <AntdSearch
            placeholder="Enter Any Keywords..."
            onChange={handleOnChange}
            className="shadow-md rounded-lg"
          />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <SearchSider setQuerySearchParams={setQuerySearchParams} />
      </div>
      <div className="col-span-12 lg:col-span-8">
        <MatchView matchedData={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Search;
