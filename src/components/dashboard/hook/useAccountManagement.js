import { useForm } from 'antd/es/form/Form';
import useAuthHook from '../../../hooks/useAuthHook';
import { useNavigate } from 'react-router-dom';
import { useDeactivateAccount } from '../../../services/auth/deactivateAccount';
import { useLogout } from '../../../services/auth/login';
import { removeLocalStorage } from '../../../utils/localStorage';
import { AppConstant } from '../../../constant';
import { useState } from 'react';
import { useChangePassword } from '../../../services/auth/changePassword';
import useMessage from '../../../hooks/useMessage';

export const useAccountManagement = (pageType) => {
  const isAuth = useAuthHook(false);
  const [deactivateReason, setDeactivateReason] = useState('');
  const [form] = useForm();
  const { id, type } = isAuth;
  const { contextHolder, showMessage } = useMessage();
  const navigate = useNavigate();
  const { isPending, isError, mutateAsync } = useDeactivateAccount(id, type);
  const { mutateAsync: mutateAsyncLogout } = useLogout();
  const {
    isPending: isPendingChangePass,
    isError: isErrorChangePass,
    mutateAsync: mutateAsyncChangePass,
  } = useChangePassword(id, type);

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setDeactivateReason(value);
  };

  const handleOnFinish = async (values) => {
    try {
      pageType === AppConstant.DEACTIVATE_ACCOUNT
        ? await mutateAsync(deactivateReason)
        : await mutateAsyncChangePass({ ...values });
      removeLocalStorage(AppConstant.LOGIN_DATA);
      await mutateAsyncLogout();
      navigate('/');
    } catch (error) {
      if (error?.response?.data?.message)
        showMessage({
          type: 'error',
          content: error?.response?.data?.message,
          className: 'mt-4 h-12',
        });
    }
  };

  return {
    handleOnFinish,
    handleRadioChange,
    isPending,
    isError,
    form,
    isPendingChangePass,
    isErrorChangePass,
    contextHolder,
  };
};
