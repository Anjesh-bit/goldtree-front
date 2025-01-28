import { Link, useNavigate } from 'react-router-dom';
import AntdBreadCum from '../../../../../shared/components/AntdBreadCum';
import AntdCards from '../../../../../shared/components/AntdCards';
import { useGetAllShortListedCandidates } from '../../../../../services/employee/setUp';
import Loading from '../../../../../assets/svg/loading.svg';
import { isAuthenticated } from '../../../../../shared/utils/auth';
import { EmptyState } from '../../components/emptyState';

const ShortlistCandidate = () => {
  const navigate = useNavigate();

  const { data, isPending } = useGetAllShortListedCandidates(
    isAuthenticated()?.id
  );

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <img src={Loading} />
      </div>
    );
  }

  const isEmpty = !data;
  if (isEmpty)
    return (
      <EmptyState message="There is no any shortlisted candidates found." />
    );

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-4">
      <AntdBreadCum array={['Employee', 'ShortListed Candidates']} />
      <div className="grid grid-cols-12 gap-4">
        <h2 className="col-span-12 text-2xl md:text-3xl font-medium text-[#3d2462] mb-4">
          Shortlisted Candidates
        </h2>
        {data?.map((items) => {
          const { profile, experience, postId, companyName } = items;

          return (
            <AntdCards
              onClick={() => navigate(`/jobs/${companyName}/${postId}`)}
              key={items._id}
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition-colors"
            >
              <Link className="block">
                <div className="text-md font-medium text-[#3d2462] mb-2">
                  Name:{' '}
                  <span className="font-normal">
                    {profile?.full_name || 'N/A'}
                  </span>
                </div>
                <div className="text-md font-medium text-gray-800 mb-1">
                  Phone:{' '}
                  <span className="font-normal">
                    {profile?.phone_no || 'N/A'}
                  </span>
                </div>

                <div className="text-md font-medium text-gray-800 mb-1">
                  Permanent Address:{' '}
                  <span className="font-normal">
                    {profile?.permanent_addr || 'N/A'}
                  </span>
                </div>
                <div className="text-md font-medium text-gray-800 mb-1">
                  Current Address:{' '}
                  <span className="font-normal">
                    {profile?.current_addr || 'N/A'}
                  </span>
                </div>

                {experience && (
                  <div className="text-md font-medium text-gray-800 mb-1">
                    Designation:{' '}
                    <span className="font-normal">
                      {experience?.designation || 'N/A'}
                    </span>
                  </div>
                )}

                <div className="text-md font-medium text-gray-800 mt-1">
                  Resume:{' '}
                  <a
                    href={items.upload_cv}
                    target="_blank"
                    download={items.upload_cv?.substring(
                      items.upload_cv.lastIndexOf('/') + 1
                    )}
                  >
                    Download
                  </a>
                </div>
              </Link>
            </AntdCards>
          );
        })}
      </div>
    </div>
  );
};

export default ShortlistCandidate;
