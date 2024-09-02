import { Form } from 'antd';
import AntdBreadCum from '../../../../common/AntdBreadCum';
import AntdButton from '../../../../common/AntdButtons';
import PrimaryContactInfo from './PrimaryContactInfo';
import ProfileInfo from './ProfileInfo';
import SocialNetworks from './SocialNetwork';

import {
  useGetProfileInfo,
  useProfileInfo,
  useUpdateProfile,
} from '../../../../services/employee/setUp';

import { useEffect, useState } from 'react';
import useAuthHook from '../../../../hooks/useAuthHook';
import DynamicTitle from '../../../../common/DynamicTitle';

const { useForm } = Form;

const Profile = () => {
  const [form] = useForm();
  const isAuthenticated = useAuthHook(false);
  const [ckValue, setCKValue] = useState('');
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

  const { data: profileData } = useGetProfileInfo(isAuthenticated?.id);

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
    } catch (error) {}
  };

  return (
    <Form
      onFinish={handleOnFinish}
      form={form}
      layout="vertical"
      className="space-y-6"
    >
      <AntdBreadCum array={['Employee', 'Profile']} className="mb-6" />

      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md">
        <DynamicTitle classNames="text-xl md:text-2xl font-medium text-[#3d2462] mb-4">
          Primary Contact Information
        </DynamicTitle>
        <PrimaryContactInfo setCKValue={setCKValue} data={ckData} />
      </div>

      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md">
        <DynamicTitle classNames="text-xl md:text-2xl font-medium text-[#3d2462] mb-4">
          Social Networks
        </DynamicTitle>
        <SocialNetworks />
      </div>

      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md">
        <DynamicTitle classNames="text-xl md:text-2xl font-medium text-[#3d2462] mb-4">
          Profile Information
        </DynamicTitle>
        <ProfileInfo />
      </div>

      <div className="flex justify-end mt-6">
        <AntdButton
          loading={
            empError || empErrorUpdate ? false : empLoadingUpdate || empLoading
          }
          htmlType="submit"
          classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors"
        >
          {isEmpty ? 'Update' : 'Save'}
        </AntdButton>
      </div>
    </Form>
  );
};

export default Profile;
