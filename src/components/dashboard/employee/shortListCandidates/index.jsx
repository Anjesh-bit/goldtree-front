import { Link } from 'react-router-dom';
import AntdBreadCum from '../../../../common/AntdBreadCum';
import AntdCards from '../../../../common/AntdCards';
import { useGetAllShortListedCandidates } from '../../../../services/employee/setUp';
import Loading from '../../../../assets/svg/loading.svg';
import useAuthHook from '../../../../hooks/useAuthHook';

const ShortlistCandidate = () => {
  const isAuthenticated = useAuthHook();
  const { data, isPending } = useGetAllShortListedCandidates(
    isAuthenticated?.id
  );

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <img src={Loading} />
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-4">
      <AntdBreadCum array={['Employee', 'ShortListed Candidates']} />
      <div className="grid grid-cols-12 gap-4">
        <h2 className="col-span-12 text-2xl md:text-3xl font-medium text-[#3d2462] mb-4">
          Shortlisted Candidates
        </h2>
        {data?.map((items) => (
          <AntdCards
            key={items.postId}
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition-colors"
          >
            <Link
              to={`/jobs/${items.postInfo.company_name}/${items.postId}`}
              className="block"
            >
              <div className="text-md font-medium text-[#3d2462] mb-2">
                Company Name:{' '}
                <span className="font-normal">
                  {items.postInfo.company_name}
                </span>
              </div>
              <div className="text-md font-medium text-gray-800 mb-1">
                Job Title:{' '}
                <span className="font-normal">{items.postInfo.job_title}</span>
              </div>
              <div className="text-md font-medium text-gray-800 mb-1">
                Job Location:{' '}
                <span className="font-normal">
                  {items.postInfo.job_location}
                </span>
              </div>
              <div className="text-md font-medium text-gray-800">
                Job Level:{' '}
                <span className="font-normal">{items.postInfo.job_level}</span>
              </div>
            </Link>
          </AntdCards>
        ))}
      </div>
    </div>
  );
};

export default ShortlistCandidate;
