import Inputs from '../../../../../../../shared/components/form/AntdInputs';
import DatePickers from '../../../../../../../shared/components/AntdDatePickers';
import { AntRadio } from '../../../../../../../shared/components/form/AntdRadioGroup';

const marriedOptions = [
  {
    option: 'Married',
    value: 'married',
  },
  {
    option: 'Unmarried',
    value: 'unmarried',
  },
];

const genderOptions = [
  {
    option: 'Male',
    value: 'm',
  },
  {
    option: 'Female',
    value: 'f',
  },
  {
    option: 'Other',
    value: 'o',
  },
];

const ProfileInformation = ({ setInputValue, inputValue, dayjs }) => {
  const handleChange = (_, dateString) => {
    setInputValue((prevState) => ({ ...prevState, dob: dateString }));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="col-span-1">
          <Inputs
            className="w-full"
            Label="Full Name"
            name="full_name"
            required
            valMessage={'Full Name field is required'}
          />
        </div>
        <div className="col-span-1">
          <DatePickers
            required
            className="w-full"
            format="YYYY-MM-DD"
            Label="Date Of Birth"
            value={dayjs(inputValue?.dob)}
            onHandleChange={(_, dateString) => handleChange(_, dateString)}
          />
        </div>
        <div className="col-span-1">
          <Inputs className="w-full" Label="Nationality" name="nationality" />
        </div>
        <div className="col-span-1">
          <Inputs
            required
            valMessage={'Permanent Address field is required.'}
            className="w-full"
            Label="Permanent Address"
            name="permanent_addr"
          />
        </div>
        <div className="col-span-1">
          <Inputs
            required
            valMessage={'Current Address field is required.'}
            className="w-full"
            Label="Current Address"
            name="current_addr"
          />
        </div>
        <div className="col-span-1">
          <Inputs
            className="w-full"
            Label="Phone No."
            name="phone_no"
            required
            valMessage={'Phone field is required.'}
          />
        </div>

        <div className="col-span-1 lg:col-span-2">
          <AntRadio
            options={genderOptions}
            Label="Gender"
            name="gender"
            required
            valMessage="Please Select Gender."
          />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <AntRadio
            options={marriedOptions}
            Label="Marital Status"
            name="marital_status"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
