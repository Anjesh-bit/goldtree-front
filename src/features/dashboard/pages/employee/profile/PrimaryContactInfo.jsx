import CkEditors from '../../../../../shared/components/CkEditor';
import Inputs from '../../../../../shared/components/form/AntdInputs';
import { Selects } from '../../../../../shared/components/form/AntdSelects';

const fakeArray = [
  { id: 1, name: 'Product Manager' },
  { id: 2, name: 'Accounting' },
  { id: 3, name: 'Android' },
  { id: 4, name: 'Angular JS' },
  { id: 5, name: 'React Developer' },
  { id: 6, name: 'Full Stack Engineer' },
  { id: 7, name: 'Flutter Developer' },
];

const PrimaryContactInfo = ({ setCKValue, data }) => {
  const handleChange = (_, editor) => {
    setCKValue(editor.getData());
  };
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Company Name" name="company_name" />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            Label="Alternative Company Name"
            name="alt_company_name"
          />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Selects
            className="w-full"
            Label="Company Type"
            name="company_type"
            description="name"
            value="name"
            array={fakeArray}
          />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Selects
            className="w-full"
            Label="Business Type"
            name="business_type"
            description="name"
            value="name"
            array={fakeArray}
          />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Selects
            className="w-full"
            Label="Size of Company"
            description="name"
            name="company_size"
            value="name"
            array={fakeArray}
          />
        </div>
        <div
          className="lg:col-span-4 md:col-span-6 col-span-12"
          name="company_size"
        >
          <Selects
            className="w-full"
            Label="Company Location"
            name="location"
            description="name"
            value="name"
            array={fakeArray}
          />
        </div>
        <div className="lg:col-span-12 col-span-12">
          <CkEditors
            data={data}
            Label={'Company Description:'}
            onChange={(event, editor) => handleChange(event, editor)}
          />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            Label="Head Person Full Name"
            name="head_person_name"
          />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Position" name="head_person_pos" />
        </div>
      </div>
    </div>
  );
};

export default PrimaryContactInfo;
