import AntdSearch from '../../../shared/components/AntdSearch';
import { MatchView } from '../components/MatchView';
import { SearchSider } from '../components/SearchSider';
import { useSearch } from '../hooks/useSearch';

const Search = () => {
  const { handleOnChange, data, isLoading, setQuerySearchParams } = useSearch();

  return (
    <div className="grid grid-cols-12 gap-6 px-6 md:px-12 lg:px-16 py-8 bg-[#f5f5f5] min-h-screen text-[#08142c]">
      <div className="col-span-12">
        <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
          <AntdSearch
            placeholder="Enter Any Keywords..."
            onChange={handleOnChange}
            className="shadow-lg rounded-lg"
            enterButton={
              <div className="font-semibold text-[#f1c40f]">Search</div>
            }
            size="large"
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
