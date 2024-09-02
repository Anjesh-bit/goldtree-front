import Inputs from '../../../../../../common/form/AntdInputs';
import DatePickers from '../../../../../../common/AntdDatePickers';

const TrainingCertification = ({ setInputValue, inputValue, dayjs }) => {
  const handleChange = (_, value, filter) => {
    setInputValue((prevState) => ({
      ...prevState,
      [filter === 'to' ? 'toCourse' : 'fromCourse']: value,
    }));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1">
          <Inputs className="w-full" Label="Course Name" name="course_name" />
        </div>

        <div className="col-span-1">
          <Inputs className="w-full" Label="Institute" name="institute" />
        </div>
        <div className="col-span-1">
          <DatePickers
            className="w-full"
            format="YYYY-MM-DD"
            Label="From"
            onHandleChange={(_, dateString) =>
              handleChange(_, dateString, 'from')
            }
            value={dayjs(inputValue?.fromCourse)}
          />
        </div>
        <div className="col-span-1">
          <DatePickers
            className="w-full"
            format="YYYY-MM-DD"
            Label="To"
            onHandleChange={(_, dateString) =>
              handleChange(_, dateString, 'to')
            }
            value={dayjs(inputValue?.toCourse)}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingCertification;
