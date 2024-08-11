import { useNavigate } from "react-router-dom";
import AntdSearch from "../../../common/AntdSearch";
import DynamicTitle from "../../../common/DynamicTitle";

const DetailedComponent = () => {
  const navigate = useNavigate();

  const handleSearch = (value) => {
    navigate("/search", { state: value });
  };

  return (
    <div className="relative">
      <div className="relative bg-gradient-to-r from-[#3d2462] to-[#3d2462] py-4 min-h-[100vh] flex items-center text-white pl-4 md:pl-8 lg:pl-12 xl:pl-[48px] z-10">
        <div className="flex flex-col gap-8 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          <DynamicTitle classNames="font-bold text-4xl md:text-5xl lg:text-6xl text-white font-extrabold">
            Find Your Dream Job with Exciting Opportunities
          </DynamicTitle>
          <p className="text-base md:text-lg lg:text-xl">
            Embark on a journey towards your dream career with our ultimate
            job-finding companion. Our platform connects talented individuals
            with exciting opportunities.
          </p>
          <div className="w-full">
            <AntdSearch
              className="bg-white rounded-lg shadow-md"
              placeholder="Job Titles, Salaries, or Companies"
              enterButton={
                <div className="text-black font-semibold">Search</div>
              }
              size="large"
              loading={false}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn-empmerch.newjobs.com/wp-content/uploads/2022/09/homepage-desktop.jpg"
          alt="Background"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default DetailedComponent;
