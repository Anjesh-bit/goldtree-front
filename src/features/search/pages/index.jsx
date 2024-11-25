import AntdSearch from '../../../shared/components/AntdSearch';
import { MatchView } from '../components/MatchView';
import { SearchSider } from '../components/SearchSider';
import { useSearch } from '../hooks/useSearch';

const Search = () => {
  const { handleOnChange, data, isLoading, setQuerySearchParams } = useSearch();
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
