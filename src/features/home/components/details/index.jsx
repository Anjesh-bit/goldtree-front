import { useNavigate } from 'react-router-dom';
import AntdSearch from '../../../../shared/components/AntdSearch';
import DynamicTitle from '../../../../shared/components/DynamicTitle';
import { useDetails } from '../../hooks/useDetails';

const DetailedComponent = () => {
  const { handleSearch } = useDetails();
  return (
    <div className="flex flex-col lg:flex-row bg-[#08142c]">
      <div className="flex-1 py-4 min-h-[100vh] flex items-center text-white p-4 md:p-8 lg:p-12 xl:p-[48px] z-10">
        <div className="flex flex-col gap-8 w-full md:w-3/4 lg:w-2/3 xl:w-[55%]">
          <DynamicTitle classNames="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-300 font-extrabold">
            Find Your Dream Job with Exciting Opportunities
          </DynamicTitle>

          <p className="text-base md:text-lg lg:text-xl text-gray-300">
            Embark on a journey towards your dream career with our ultimate
            job-finding companion. Our platform connects talented individuals
            with exciting opportunities.
          </p>
          <div className="w-full">
            <AntdSearch
              className="bg-white rounded-lg shadow-md"
              placeholder="Job Titles, Salaries, or Companies"
              enterButton={<div className="font-semibold">Search</div>}
              size="large"
              loading={false}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 border border-4 border-gray-400">
        <img
          src="https://cdn-empmerch.newjobs.com/wp-content/uploads/2022/09/homepage-desktop.jpg"
          alt="Background"
          className="object-cover  h-[300px] md:h-[400px] lg:h-[100vh] w-full brightness-75"
          style={{ objectPosition: '80% center' }}
        />
      </div>
    </div>
  );
};

export default DetailedComponent;
