import AntdButton from "../../../common/AntdButtons";
import AntdCards from "../../../common/AntdCards";
import { dummyDataCompanyList } from "../Data";
import DynamicTitle from "../../../common/DynamicTitle";

const CompanyList = () => {
  return (
    <div className="bg-grey-300 p-4 md:p-8 lg:p-12 xl:p-[48px] py-6">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <DynamicTitle classNames="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#08142c]">
          Choose Your Dream Companies
        </DynamicTitle>
        <p className="text-sm md:text-base lg:text-lg text-gray-800 mt-2">
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
                <AntdButton classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors">
                  Full Time
                </AntdButton>
                <AntdButton classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors">
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
