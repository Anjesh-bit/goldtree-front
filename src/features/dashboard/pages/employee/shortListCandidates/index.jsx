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
        <img src={Loading} alt="Loading..." />
      </div>
    );
  }

  const isEmpty = !data || data.length === 0;
  if (isEmpty) {
    return <EmptyState message="There are no shortlisted candidates found." />;
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen py-6 px-4 md:px-8 lg:px-12">
      <AntdBreadCum array={['Employee', 'Shortlisted Candidates']} />

      <h2 className="text-2xl md:text-3xl font-semibold text-[#08142c] mb-6">
        Shortlisted Candidates
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((items) => {
          const { profile, experience, postId, companyName } = items;
          const resumeName = items.upload_cv?.substring(
            items.upload_cv?.lastIndexOf('/') + 1
          );

          return (
            <AntdCards
              key={items._id}
              onClick={() => navigate(`/jobs/${companyName}/${postId}`)}
              className="
                p-5
                bg-white
                rounded-xl
                border border-gray-200
                shadow
                hover:shadow-lg
                hover:bg-[#fdf6e3]
                transition-all
                cursor-pointer
              "
            >
              <div className="text-lg font-semibold text-[#08142c] mb-2">
                {profile?.full_name || 'Unnamed Candidate'}
              </div>

              <div className="text-sm text-gray-700 mb-1">
                <span className="font-semibold text-[#08142c]">Phone:</span>{' '}
                {profile?.phone_no || 'N/A'}
              </div>

              <div className="text-sm text-gray-700 mb-1">
                <span className="font-semibold text-[#08142c]">
                  Permanent Address:
                </span>{' '}
                {profile?.permanent_addr || 'N/A'}
              </div>

              <div className="text-sm text-gray-700 mb-1">
                <span className="font-semibold text-[#08142c]">
                  Current Address:
                </span>{' '}
                {profile?.current_addr || 'N/A'}
              </div>

              {experience && (
                <div className="text-sm text-gray-700 mb-1">
                  <span className="font-semibold text-[#08142c]">
                    Designation:
                  </span>{' '}
                  {experience?.designation || 'N/A'}
                </div>
              )}

              <div className="text-sm text-gray-700 mt-2">
                <span className="font-semibold text-[#08142c]">Resume:</span>{' '}
                <a
                  href={items.upload_cv}
                  target="_blank"
                  rel="noreferrer"
                  download={resumeName}
                  className="underline text-[#f1c40f] hover:text-[#d4b80e]"
                >
                  {resumeName || 'Download'}
                </a>
              </div>
            </AntdCards>
          );
        })}
      </div>
    </div>
  );
};

export default ShortlistCandidate;
