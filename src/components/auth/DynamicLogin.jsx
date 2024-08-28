import Inputs from "../../common/form/AntdInputs";
import AntdButton from "../../common/AntdButtons";
import { useNavigate } from "react-router-dom";
import Form from "antd/es/form";
import { useDispatch, useSelector } from "react-redux";
import login from "../../services/auth/login";
import { Fragment, useEffect } from "react";
import useMessage from "../../hooks/useMessage";

const { useForm } = Form;

const DynamicLogin = ({ isEmployee, modalData, setOpen }) => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contextHolder, showMessage } = useMessage();

  const data = useSelector((state) => state.auth);

  const handleOnClick = (e) => {
    e.preventDefault();
    if (isEmployee) {
      navigate("/auth/register/employee");
    } else {
      navigate("/auth/register/jobseeker");
    }
  };

  const handleOnFinish = async (values) => {
    const userType = isEmployee ? "employee" : "jobSeeker";
    dispatch(login({ ...values, type: userType })).then((actionResult) => {
      const apiMessage = actionResult?.payload?.message;
      showMessage({
        type: "error",
        content: apiMessage,
        className: "mt-4 h-12",
      });

      const apiError = actionResult?.payload?.feilds;
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
    });
  };

  useEffect(() => {
    const { user, token } = data;
    if (user && token) {
      const isNotEmpty = modalData?.length > 0;
      if (isNotEmpty) {
        navigate(`/jobs/${modalData[1]}/${modalData[0]}`);
        setOpen({ open: false, data: null });
      } else {
        const dashboardRoute = isEmployee
          ? "/employee/dashboard"
          : "/jobSeeker/dashboard";
        navigate(dashboardRoute);
      }
    }
  }, [navigate, data]);

  return (
    <Fragment>
      {contextHolder}
      <div className="flex flex-col max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <Form form={form} onFinish={handleOnFinish}>
          <div className="space-y-4">
            <div className="w-full">
              <Inputs Label="Enter Email" name="email" type="email" />
            </div>
            <div className="w-full">
              <Inputs Label="Enter Password" name="password" type="password" />
            </div>

            <div className="mt-6">
              <AntdButton
                loading={data?.loading}
                classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors w-full h-[40px]"
                onClick={() => form.submit()}
              >
                Login
              </AntdButton>
            </div>

            <div className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?
            </div>

            <div className="mt-4">
              <AntdButton
                classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors w-full h-[40px]"
                onClick={(e) => handleOnClick(e)}
              >
                Register
              </AntdButton>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default DynamicLogin;
