import AntdBreadCum from '../../../../../shared/components/AntdBreadCum';
import Inputs from '../../../../../shared/components/form/AntdInputs';
import TextAreas from '../../../../../shared/components/form/AntdTextArea';
import CkEditors from '../../../../../shared/components/CkEditor';
import AntdButton from '../../../../../shared/components/AntdButtons';
import { useEffect, useState } from 'react';
import { Form } from 'antd';
import {
  usePostJobs,
  useUpdatePostJobs,
} from '../../../../../services/employee/setUp';
import DynamicTitle from '../../../../../shared/components/DynamicTitle';
import { useLocation, useParams } from 'react-router-dom';
import { Selects } from '../../../../../shared/components/form/AntdSelects';
import { AntRadio } from '../../../../../shared/components/form/AntdRadioGroup';
import { isAuthenticated } from '../../../../../shared/utils/auth';
import {
  applyDirectOptions,
  applyInstruction,
  applyOnlineOptions,
  categoryType,
  degreeName,
  eduPreferences,
  expOptions,
  genderOptions,
  industryType,
  jobCategory,
  jobIndustry,
  jobLevel,
  jobTypeOptions,
  licenseOptions,
  salaryOptions,
  serviceType,
  skillsArr,
} from './posts.constant';
import useMessage from '../../../../../hooks/useMessage';

const { useForm } = Form;

