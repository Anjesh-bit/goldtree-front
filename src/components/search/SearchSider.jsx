import AntdCheckBoxGroup from "../../common/form/AntdCheckBoxGroup";
import { Selects } from "../../common/form/AntdSelects";
import {
  educationOptions,
  genderOptions,
  levelOptions,
  timeOptions,
} from "../../utils/checkGroup";

import CollapseSearch from "./CollapsePanel";

//use database fetch on future
const fakeArr = [
  { id: 1, name: "Top Jobs" },
  { id: 2, name: "Hot Jobs" },
  { id: 3, name: "Featured Jobs" },
  { id: 4, name: "General Jobs" },
  { id: 5, name: "Freelancing Jobs" },
  { id: 6, name: "Intern" },
];

const SearchSider = ({ setQuerySearchParams }) => {
  const handleOnchange = (e, name) => {
    setQuerySearchParams((prevParams) => {
      return { ...prevParams, [name]: e };
    });
  };

  return (
    <div>
      <Selects
        className="w-full"
        Label="Location"
        name="industry_type"
        description="name"
        value="name"
        array={fakeArr}
      />
      <Selects
        className="w-full"
        Label="Company"
        name="industry_type"
        description="name"
        value="name"
        array={fakeArr}
      />
      <div className="flex flex-col gap-y-[24px]">
        <div className="text-[1.2rem] font-medium">Catagories :</div>

        <div>
          <CollapseSearch header={"VACANCY TYPE"}>
            <AntdCheckBoxGroup
              options={timeOptions}
              onChange={(e) => handleOnchange(e, "vacancyType")}
            />
          </CollapseSearch>
        </div>
        <div>
          <CollapseSearch header={"CAREER LEVEL"}>
            <AntdCheckBoxGroup
              options={levelOptions}
              onChange={(e) => handleOnchange(e, "careerLevel")}
            />
          </CollapseSearch>
        </div>
        <div>
          <CollapseSearch header={"GENDER"}>
            <AntdCheckBoxGroup
              options={genderOptions}
              onChange={(e) => handleOnchange(e, "gender")}
            />
          </CollapseSearch>
        </div>
        <div>
          <CollapseSearch header={"QUALIFICATIONS"}>
            <AntdCheckBoxGroup
              options={educationOptions}
              onChange={(e) => handleOnchange(e, "qualifications")}
            />
          </CollapseSearch>
        </div>
      </div>
    </div>
  );
};

export default SearchSider;
