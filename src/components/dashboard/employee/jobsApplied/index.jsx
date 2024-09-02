import { Fragment, useState } from 'react';
import AntdCards from '../../../../common/AntdCards';
import { useGetEasyApply } from '../../../../services/jobSeeker/setUp';
import AntdButton from '../../../../common/AntdButtons';
import { useShortList } from '../../../../services/commonService/setUp';
import useMessage from '../../../../hooks/useMessage';
import Loading from '../../../../assets/svg/loading.svg';

const JobApplied = () => {
  const { data, isLoading } = useGetEasyApply();
  const [queryParams, setQueryParams] = useState({
    uploadId: '',
    type: '',
  });

  const { mutateAsync } = useShortList(queryParams);

  const { contextHolder, showMessage } = useMessage();

  const handleOnClick = async (_, uploadId, type) => {
    setQueryParams({
      shortList: 'shortlist',
      uploadId: uploadId,
      type,
    });

    try {
      await mutateAsync();
      showMessage({
        type: 'info',
        content: 'Candidates have successfully shortlisted',
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
        <img src={Loading} />
      </div>
    );
  }

  return (
    <Fragment>
      {contextHolder}
      <div className="bg-[#f5f5f5] min-h-screen">
        <div className="grid grid-cols-12 gap-4 p-4">
          <div className="col-span-12 mb-6">
            <h2 className="text-2xl md:text-3xl font-medium text-[#3d2462] mb-4">
              Job Applied
            </h2>
          </div>
          {data?.map((items) => {
            const jobTitle = items?.post?.job_title;

            return (
              <div className="col-span-12 mb-4" key={items.email}>
                <div className="text-lg font-semibold text-[#3d2462] mb-2">
                  Job Title: <span className="font-normal">{jobTitle}</span>
                </div>
                <AntdCards className="p-4 bg-white rounded-lg shadow-md">
                  <div className="font-semibold text-md text-[#3d2462] mb-2">
                    Candidates Applied:
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    {items?.candidates?.map((candidate) => {
                      const url = candidate?.upload_cv?.substring(
                        candidate?.upload_cv?.lastIndexOf('/') + 1
                      );
                      const { jobSeekerProfile = [] } = candidate;
                      const hasProfile = jobSeekerProfile.length > 0;

                      const { profile } = hasProfile ? jobSeekerProfile[0] : {};
                      const name = profile?.full_name || candidate.name;
                      const phoneNo = profile?.phone_no || candidate.email;

                      return (
                        <AntdCards
                          className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-4 bg-white rounded-lg shadow-md hover:bg-gray-300"
                          key={candidate._id}
                        >
                          <AntdButton
                            classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors"
                            onClick={(e) =>
                              handleOnClick(e, candidate._id, candidate.type)
                            }
                          >
                            ShortList
                          </AntdButton>
                          <div className="text-md font-medium text-[#3d2462] mt-2">
                            Name: {name}
                          </div>
                          <div className="text-md font-medium text-gray-800 mt-1">
                            Cover Letter: {candidate.cover_letter}
                          </div>
                          <div className="text-md font-medium text-gray-800 mt-1">
                            Email / Phone: {phoneNo}
                          </div>
                          <div className="text-md font-medium text-gray-800 mt-1">
                            Resume:{' '}
                            <a
                              href={candidate.upload_cv}
                              download={url}
                              target="_blank"
                            >
                              {url}
                            </a>
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
      </div>
    </Fragment>
  );
};

export default JobApplied;
