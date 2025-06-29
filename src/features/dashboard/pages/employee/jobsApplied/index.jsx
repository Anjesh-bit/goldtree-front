import { Fragment, useState } from 'react';
import { useShortList } from '../../../../../services/commonService/setUp';
import useMessage from '../../../../../hooks/useMessage';
import Loading from '../../../../../assets/svg/loading.svg';
import { useGetEasyApply } from '../../../../../services/employee/setUp';
import AntdCards from '../../../../../shared/components/AntdCards';
import AntdButton from '../../../../../shared/components/AntdButtons';
import { isAuthenticated } from '../../../../../shared/utils/auth';
import { EmptyState } from '../../components/emptyState';
import { HIRING_STATUS } from './jobsApplied.constant';
import { filterHiringStatus } from '../../../dashboard.utils';

const getHiringStatus = (query) => {
  switch (query) {
    case HIRING_STATUS.ACCEPTED:
      return HIRING_STATUS.ACCEPTED;
    case HIRING_STATUS.REJECTED:
      return HIRING_STATUS.REJECTED;
    default:
      return HIRING_STATUS.PENDING;
  }
};

const JobApplied = () => {
  const { data, isLoading } = useGetEasyApply(isAuthenticated()?.id);
  const [queryParams, setQueryParams] = useState({
    uploadId: '',
    type: '',
  });

  const { mutateAsync, data: jobsAppliedCandidate = { message: '' } } =
    useShortList(queryParams);
  const { contextHolder, showMessage } = useMessage();

  const handleOnClick = async (_, uploadId, postId, type, status) => {
    setQueryParams({
      status: getHiringStatus(status),
      uploadId,
      postId,
      type,
    });

    try {
      await mutateAsync();
      showMessage({
        type: 'info',
        content: jobsAppliedCandidate.message,
        className: 'mt-[30vh] h-[40px]',
      });
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      showMessage({
        type: 'error',
        content: apiMessage,
        className: 'mt-[30vh] h-[40px]',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <img src={Loading} alt="Loading..." />
      </div>
    );
  }

  const isEmpty = data?.length === 0;
  if (isEmpty) {
    return (
      <EmptyState message="There are no applied candidates for your jobs yet." />
    );
  }

  return (
    <Fragment>
      {contextHolder}
      <div className="bg-[#f9f9f9] min-h-screen py-6 px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#08142c] mb-6">
          Job Applications Overview
        </h2>

        {data?.map((items) => {
          const jobTitle = items?.post?.job_title;

          return (
            <div className="mb-10" key={items.email}>
              <h3 className="text-xl font-semibold text-[#08142c] mb-3">
                Job Title: <span className="font-normal">{jobTitle}</span>
              </h3>

              <AntdCards className="p-6 bg-white rounded-xl border border-gray-200 shadow-md">
                <div className="font-semibold text-lg text-[#08142c] mb-4">
                  Candidates Applied:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items?.candidates?.map((candidate) => {
                    const url = candidate?.upload_cv?.substring(
                      candidate?.upload_cv?.lastIndexOf('/') + 1
                    );
                    const { jobSeekerProfile = [] } = candidate;
                    const isShortListed = candidate.shortlisted;
                    const isAccepted =
                      candidate.status === HIRING_STATUS.ACCEPTED;
                    const isRejected =
                      candidate.status === HIRING_STATUS.REJECTED;
                    const isFinalStatus = isAccepted || isRejected;

                    const hasProfile = jobSeekerProfile.length > 0;

                    const name = hasProfile
                      ? jobSeekerProfile[0]?.profile?.full_name
                      : candidate.name;
                    const phoneNo = hasProfile
                      ? jobSeekerProfile[0]?.profile?.phone_no
                      : candidate.email;

                    const { className, text } = filterHiringStatus(
                      candidate.status
                    );

                    return (
                      <AntdCards
                        key={candidate._id}
                        className="
                          p-4
                          bg-white
                          rounded-xl
                          border border-gray-200
                          shadow
                          hover:shadow-lg
                          transition-all
                          cursor-pointer
                          hover:bg-[#fdf6e3]
                        "
                      >
                        {!isShortListed && (
                          <AntdButton
                            classNames="
                              bg-[#f1c40f]
                              text-black
                              font-semibold
                              px-4
                              py-1
                              rounded
                              mb-3
                              hover:brightness-110
                              transition-all
                            "
                            onClick={(e) =>
                              handleOnClick(
                                e,
                                candidate.userId,
                                candidate.postId,
                                candidate.type,
                                HIRING_STATUS.PENDING
                              )
                            }
                          >
                            Shortlist
                          </AntdButton>
                        )}

                        {isShortListed && (
                          <div className="flex gap-3 mb-3">
                            <AntdButton
                              disabled={isFinalStatus}
                              classNames={`
                                bg-[#08142c]
                                text-white
                                font-semibold
                                px-4
                                py-1
                                rounded
                                ${!isFinalStatus ? 'hover:bg-[#0a223f]' : 'opacity-50 cursor-not-allowed'}
                              `}
                              onClick={(e) =>
                                handleOnClick(
                                  e,
                                  candidate.userId,
                                  candidate.postId,
                                  candidate.type,
                                  HIRING_STATUS.ACCEPTED
                                )
                              }
                            >
                              Accept
                            </AntdButton>

                            <AntdButton
                              disabled={isFinalStatus}
                              classNames={`
                                bg-[#08142c]
                                text-white
                                font-semibold
                                px-4
                                py-1
                                rounded
                                ${!isFinalStatus ? 'hover:bg-[#0a223f]' : 'opacity-50 cursor-not-allowed'}
                              `}
                              onClick={(e) =>
                                handleOnClick(
                                  e,
                                  candidate.userId,
                                  candidate.postId,
                                  candidate.type,
                                  HIRING_STATUS.REJECTED
                                )
                              }
                            >
                              Reject
                            </AntdButton>
                          </div>
                        )}

                        <div className="text-md font-medium text-[#08142c]">
                          Name: {name}
                        </div>
                        <div className="text-md text-gray-700">
                          Cover Letter: {candidate.cover_letter}
                        </div>
                        <div className="text-md text-gray-700">
                          Email / Phone: {phoneNo}
                        </div>
                        <div className="text-md text-gray-700">
                          Resume:{' '}
                          <a
                            href={candidate.upload_cv}
                            download={url}
                            target="_blank"
                            rel="noreferrer"
                            className="underline text-[#f1c40f] hover:text-[#d4b80e]"
                          >
                            {url}
                          </a>
                        </div>

                        <div className="mt-2">
                          <span
                            className={`
                              inline-block
                              px-3
                              py-1
                              rounded-full
                              text-sm
                              font-semibold
                              ${className}
                              ${text === 'Accepted' && 'bg-[#f1c40f]/20 text-[#f1c40f]'}
                              ${text === 'Rejected' && 'bg-red-100 text-red-600'}
                              ${text === 'Pending' && 'bg-gray-100 text-gray-800'}
                            `}
                          >
                            {text}
                          </span>
                        </div>
                      </AntdCards>
                    );
                  })}
                </div>
              </AntdCards>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default JobApplied;
