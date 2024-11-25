import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { Selects } from '../../../../../../../shared/components/form/AntdSelects';
import Inputs from '../../../../../../../shared/components/form/AntdInputs';
import DatePickers from '../../../../../../../shared/components/AntdDatePickers';
import { AntRadio } from '../../../../../../../shared/components/form/AntdRadioGroup';

dayjs.locale('en');

const runningOpts = [
  {
    option: '',
    value: 'y',
  },
];

const Education = ({ setInputValue, inputValue, dayjs }) => {
  const handleChange = (_, dateString) => {
    setInputValue((prevState) => ({ ...prevState, passedYear: dateString }));
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <Selects
            className="w-full"
            Label="Education Level"
            name="level"
            value="name"
            description="name"
            array={[
              { id: 1, name: 'High School Diploma' },
              { id: 2, name: "Associate's Degree" },
              { id: 3, name: "Bachelor's Degree" },
              { id: 4, name: "Master's Degree" },
              { id: 5, name: 'Doctorate Degree' },
            ]}
          />
        </div>

        <div>
          <Selects
            className="w-full"
            Label="Degree Name"
            name="degree"
            description="name"
            value="name"
            array={[
              { id: 1, name: 'Accounting' },
              { id: 2, name: 'Business Administration' },
              { id: 3, name: 'Computer Science' },
              { id: 4, name: 'Education' },
              { id: 5, name: 'Engineering' },
              { id: 6, name: 'Finance' },
              { id: 7, name: 'Graphic Design' },
              { id: 8, name: 'Healthcare Administration' },
              { id: 9, name: 'Information Technology' },
              { id: 10, name: 'Marketing' },
              { id: 11, name: 'Nursing' },
              { id: 12, name: 'Psychology' },
            ]}
          />
        </div>

        <div>
          <Inputs className="w-full" Label="Education Board" name="board" />
        </div>

        <div>
          <Inputs className="w-full" Label="Institution" name="institution" />
        </div>

        <div>
          <Inputs
            className="w-full"
            Label="Specialization"
            name="specialization"
          />
        </div>

        <div>
          <AntRadio
            options={runningOpts}
            Label="Currently Running"
            name="current_running"
          />
        </div>

        <div>
          <Inputs className="w-full" Label="Percentage/Gpa" name="gpa" />
        </div>

        <div>
          <DatePickers
            Label="Passed Year"
            name="passed_year"
            format="YYYY-MM-DD"
            value={dayjs(inputValue?.passedYear)}
            onHandleChange={(_, dateString) => handleChange(_, dateString)}
          />
        </div>
      </div>
    </div>
  );
};

export default Education;
