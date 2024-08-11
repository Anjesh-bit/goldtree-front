import Profile from "./profileInfo/profile";
import Experience from "./profileInfo/experience";
import TrainingCertification from "./profileInfo/trainingCertification";
import AntdButton from "../../../../common/AntdButtons";
import DynamicTitle from "../../../../common/DynamicTitle";
import { Avatar, Form } from "antd";
import Education from "./profileInfo/education";
import { useEffect, useMemo, useState } from "react";
import {
  useGetProfileInfo,
  useProfileInfo,
  useUpdateProfileInfo,
} from "../../../../services/jobSeeker/setUp";
import useMessage from "../../../../hooks/useMessage";
import dayjs from "dayjs";
import useAuthHook from "../../../../hooks/useAuthHook";

const { useForm } = Form;

const MyProfile = () => {
  const [form] = useForm();
  const isAuthenticated = useAuthHook(false);
  const { contextHolder, showMessage } = useMessage();

  const { data: profileData, isError: profileErr } = useGetProfileInfo(
    isAuthenticated?.id
  );

  const {
    mutateAsync: jobSeekerMutate,
    isPending: profilePending,
    isSuccess: profileSuccess,
  } = useProfileInfo();

  const {
    mutateAsync: jobSeekerMutateUpdate,
    isError: jobSeErrorUpdate,
    isPending: jobSeLoadingUpdate,
  } = useUpdateProfileInfo(isAuthenticated?.id);

  const profile = useMemo(() => {
    const [firstProfile = {}] = Array.isArray(profileData) ? profileData : [];
    return firstProfile;
  }, [profileData]);

  const isEmpty = Object.keys(profile).length > 0;

  const [inputValue, setInputValue] = useState({
    editor: "",
    dob: dayjs(),
    from: dayjs(),
    to: dayjs(),
    passedYear: dayjs(),
    toCourse: dayjs(),
    fromCourse: dayjs(),
  });

  useEffect(() => {
    if (profile) {
      setInputValue({
        editor: profile.experience?.description ?? "",
        dob: profile.profile?.dob ? dayjs(profile.profile.dob) : dayjs(),
        from: profile.experience?.from
          ? dayjs(profile.experience.from)
          : dayjs(),
        to: profile.experience?.to ? dayjs(profile.experience.to) : dayjs(),
        passedYear: profile.education?.passed_year
          ? dayjs(profile.education.passed_year)
          : dayjs(),
        toCourse: profile.trainingCert?.to_course
          ? dayjs(profile.trainingCert.to_course)
          : dayjs(),
        fromCourse: profile.trainingCert?.from_course
          ? dayjs(profile.trainingCert.from_course)
          : dayjs(),
      });
    }
  }, [profile]);

  const handleDetails = async (values) => {
    try {
      const profileFinalData = {
        userId: isAuthenticated?.id,
        profile: {
          full_name: values.full_name,
          dob: inputValue.dob,
          nationality: values.nationality,
          permanent_addr: values.permanent_addr,
          current_addr: values.current_addr,
          phone_no: values.phone_no,
          gender: values.gender,
          marital_status: values.marital_status,
        },
        experience: {
          designation: values.designation,
          from: inputValue.from,
          to: inputValue.to,
          company: values.company,
          addr: values.addr,
          job_level: values.job_level,
          mob_no: values.mob_no,
          description: inputValue.editor,
          currently_working: values.currently_working,
        },
        education: {
          level: values.level,
          degree: values.degree,
          board: values.board,
          institution: values.institution,
          specialization: values.specialization,
          current_running: values.current_running,
          gpa: values.gpa,
          passed_year: inputValue.passedYear,
        },
        trainingCert: {
          course_name: values.course_name,
          institute: values.institute,
          to_course: inputValue.toCourse,
          from_course: inputValue.fromCourse,
        },
      };

      if (!isEmpty) {
        await jobSeekerMutate(profileFinalData);
      } else {
        await jobSeekerMutateUpdate(profileFinalData);
      }

      if (profileSuccess) {
        showMessage({
          type: "success",
          content: "Your profile has been successfully saved.",
          className: "mt-4",
        });
      }
    } catch (e) {}
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        initialValues={{
          ...profile.profile,
          ...profile.experience,
          ...profile.education,
          ...profile.trainingCert,
        }}
        onFinish={handleDetails}
        layout="vertical"
        className="p-4 md:p-6 lg:p-8 xl:p-10 space-y-6"
      >
        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <DynamicTitle classNames="text-xl md:text-2xl font-medium text-[#3d2462] mb-4 md:mb-0">
              Personal Information
            </DynamicTitle>
            <Avatar src={profile?.profile_images} size={100} />
          </div>

          <Profile
            setInputValue={setInputValue}
            inputValue={inputValue}
            dayjs={dayjs}
          />
        </div>

        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md">
          <DynamicTitle classNames="text-xl md:text-2xl font-medium text-[#3d2462] mb-4">
            Experience
          </DynamicTitle>
          <Experience
            setInputValue={setInputValue}
            inputValue={inputValue}
            dayjs={dayjs}
          />
        </div>

        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md">
          <DynamicTitle classNames="text-xl md:text-2xl font-medium text-[#3d2462] mb-4">
            Education
          </DynamicTitle>
          <Education
            setInputValue={setInputValue}
            inputValue={inputValue}
            dayjs={dayjs}
          />
        </div>

        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md">
          <DynamicTitle classNames="text-xl md:text-2xl font-medium text-[#3d2462] mb-4">
            Training And Certifications
          </DynamicTitle>
          <TrainingCertification
            setInputValue={setInputValue}
            inputValue={inputValue}
            dayjs={dayjs}
          />
        </div>

        <div className="flex justify-end mt-6">
          <AntdButton
            classNames="bg-[#242021] !border-none text-white px-6 py-2 h-10"
            htmlType="submit"
            loading={
              profileErr || jobSeErrorUpdate
                ? false
                : profilePending || jobSeLoadingUpdate
            }
          >
            Submit
          </AntdButton>
        </div>
      </Form>
    </>
  );
};

export default MyProfile;
