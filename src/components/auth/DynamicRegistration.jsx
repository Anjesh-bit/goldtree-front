import Inputs from "../../common/form/AntdInputs";
import AntdButton from "../../common/AntdButtons";
import { useRegister } from "../../services/auth/register";
import { useNavigate } from "react-router-dom";
import Form from "antd/es/form";
import { message } from "antd";
import { Fragment, useEffect } from "react";
import useMessage from "../../hooks/useMessage";

const { useForm } = Form;

const DynamicRegistration = ({
  isEmployee,
  visibleTabs,
  isEmployeeTabItems,
}) => {
  const navigate = useNavigate();
  const { contextHolder, showMessage } = useMessage();
  const [form] = useForm();
  const {
    data: registerData,
    mutateAsync: mutateRegister,
    isPending: registerPending,
    isError,
    isSuccess,
  } = useRegister();

  const handleOnClick = (e) => {
    e.preventDefault();
    if (isEmployeeTabItems) {
      navigate("/auth/register/employee");
    } else {
      navigate("/auth/register/jobseeker");
    }
  };

  const handleOnFinish = async (value) => {
    try {
      const type = isEmployee ? "employee" : "jobSeeker";
      await mutateRegister({ ...value, type });
    } catch (e) {
      const error = {};
      const apiError = e?.response?.data?.feilds;
      apiError?.map((items) => {
        const [fieldName, errorMessage] = Object.entries(items)[0];
        error[fieldName] = errorMessage;
      });

      const finalError = Object.entries(error).map(
        ([fieldName, errorMessage]) => {
          return {
            name: fieldName,
            errors: [errorMessage],
          };
        }
      );
      form.setFields(finalError);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      showMessage({
        type: "success",
        content: "You have been successfully registered.",
        className: "mt-4 h-12",
      });
    }
  }, [isSuccess]);

  return (
    <Fragment>
      {contextHolder}
      <div
        className={`flex flex-col ${
          visibleTabs ? "w-full" : "w-full md:w-4/5 lg:w-1/2"
        } mx-auto shadow-lg p-6 my-6 bg-white rounded-lg`}
      >
        <Form form={form} onFinish={handleOnFinish}>
          {!visibleTabs && (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {isEmployee ? (
                  <>
                    <div>
                      <Inputs Label="Company Name" name="company_name" />
                    </div>
                    <div>
                      <Inputs Label="Contact Number" name="phone_no" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Inputs Label="First Name" name="first_name" />
                    </div>
                    <div>
                      <Inputs Label="Middle Name" name="middle_name" />
                    </div>
                    <div>
                      <Inputs Label="Last Name" name="last_name" />
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4">
                <Inputs Label="Email" name="email" type="email" />
              </div>
              <div className="mt-4">
                <Inputs Label="Mobile No" name="mobile_no" type="pNumber" />
              </div>
              <div className="mt-4">
                <Inputs Label="Password" name="password" type="password" />
              </div>
              <div className="mt-4">
                <Inputs
                  Label="Confirm Password"
                  name="confirm_pass"
                  type="password"
                />
              </div>
              <div className="mt-4 text-sm text-gray-600">
                I have read, understood, and agree to the Terms and Conditions
                governing the use of GoldTree.
              </div>
              <div className="mt-6">
                <AntdButton
                  htmlType="submit"
                  loading={registerPending}
                  classNames="w-full bg-[#3d2462] text-white border-none rounded-lg px-6"
                >
                  {isEmployee
                    ? "Create Employer Account"
                    : "Create Job Seeker Account"}
                </AntdButton>
              </div>
            </>
          )}

          {visibleTabs && (
            <div className="w-full text-center">
              <div className="text-lg font-medium mb-4">
                Create a free account to post vacancies
              </div>
              <AntdButton
                classNames="w-full bg-[#3d2462] text-white border-none rounded-lg px-6"
                onClick={handleOnClick}
              >
                {isEmployeeTabItems
                  ? "Create an Employee Account"
                  : "Create a Job Seeker Account"}
              </AntdButton>
            </div>
          )}
        </Form>
      </div>
    </Fragment>
  );
};

export default DynamicRegistration;
