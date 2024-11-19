import { useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppConstant } from '../../../constant';
import login from '../../../services/auth/login';
import useMessage from '../../../hooks/useMessage';
import { useRegister } from '../../../services/auth/register';

export const useAuth = (isEmployee, isEmployeeTabItems, setOpen) => {
  const location = useLocation();
  const [form] = useForm();
  const {
    mutateAsync: mutateRegister,
    isPending: registerPending,
    isSuccess,
  } = useRegister();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contextHolder, showMessage } = useMessage();

  const data = useSelector((state) => state.auth);
  const userType = isEmployee ? AppConstant.EMPLOYEE : AppConstant.JOB_SEEKER;

  const handleOnClick = (e) => {
    e.preventDefault();
    if (isEmployee ?? isEmployeeTabItems) {
      navigate(AppConstant.AUTH_EMPLOYEE);
    } else {
      navigate(AppConstant.AUTH_JOB_SEEKER);
    }
  };

  const handleApiError = (results) => {
    const apiError = results?.feilds;
    const error = {};
    apiError?.forEach((item) => {
      const [fieldName, errorMessage] = Object.entries(item)[0];
      error[fieldName] = errorMessage;
    });

    const finalError = Object.entries(error).map(
      ([fieldName, errorMessage]) => ({
        name: fieldName,
        errors: [errorMessage],
      })
    );
    form.setFields(finalError);
  };

  const handleOnFinishRegister = async (value) => {
    try {
      await mutateRegister({ ...value, userType });
    } catch (e) {
      const apiError = e?.response?.data;
      handleApiError(apiError);
    }
  };

  const handleOnFinishLogin = async (values) => {
    dispatch(login({ ...values, type: userType })).then((actionResult) => {
      const apiMessage = actionResult?.payload?.message;
      showMessage({
        type: 'error',
        content: apiMessage,
        className: 'mt-4 h-12',
      });
      handleApiError(actionResult?.payload);
    });
  };

  useEffect(() => {
    const { user, token } = data;
    const { state } = location;
    if (user && token) {
      const dashboardRoute = isEmployee
        ? AppConstant.EMPLOYEE_URL
        : AppConstant.JOB_SEEKER_URL;
      if (state?.redirectTo) {
        navigate(state.redirectTo, { replace: true });
        window.location.reload();
      } else {
        navigate(dashboardRoute);
      }
    }
  }, [navigate, data, isEmployee, setOpen, location]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      showMessage({
        type: 'success',
        content: 'You have been successfully registered.',
        className: 'mt-4 h-12',
      });
    }
  }, [isSuccess, form, showMessage]);

  return {
    handleOnClick,
    handleOnFinishLogin,
    handleOnFinishRegister,
    contextHolder,
    form,
    data,
    registerPending,
  };
};
