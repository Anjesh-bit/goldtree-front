import { Skeleton } from 'antd';
import AntdButton from '../../../../shared/components/AntdButtons';
import AntdCards from '../../../../shared/components/AntdCards';
import DynamicTitle from '../../../../shared/components/DynamicTitle';
import { useCompanyList } from '../../hooks/useCompanyList';
import NoData from '../../../../shared/components/layouts/NoData';

const CompanyList = () => {
  const { handleCardClick, isLoading, isError, data } = useCompanyList();
  const isEmpty = data === undefined || data?.length === 0;

  return (
    <div className="bg-gray-200 p-4 md:p-8 lg:p-12 xl:p-[48px] py-6">
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

      {isEmpty ? (
        <NoData />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data?.map((item, index) => (
            <AntdCards
              onClick={() => handleCardClick(item._id)}
              className="p-4 bg-white rounded-lg shadow-md border transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-[#e8f4f9]"
              key={index}
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-center mb-4">
                  <img
                    src={item.profile_images ?? 'default-image.jpg'}
                    alt={item.personalInfo.company_name}
                    className="w-24 h-24 object-cover rounded-full shadow-lg p-2 "
                    onError={(e) => (e.target.style.icon = 'none')}
                  />
                </div>

                <div className="text-lg md:text-xl font-semibold text-gray-800">
                  {item.personalInfo.company_name ?? 'N/A'}
                </div>

                <div className="text-sm text-gray-600">
                  <strong>Company Type:</strong>{' '}
                  {item.personalInfo.company_type ?? 'N/A'}
                </div>

                <div className="text-sm text-gray-600">
                  <strong>Location:</strong>{' '}
                  {item.personalInfo.location ?? 'N/A'}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <AntdButton classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors transform hover:scale-105">
                    Full Time
                  </AntdButton>
                  <AntdButton classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors transform hover:scale-105">
                    Remote
                  </AntdButton>
                </div>
              </div>
            </AntdCards>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyList;
