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
    <section className="bg-[#fff8e1] px-6 md:px-12 lg:px-24 xl:px-36 py-16">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <DynamicTitle classNames="text-3xl md:text-4xl font-extrabold text-[#f1c40f]">
          Choose Your Dream Companies
        </DynamicTitle>
        <p className="mt-3 text-lg md:text-xl text-gray-800 max-w-3xl mx-auto">
          Start your journey towards the job search by exploring the top
          companies around Nepal and also opportunities to meet top-notch
          mentors.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton
              active
              key={idx}
              avatar={{ shape: 'circle', size: 96 }}
              paragraph={{ rows: 4 }}
              className="p-6 bg-white rounded-lg shadow-md"
            />
          ))}
        </div>
      ) : isEmpty || isError ? (
        <NoData />
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto">
          {data?.map((item, index) => (
            <AntdCards
              onClick={() => handleCardClick(item._id)}
              className="
              p-6 bg-white rounded-2xl shadow-md border border-gray-200 cursor-pointer
              transition-transform duration-300 ease-in-out
              hover:-translate-y-1 hover:shadow-[0_8px_15px_rgba(241,196,15,0.3)]
              hover:border-[#f1c40f] hover:bg-[#fffce3]"
              key={index}
            >
              <div className="flex flex-col gap-6 items-center text-center">
                <img
                  src={item.profile_images ?? '/default-image.jpg'}
                  alt={item.personalInfo.company_name}
                  className="w-24 h-24 object-cover rounded-full border-4 border-[#f1c40f]"
                />

                <h3 className="text-xl font-bold text-[#08142c]">
                  {item.personalInfo.company_name ?? 'N/A'}
                </h3>

                <p className="text-sm text-gray-700">
                  <strong>Company Type:</strong>{' '}
                  {item.personalInfo.company_type ?? 'N/A'}
                </p>

                <p className="text-sm text-gray-700">
                  <strong>Location:</strong>{' '}
                  {item.personalInfo.location ?? 'N/A'}
                </p>
              </div>
            </AntdCards>
          ))}
        </div>
      )}
    </section>
  );
};

export default CompanyList;
