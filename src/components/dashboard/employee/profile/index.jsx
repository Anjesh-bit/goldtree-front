import { Form } from "antd";
import AntdBreadCum from "../../../../common/AntdBreadCum";
import AntdButton from "../../../../common/AntdButtons";
import PrimaryContactInfo from "./PrimaryContactInfo";
import ProfileInfo from "./ProfileInfo";
import SocialNetworks from "./SocialNetwork";

import {
  useGetProfileInfo,
  useProfileInfo,
  useUpdateProfile,
} from "../../../../services/employee/setUp";

import { useEffect, useState } from "react";
import useAuthHook from "../../../../hooks/useAuthHook";

const { useForm } = Form;

const Profile = () => {
  const [form] = useForm();
  const isAuthenticated = useAuthHook(false);
  const [ckValue, setCKValue] = useState("");
  const {
    isError: empError,
    isPending: empLoading,
    mutateAsync: empMutate,
  } = useProfileInfo();

  const {
    mutateAsync: empMutateUpdate,
    isError: empErrorUpdate,
    isPending: empLoadingUpdate,
  } = useUpdateProfile(isAuthenticated?.id);

  const { data: profileData, isError: profileErr } = useGetProfileInfo(
    isAuthenticated?.id
  );

  const isEmpty = profileData?.length > 0;
  const ckData = profileData?.[0]?.personalInfo?.description;

  useEffect(() => {
    if (isEmpty) {
      delete profileData[0]._id;
      delete profileData[0].userId;
      Object.keys(profileData[0]).forEach((key) => {
        for (const subKey in profileData[0][key]) {
          form.setFieldsValue({ [subKey]: profileData[0][key][subKey] });
        }
      });
    }
  }, [profileData, form, isEmpty]);

  const handleOnFinish = async (values) => {
    try {
      const profileData = {
        userId: isAuthenticated?.id,
        personalInfo: {
          company_name: values.company_name,
          alt_company_name: values.alt_company_name,
          company_type: values.company_type,
          business_type: values.business_type,
          company_size: values.company_size,
          location: values.location,
          description: ckValue,
          head_person_name: values.head_person_name,
          head_person_pos: values.head_person_pos,
        },
        socialLink: {
          fb_link: values.fb_link,
          ig_link: values.ig_link,
          linkedin_link: values.linkedin_link,
          twitter_link: values.twitter_link,
        },
        primaryContact: {
          full_name: values.full_name,
          address_1: values.address_1,
          address_2: values.address_2,
          phone: values.phone,
          alt_phone: values.alt_phone,
          fax: values.fax,
          po_box: values.po_box,
          email: values.email,
          sec_email: values.sec_email,
          website: values.website,
        },
      };

      if (isEmpty) {
        await empMutate(profileData);
      } else {
        await empMutateUpdate(profileData);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <Form
      onFinish={handleOnFinish}
      form={form}
      layout="vertical"
      className="p-6 space-y-6"
    >
      <AntdBreadCum array={["Employee", "Profile"]} className="mb-6" />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <PrimaryContactInfo setCKValue={setCKValue} data={ckData} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <SocialNetworks />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <ProfileInfo />
      </div>

      <div className="flex justify-end">
        <AntdButton
          loading={
            empError || empErrorUpdate ? false : empLoadingUpdate || empLoading
          }
          htmlType="submit"
          classNames="bg-[#3d2462] !border-none text-white px-7 h-10"
        >
          {isEmpty ? "Update" : "Save"}
        </AntdButton>
      </div>
    </Form>
  );
};

export default Profile;
