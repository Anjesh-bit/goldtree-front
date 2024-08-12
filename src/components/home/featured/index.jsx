import DynamicTitle from "../../../common/DynamicTitle";
import AntdCards from "../../../common/AntdCards";
import { useGetAllPosts } from "../../../services/employee/setUp";
import { Collapse } from "antd";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;

const FeaturedJobs = () => {
  const navigate = useNavigate();
  const {
    data: allPostsData,
    isLoading: allPostPending,
    isError: allPostsError,
  } = useGetAllPosts();

  const tempObj = {};

  const handleProductClick = (e, id, name) => {
    e.preventDefault();
    if (id) {
      navigate(`/jobs/${name}/${id}`);
    }
  };

  return (
    <div className="bg-[#f0f4f8] px-4 md:px-8 lg:px-12 xl:px-16 py-6">
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
        {allPostsData?.map((postsItems) => {
          const companyName = postsItems.posts[0]?.company_name || "Unknown";
          tempObj[companyName] = postsItems?.posts;

          return Object.entries(tempObj).map(([companyName, posts]) => (
            <AntdCards
              key={companyName}
              className="bg-white rounded-lg shadow-md border-none"
            >
              <Collapse className="bg-white">
                <Panel
                  header={
                    <div className="text-xl font-semibold text-[#08142c] bg-white">
                      {companyName}
                    </div>
                  }
                  key={companyName}
                >
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="py-2 cursor-pointer hover:bg-[#e8f4f9] hover:text-[#00b6b4] transition-colors"
                      onClick={(e) =>
                        handleProductClick(e, post._id, companyName)
                      }
                    >
                      <div className="text-sm font-medium text-gray-800">
                        {post.job_catagory}
                      </div>
                    </div>
                  ))}
                </Panel>
              </Collapse>
            </AntdCards>
          ));
        })}
      </div>
    </div>
  );
};

export default FeaturedJobs;
