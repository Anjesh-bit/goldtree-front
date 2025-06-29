import AntdSearch from '../../../../shared/components/AntdSearch';
import DynamicTitle from '../../../../shared/components/DynamicTitle';
import { useDetails } from '../../hooks/useDetails';

const DetailedComponent = () => {
  const { handleSearch } = useDetails();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0a1128] text-white font-sans">
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16 xl:px-24 bg-[#0a1128] z-10">
        <div className="max-w-2xl space-y-8">
          <DynamicTitle classNames="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f1c40f] leading-tight tracking-tight">
            Unlock Golden Career Paths with{' '}
            <span className="text-white">Gold Job</span>
          </DynamicTitle>

          <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
            Your journey to a better future starts here. Explore top job
            listings, connect with leading employers, and take control of your
            career — all in one place.
          </p>

          <AntdSearch
            className="custom-ant-search"
            placeholder="Search jobs by title, company or salary"
            enterButton="Search"
            size="large"
            loading={false}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center px-4 py-16">
        <div className="relative w-[420px] h-[420px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-[#08142c] to-[#0f2d4c] rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Teamwork and innovation"
            className="w-[72%] h-[72%] object-cover rounded-xl border-2 border-[#f1c40f] shadow-lg transform transition duration-300 group-hover:scale-105"
          />

          <div className="absolute bottom-6 text-sm md:text-base text-gray-400 italic tracking-wide">
            Empowering talent across Globe
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedComponent;
