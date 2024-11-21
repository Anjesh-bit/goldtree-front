import AntdCheckBoxGroup from '../../shared/components/form/AntdCheckBoxGroup';
import { Selects } from '../../shared/components/form/AntdSelects';
import {
  educationOptions,
  genderOptions,
  levelOptions,
  timeOptions,
} from '../../shared/utils/checkGroup';

import { CollapseSearch } from './CollapsePanel';

const fakeArr = [
  { id: 1, name: 'Top Jobs' },
  { id: 2, name: 'Hot Jobs' },
  { id: 3, name: 'Featured Jobs' },
  { id: 4, name: 'General Jobs' },
  { id: 5, name: 'Freelancing Jobs' },
  { id: 6, name: 'Intern' },
];

export const SearchSider = ({ setQuerySearchParams }) => {
  const handleOnchange = (e, name) => {
    setQuerySearchParams((prevParams) => {
      return { ...prevParams, [name]: e };
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="mb-8">
        <Selects
          className="w-full"
          Label="Location"
          name="industry_type"
          description="name"
          value="name"
          array={fakeArr}
        />
      </div>
      <div className="mb-8">
        <Selects
          className="w-full"
          Label="Company"
          name="industry_type"
          description="name"
          value="name"
          array={fakeArr}
        />
      </div>
      <div className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-300 pb-2">
        Categories
      </div>
      <div className="flex flex-col gap-8">
        <CollapseSearch header="VACANCY TYPE">
          <AntdCheckBoxGroup
            options={timeOptions}
            onChange={(e) => handleOnchange(e, 'vacancyType')}
          />
        </CollapseSearch>
        <CollapseSearch header="CAREER LEVEL">
          <AntdCheckBoxGroup
            options={levelOptions}
            onChange={(e) => handleOnchange(e, 'careerLevel')}
          />
        </CollapseSearch>
        <CollapseSearch header="GENDER">
          <AntdCheckBoxGroup
            options={genderOptions}
            onChange={(e) => handleOnchange(e, 'gender')}
          />
        </CollapseSearch>
        <CollapseSearch header="QUALIFICATIONS">
          <AntdCheckBoxGroup
            options={educationOptions}
            onChange={(e) => handleOnchange(e, 'qualifications')}
          />
        </CollapseSearch>
      </div>
    </div>
  );
};
