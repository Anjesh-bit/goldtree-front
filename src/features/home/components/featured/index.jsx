import { useState } from 'react';
import DynamicTitle from '../../../../shared/components/DynamicTitle';
import AntdCards from '../../../../shared/components/AntdCards';
import { useFeatured } from '../../hooks/useFeatured';
import NoData from '../../../../shared/components/layouts/NoData';
import {
  ApartmentOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';

const FeaturedJobs = () => {
  const { handleProductClick, postsByCompany } = useFeatured();
  const [expandedCompany, setExpandedCompany] = useState({});

  const toggleCompany = (company) => {
    setExpandedCompany((prev) => ({
      ...prev,
      [company]: !prev[company],
    }));
  };

  return (
    <section className="bg-[#f5f5f5] px-6 md:px-12 lg:px-24 xl:px-36 py-16 text-[#08142c]">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <DynamicTitle classNames="text-3xl md:text-4xl font-bold text-[#f1c40f]">
          Featured Jobs From Top Companies
        </DynamicTitle>
        <p className="mt-3 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Discover exciting job openings curated from leading companies. Apply
          directly or explore roles that match your career goals.
        </p>
      </div>

      {Object.keys(postsByCompany).length === 0 ? (
        <NoData />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Object.entries(postsByCompany).map(([companyName, posts]) => {
            const isOpen = expandedCompany[companyName];
            return (
              <AntdCards
                key={companyName}
                className="bg-white rounded-xl shadow-md border border-gray-200 transition hover:border-[#f1c40f] hover:shadow-lg"
              >
                <div
                  className="flex justify-between items-center cursor-pointer px-4 py-3 rounded-t-xl bg-[#f1c40f]/10"
                  onClick={() => toggleCompany(companyName)}
                >
                  <div className="flex items-center gap-2 text-[#f1c40f] font-semibold text-lg">
                    <ApartmentOutlined />
                    <span>{companyName}</span>
                  </div>
                  {isOpen ? (
                    <CaretUpOutlined className="text-[#f1c40f]" />
                  ) : (
                    <CaretDownOutlined className="text-[#f1c40f]" />
                  )}
                </div>

                {isOpen && (
                  <div className="p-4 flex flex-col gap-2">
                    {posts.map((post) => (
                      <div
                        key={post._id}
                        onClick={(e) =>
                          handleProductClick(e, post._id, companyName)
                        }
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-[#f1c40f]/20 hover:text-[#f1c40f] cursor-pointer transition-all"
                      >
                        <CarryOutOutlined />
                        <span className="text-sm font-medium">
                          {post.job_catagory}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </AntdCards>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedJobs;
