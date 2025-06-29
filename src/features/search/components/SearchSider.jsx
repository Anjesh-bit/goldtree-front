import AntdCheckBoxGroup from '../../../shared/components/form/AntdCheckBoxGroup';
import { Selects } from '../../../shared/components/form/AntdSelects';
import {
  educationOptions,
  genderOptions,
  levelOptions,
  timeOptions,
} from '../../../shared/utils/checkGroup';

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
    setQuerySearchParams((prevParams) => ({ ...prevParams, [name]: e }));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-[#f1c40f] text-[#08142c]">
      <div className="mb-8">
        <Selects
          className="w-full"
          Label="Location"
          name="location"
          description="name"
          value="name"
          array={fakeArr}
          bordered={false}
          dropdownClassName="bg-white text-[#08142c]"
        />
      </div>
      <div className="mb-8">
        <Selects
          className="w-full"
          Label="Company"
          name="company"
          description="name"
          value="name"
          array={fakeArr}
          bordered={false}
          dropdownClassName="bg-white text-[#08142c]"
        />
      </div>

      <div className="text-xl font-semibold text-[#f1c40f] mb-6 border-b border-[#f1c40f] pb-2 tracking-wide">
        Categories
      </div>

      <div className="flex flex-col gap-8 text-[#08142c]">
        <CollapseSearch header="VACANCY TYPE">
          <AntdCheckBoxGroup
            options={timeOptions}
            onChange={(e) => handleOnchange(e, 'vacancyType')}
            className="text-[#08142c]"
          />
        </CollapseSearch>

        <CollapseSearch header="CAREER LEVEL">
          <AntdCheckBoxGroup
            options={levelOptions}
            onChange={(e) => handleOnchange(e, 'careerLevel')}
            className="text-[#08142c]"
          />
        </CollapseSearch>

        <CollapseSearch header="GENDER">
          <AntdCheckBoxGroup
            options={genderOptions}
            onChange={(e) => handleOnchange(e, 'gender')}
            className="text-[#08142c]"
          />
        </CollapseSearch>

        <CollapseSearch header="QUALIFICATIONS">
          <AntdCheckBoxGroup
            options={educationOptions}
            onChange={(e) => handleOnchange(e, 'qualifications')}
            className="text-[#08142c]"
          />
        </CollapseSearch>
      </div>
    </div>
  );
};
