import DynamicTitle from '../../../shared/components/DynamicTitle';
import AntdCards from '../../../shared/components/AntdCards';
import { useGetAllPosts } from '../../../services/employee/setUp';
import { Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const { Panel } = Collapse;

const FeaturedJobs = () => {
  const navigate = useNavigate();
  const { data: allPostsData } = useGetAllPosts();

  const postsByCompany = useMemo(() => {
    const result = {};
    allPostsData?.forEach((postsItems) => {
      const firstPost = postsItems.posts.find((post) => post.company_name);
      if (!firstPost) return;

      const companyName = firstPost.company_name;
      if (!result[companyName]) result[companyName] = [];
      result[companyName].push(...postsItems.posts);
    });
    return result;
  }, [allPostsData]);

  const handleProductClick = (e, id, name) => {
    e.preventDefault();
    if (id) {
      navigate(`/jobs/${name}/${id}`);
    }
  };

  return (
    <div className="bg-[#f0f4f8] p-4 md:p-8 lg:p-12 xl:p-[48px] py-6">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <DynamicTitle classNames="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#08142c]">
          Latest Featured Jobs
        </DynamicTitle>
        <p className="text-sm md:text-base lg:text-lg text-gray-800 mt-2">
          Searching for your dream job is easier than ever. Explore featured
          jobs and find the one that suits you best.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(postsByCompany).map(([companyName, posts]) => (
          <AntdCards
            key={companyName}
            className="bg-white rounded-lg shadow-md border-none"
          >
            <Collapse
              className="bg-white border-none rounded-lg shadow-md"
              accordion
            >
              <Panel
                header={
                  <div className="text-lg lg:text-xl font-semibold text-[#08142c]">
                    {companyName}
                  </div>
                }
                key={companyName}
                className="rounded-lg"
              >
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="py-2 px-4 rounded-lg cursor-pointer hover:bg-[#e8f4f9] hover:text-[#00b6b4] transition-colors"
                    onClick={(e) =>
                      handleProductClick(e, post._id, companyName)
                    }
                  >
                    <div className="text-sm lg:text-base font-medium text-gray-800">
                      {post.job_catagory}
                    </div>
                  </div>
                ))}
              </Panel>
            </Collapse>
          </AntdCards>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;
