import AntdButton from "../../../common/AntdButtons";
import AntdCards from "../../../common/AntdCards";
import { dummyDataCompanyList } from "../Data";
import DynamicTitle from "../../../common/DynamicTitle";

const CompanyList = () => {
  return (
    <div className="bg-[#f5f5f5] px-4 md:px-8 lg:px-12 xl:px-16 py-6">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <DynamicTitle classNames="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#3d2462]">
          Choose Your Dream Companies
        </DynamicTitle>
        <p className="text-sm md:text-base lg:text-lg text-gray-700 mt-2">
          Start your journey towards the job search by exploring the top
          companies around Nepal and also opportunities to meet top-notch
          mentors.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {dummyDataCompanyList?.map((item, index) => (
          <AntdCards
            className="p-4 bg-white rounded-lg shadow-md border"
            key={index}
          >
            <div className="flex flex-col gap-4">
              <div className="text-lg md:text-xl font-semibold text-gray-800">
                {item.company}
              </div>
              <div className="text-sm text-gray-600">{item.description}</div>
              <div className="flex flex-wrap gap-2">
                <AntdButton
                  className={`!border-none px-4 py-2 rounded-full font-medium transition duration-300 ease-in-out`}
                >
                  Full Time
                </AntdButton>
                <AntdButton
                  className={`!border-none px-4 py-2 rounded-full font-medium transition duration-300 ease-in-out`}
                >
                  Remote
                </AntdButton>
              </div>
            </div>
          </AntdCards>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