const PostJobs = () => {
  const [value, setValue] = useState({ eQD: '', jD: '', jS: '', jB: '' });
  const location = useLocation();
  const params = useParams();

  const [form] = useForm();
  const {
    isPending: postJobPending,
    isError: postJobError,
    mutateAsync: postJobMutate,
  } = usePostJobs(isAuthenticated()?.id);
  const { mutateAsync: postUpdateMutate } = useUpdatePostJobs(params?.id);

  const postEditItems = location?.state?.data || null;
  const isMatchLocation = location.pathname === '/employee/dashboard/new-job';
  const { contextHolder, showMessage } = useMessage();

  const handleFinish = async (values) => {
    try {
      values.education_qual_desc = value.eQD;
      values.job_desc = value.jD;
      values.job_spec = value.jS;
      values.job_benifit = value.jB;
      values.userId = isAuthenticated()?.id;
      isMatchLocation
        ? await postJobMutate({ ...values })
        : await postUpdateMutate({ ...values });
      showMessage({
        type: 'success',
        content: 'The job has been successfully posted.',
        className: 'mt-[30vh] h-[40px]',
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCkEditor = (event, editor, filter) => {
    switch (filter) {
      case 'education-qualification':
        setValue({ ...value, eQD: editor.getData() });
        break;
      case 'job-description':
        setValue({ ...value, jD: editor.getData() });
        break;
      case 'job-specification':
        setValue({ ...value, jS: editor.getData() });
        break;
      default:
        setValue({ ...value, jB: editor.getData() });
    }
  };

  useEffect(() => {
    if (postEditItems) {
      for (const postKeys in postEditItems) {
        form.setFieldsValue({ [postKeys]: postEditItems[postKeys] });
      }
    }
    if (isMatchLocation) form.resetFields();
  }, [postEditItems]);

  return (
    <>
      {contextHolder}
      <Form onFinish={handleFinish} form={form}>
        <AntdBreadCum array={['Employee', 'Post Jobs']} />
        <div className="rounded-lg shadow-md bg-[#fff] p-4 md:p-6 lg:p-8">
          <DynamicTitle classNames="text-xl md:text-2xl font-medium text-[#3d2462]">
            Post A New Job
          </DynamicTitle>
          <div className="grid grid-cols-12 gap-4 p-4 md:p-6 lg:p-8">
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Selects
                className="w-full"
                Label="Category Type"
                name="catagory_type"
                description="name"
                value="name"
                array={categoryType}
                required
                valMessage={'This category type field is required.'}
              />
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Selects
                className="w-full"
                Label="Job Catagory"
                value="name"
                description="name"
                name="job_catagory"
                array={jobCategory}
                required
                valMessage={'This job category field is required.'}
              />
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Selects
                className="w-full"
                Label="Industry Type"
                name="industry_type"
                description="name"
                value="name"
                array={industryType}
                required
                valMessage={'This industry type field is required.'}
              />
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Selects
                className="w-full"
                Label="Job Industry"
                name="job_industry"
                description="name"
                value="name"
                array={jobIndustry}
                required
                valMessage={'This job industry field is required.'}
              />
            </div>

            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Inputs
                className="w-full"
                Label="Apply Before(in days)"
                name="apply_before"
                required
                valMessage={'This apply before field is required.'}
              />
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Inputs
                className="w-full"
                Label="Job Title"
                name="job_title"
                required
                valMessage={'This job title field is required.'}
              />
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Inputs
                className="w-full"
                Label="No.of Vacancy"
                name="no_of_vacancy"
                required
                valMessage={'This no. of vacancy field is required.'}
              />
            </div>

            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Selects
                className="w-full"
                Label="Job Type"
                name="job_type"
                description="name"
                value="name"
                array={serviceType}
                required
                valMessage={'This job type field is required.'}
              />
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Selects
                className="w-full"
                Label="Service Type"
                name="service_type"
                description="label"
                value="value"
                array={jobTypeOptions}
                required
                valMessage={'This service type field is required.'}
              />
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Selects
                className="w-full"
                Label="Job Level"
                name="job_level"
                description="name"
                value="value"
                array={jobLevel}
                required
                valMessage={'This job level field is required.'}
              />
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Inputs
                className="w-full"
                Label="Job Location"
                name="job_location"
                required
                valMessage={'This job location field is required.'}
              />
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Selects
                className="w-full"
                Label="Skills"
                name="skills"
                value="name"
                description="name"
                array={skillsArr}
                mode="multiple"
              />
            </div>
            <div className="col-span-12">
              <TextAreas rows="6" Label={'Job Purpose'} name="job_purpose" />
            </div>
            <div className="col-span-12">
              <AntRadio
                options={salaryOptions}
                Label="Salary"
                name="salary"
                required
                valMessage="This salary options is required."
              />
            </div>
            <div className="col-span-12">
              <AntRadio
                options={expOptions}
                Label="Experience Required"
                name="exp_required"
                required
                valMessage={'This experience field is required.'}
              />
            </div>
            <div className="col-span-12">
              <AntRadio
                options={licenseOptions}
                Label="Driving License"
                name="is_driving_license"
                initialValue={'n'}
              />
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Selects
                className="w-full"
                Label="Educational Preferences"
                name="edu_preferences"
                description="name"
                value="name"
                array={eduPreferences}
                required
                valMessage={'This education preferences field is required.'}
              />
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12">
              <Selects
                className="w-full"
                Label="Degree Name"
                name="degree_name"
                description="name"
                value="name"
                array={degreeName}
              />
            </div>
            <div className="col-span-12">
              <AntRadio options={genderOptions} Label="Gender" name="gender" />
            </div>
            <div className="col-span-12">
              <CkEditors
                Label={'Educational Qualification Description:'}
                onChange={(event, editor) =>
                  handleCkEditor(event, editor, 'education-qualification')
                }
                data={
                  isMatchLocation ? ' ' : postEditItems['education_qual_desc']
                }
              />
            </div>

            <div className="col-span-12">
              <CkEditors
                Label={'Job Description:'}
                onChange={(event, editor) =>
                  handleCkEditor(event, editor, 'job-description')
                }
                data={isMatchLocation ? ' ' : postEditItems['job_desc']}
              />
            </div>
            <div className="col-span-12">
              <CkEditors
                Label={'Job Specification:'}
                onChange={(event, editor) =>
                  handleCkEditor(event, editor, 'job-specification')
                }
                data={isMatchLocation ? ' ' : postEditItems['job_spec']}
              />
            </div>
            <div className="col-span-12">
              <CkEditors
                Label={'Job Benefits:'}
                onChange={(event, editor) =>
                  handleCkEditor(event, editor, 'job-benefits')
                }
                data={isMatchLocation ? ' ' : postEditItems['job_benifits']}
              />
            </div>
            <div className="sm:col-span-6 col-span-12">
              <AntRadio
                options={applyOnlineOptions}
                Label="Apply Online"
                name="is_online"
                initialValue={'n'}
              />
            </div>
            <div className="sm:col-span-6 col-span-12">
              <AntRadio
                options={applyDirectOptions}
                Label="Apply Direct"
                name="is_direct"
                initialValue={'n'}
              />
            </div>
            <div className="col-span-12">
              <AntRadio
                options={applyInstruction}
                Label="Apply Instruction"
                name="is_apply_instruction"
                initialValue={'n'}
              />
            </div>

            <div className="col-span-2">
              <AntdButton
                loading={postJobError ? false : postJobPending}
                htmlType={'submit'}
                classNames={
                  'bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors'
                }
              >
                {isMatchLocation ? 'Save' : 'Update'}
              </AntdButton>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default PostJobs;
