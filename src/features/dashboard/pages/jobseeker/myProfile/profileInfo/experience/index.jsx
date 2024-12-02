import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { AntRadio } from '../../../../../../../shared/components/form/AntdRadioGroup';
import Inputs from '../../../../../../../shared/components/form/AntdInputs';
import DatePickers from '../../../../../../../shared/components/AntdDatePickers';
import CkEditors from '../../../../../../../shared/components/CkEditor';
import { Selects } from '../../../../../../../shared/components/form/AntdSelects';

dayjs.locale('en');

const currentlyWorkOpts = [
  {
    option: 'Yes',
    value: 'y',
  },
  {
    option: 'No',
    value: 'n',
  },
];

const Experience = ({ setInputValue, inputValue, dayjs }) => {
  const handleChange = (_, value, filter) => {
    setInputValue((prevState) => ({
      ...prevState,
      [filter]: filter === 'editor' ? value.getData() : value,
    }));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="col-span-1">
          <Inputs
            className="w-full"
            Label="Designation"
            name="designation"
            required
            valMessage={'Designation field is required.'}
          />
        </div>
        <div className="col-span-1">
          <DatePickers
            className="w-full"
            Label="From"
            format="YYYY-MM-DD"
            name="from"
            value={dayjs(inputValue?.from)}
            onHandleChange={(_, dateString) =>
              handleChange(_, dateString, 'from')
            }
          />
        </div>
        <div className="col-span-1">
          <DatePickers
            className="w-full"
            Label="To"
            name="to"
            format="YYYY-MM-DD"
            value={dayjs(inputValue?.to)}
            onHandleChange={(_, dateString) =>
              handleChange(_, dateString, 'to')
            }
          />
        </div>
        <div className="col-span-1">
          <Inputs
            className="w-full"
            Label="Company"
            name="company"
            required
            valMessage={'Company name field is required.'}
          />
        </div>
        <div className="col-span-1">
          <Inputs
            className="w-full"
            Label="Address"
            name="addr"
            required
            valMessage={'Designation field is required.'}
          />
        </div>
        <div className="col-span-1">
          <Selects Label="Job Level" />
        </div>
        <div className="col-span-1">
          <Inputs className="w-full" Label="Phone No." name="mob_no" />
        </div>

        <div className="col-span-1 lg:col-span-3">
          <CkEditors
            Label="Descriptions"
            name="description"
            data={inputValue?.editor}
            onChange={(event, editor) => handleChange(event, editor, 'editor')}
          />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <AntRadio
            options={currentlyWorkOpts}
            Label="Currently Working"
            name="currently_working"
          />
        </div>
      </div>
    </div>
  );
};

export default Experience;
