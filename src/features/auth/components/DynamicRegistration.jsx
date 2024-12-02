import Inputs from '../../../shared/components/form/AntdInputs';
import Form from 'antd/es/form';
import { Fragment } from 'react';
import { useAuth } from '../hooks/useAuth';
import AntdButton from '../../../shared/components/AntdButtons';
import { Checkbox } from 'antd';

const DynamicRegistration = ({
  isEmployee,
  visibleTabs,
  isEmployeeTabItems,
}) => {
  const {
    contextHolder,
    form,
    handleOnFinishRegister,
    handleOnClick,
    registerPending,
    handleCheckBoxChange,
  } = useAuth(isEmployee, isEmployeeTabItems);

  return (
    <Fragment>
      {contextHolder}
      <div
        className={`flex flex-col ${
          visibleTabs ? 'w-full' : 'w-full md:w-4/5 lg:w-1/2'
        } mx-auto shadow-lg p-6 my-6 bg-white rounded-lg`}
      >
        <Form form={form} onFinish={handleOnFinishRegister}>
          {!visibleTabs && (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {isEmployee ? (
                  <>
                    <div>
                      <Inputs
                        Label="Company Name"
                        name="company_name"
                        required
                        valMessage={'Company Name field is required.'}
                      />
                    </div>
                    <div>
                      <Inputs
                        Label="Contact Number"
                        name="phone_no"
                        required
                        valMessage={'Phone number field is required.'}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Inputs
                        Label="First Name"
                        name="first_name"
                        required
                        valMessage={'First name field is required.'}
                      />
                    </div>
                    <div>
                      <Inputs
                        Label="Middle Name"
                        name="middle_name"
                        required
                        valMessage={'Middle name field is required.'}
                      />
                    </div>
                    <div>
                      <Inputs
                        Label="Last Name"
                        name="last_name"
                        required
                        valMessage={'Last name field is required.'}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4">
                <Inputs
                  Label="Email"
                  name="email"
                  type="email"
                  required
                  valMessage={'Email Number field is required.'}
                />
              </div>
              <div className="mt-4">
                <Inputs
                  Label="Mobile No"
                  name="mobile_no"
                  type="pNumber"
                  required
                  valMessage={'Mobile Number field is required.'}
                />
              </div>
              <div className="mt-4">
                <Inputs
                  Label="Password"
                  name="password"
                  type="password"
                  required
                  valMessage={'Password field is required.'}
                />
              </div>
              <div className="mt-4">
                <Inputs
                  required
                  valMessage={'Confirm password field is required.'}
                  Label="Confirm Password"
                  name="confirm_pass"
                  type="password"
                />
              </div>
              <div className="mt-4 text-sm text-gray-600 font-normal">
                <Checkbox
                  onChange={handleCheckBoxChange}
                  className="mr-[10px]"
                />
                I have read, understood, and agree to the Terms and Conditions
                governing the use of GoldTree.
              </div>
              <div className="mt-6">
                <AntdButton
                  htmlType="submit"
                  loading={registerPending}
                  classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors w-full h-[40px]"
                >
                  {isEmployee
                    ? 'Create Employer Account'
                    : 'Create Job Seeker Account'}
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
                classNames="bg-[#08142c] text-white font-semibold px-4 rounded hover:!bg-[#0a223f] transition-colors h-[40px]"
                onClick={handleOnClick}
              >
                {isEmployeeTabItems
                  ? 'Create an Employee Account'
                  : 'Create an Job Seeker Account'}
              </AntdButton>
            </div>
          )}
        </Form>
      </div>
    </Fragment>
  );
};

export default DynamicRegistration;
