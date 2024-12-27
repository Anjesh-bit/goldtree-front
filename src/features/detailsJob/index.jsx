import { useNavigate, useParams } from 'react-router-dom';
import { useGetSinglePost } from '../../services/employee/setUp';
import AntdCards from '../../shared/components/AntdCards';
import { Tag, Skeleton } from 'antd';
import { useState } from 'react';
import { ViewForm } from './ViewForm';
import { useSavedJobs } from '../../services/jobSeeker/setUp';
import useMessage from '../../hooks/useMessage';
import useAuthHook from '../../hooks/useAuthHook';
import { AppConstant } from '../../shared/constants';
import dayjs from 'dayjs';
import AntdButton from '../../shared/components/AntdButtons';

const JOB_STATUS = { CLOSED: 'closed' };

const DetailJobView = () => {
  const isAuthenticated = useAuthHook(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState({ open: false });
  const [id, setId] = useState('');
  const params = useParams();

  const {
    data: singlePostData,
    isLoading: singlePostLoading,
    isError: singlePostError,
  } = useGetSinglePost(params?.id, isAuthenticated?.id);

  const { mutateAsync, isPending, isError } = useSavedJobs(
    id,
    isAuthenticated?.id
  );
  const { contextHolder, showMessage } = useMessage();

  const handleClick = (e, filter, id) => {
    e.preventDefault();

    const isEasyApply = filter === 'easy';
    const isDirectApply = filter === 'direct';

    if (!isAuthenticated && isDirectApply) {
      navigate('/auth/login', {
        state: {
          redirectTo: `/jobs/${singlePostData?.company_name}/${singlePostData?._id}`,
        },
      });
      return;
    }

    const isSaveJobs = filter === 'saveJobs';

    if (isAuthenticated && isSaveJobs) {
      setId(id);
      const savedJobs = async () => {
        try {
          await mutateAsync();
          showMessage({
            type: 'success',
            content: 'The job has been successfully saved.',
            className: 'mt-[30vh] h-[40px]',
          });
        } catch (error) {
          const apiMessage = error?.response?.data?.message;
          if (apiMessage) {
            showMessage({
              type: 'info',
              content: apiMessage,
              className: 'mt-[30vh] h-[40px]',
            });
          }
        }
      };
      savedJobs();
    } else {
      const postData = isEasyApply
        ? singlePostData?._id
        : [singlePostData?._id, singlePostData?.company_name];

      setOpen({
        open: true,
        data: postData,
        isApplyNow: !isEasyApply,
        isSaveJobs,
      });
    }
  };

  if (singlePostLoading && !singlePostError) {
    return (
      <div className="px-6 py-4">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  const applyBeforeDate = dayjs(singlePostData?.timestamp).add(
    singlePostData?.apply_before,
    'day'
  );

  return (
    <>
      {contextHolder}
      <div className="p-4 md:p-8 lg:p-12 xl:p-[48px] space-y-6">
        <AntdCards className="p-6 bg-white  rounded-lg shadow-md border border-gray-200">
          <h1 className="text-3xl font-bold text-[#08142c]">
            {singlePostData?.company_name}
          </h1>
          <p className="text-lg text-gray-800">
            {singlePostData?.job_location}
          </p>
          <p className="text-lg text-gray-800">
            {singlePostData?.industry_type}
          </p>
          <div
            className="mt-4 text-gray-700"
            dangerouslySetInnerHTML={{
              __html: singlePostData?.company_description,
            }}
          />
          {isAuthenticated?.type === AppConstant.JOB_SEEKER && (
            <AntdButton
              classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors mt-4"
              onClick={(e) => handleClick(e, 'saveJobs', singlePostData?._id)}
            >
              Save Job
            </AntdButton>
          )}
        </AntdCards>

        <AntdCards className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#08142c]">
              {singlePostData?.job_title}
            </h2>
            <span className="text-sm text-gray-600">
              {singlePostData?.status === JOB_STATUS.CLOSED ? (
                <div className="text-[#FF0000]">Closed</div>
              ) : (
                `Apply Before: ${applyBeforeDate.format('MMMM D, YYYY')}`
              )}
            </span>
          </div>

          <div className="text-gray-700">
            <h3 className="text-xl font-semibold mb-2">Job Summary:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>No. of Vacancy: {singlePostData?.no_of_vacancy}</div>
              <div>Job Type: {singlePostData?.job_type}</div>
              <div>Offered Salary: {singlePostData?.salary}</div>
              <div>
                Gender:{' '}
                {singlePostData?.gender === 'm'
                  ? 'Male'
                  : singlePostData?.gender === 'f'
                    ? 'Female'
                    : 'Others'}
              </div>
              <div>Career Level: {singlePostData?.job_level}</div>
              <div>Experience: {singlePostData?.exp_required}</div>
              <div className="col-span-full">
                Skills:{' '}
                {singlePostData?.skills?.map((skill) => (
                  <Tag
                    key={skill}
                    color={`#${Math.floor(Math.random() * 16777215)
                      .toString(16)
                      .padStart(6, '0')}`}
                    className="mr-2 mb-2"
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </AntdCards>

        <AntdCards className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-[#08142c] mb-2">
            Job Description:
          </h3>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: singlePostData?.job_desc }}
          />
        </AntdCards>

        <AntdCards className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-[#08142c] mb-2">
            Job Benefits:
          </h3>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: singlePostData?.job_benefits }}
          />
        </AntdCards>

        <AntdCards className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-[#08142c] mb-2">
            Required Knowledge, Skills, and Abilities:
          </h3>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: singlePostData?.job_spec }}
          />
        </AntdCards>

        <AntdCards className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-[#08142c] mb-2">
            Education + Experience:
          </h3>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{
              __html: singlePostData?.education_qual_desc,
            }}
          />
        </AntdCards>

        {((singlePostData?.is_apply_instruction === 'm' &&
          isAuthenticated?.type === AppConstant.JOB_SEEKER) ||
          !isAuthenticated) && (
          <AntdCards className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <p className="text-gray-800">
              Interested candidates fulfilling the mentioned criteria are
              encouraged to apply using the Easy Apply Button below. Registered
              candidates may also apply using the Apply Now Button.
            </p>

            <div className="flex gap-4 mt-4">
              <AntdButton
                classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors"
                onClick={(e) => handleClick(e, 'easy')}
              >
                Easy Apply
              </AntdButton>
              <AntdButton
                classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors"
                onClick={(e) => handleClick(e, 'direct')}
              >
                Apply Now
              </AntdButton>
            </div>
          </AntdCards>
        )}

        <ViewForm open={open} setOpen={(e) => setOpen(e)} />
      </div>
    </>
  );
};

export default DetailJobView;
