import CkEditors from '../../../../../shared/components/CkEditor';
import Inputs from '../../../../../shared/components/form/AntdInputs';
import { Selects } from '../../../../../shared/components/form/AntdSelects';

const companySize = [
  { id: 1, name: '0-10' },
  { id: 2, name: '10-50' },
  { id: 3, name: '50-200' },
  { id: 4, name: '200-500' },
  { id: 5, name: '500-2000' },
  { id: 6, name: '2000-above' },
];

const businessType = [
  { id: 1, name: 'Information Technology' },
  { id: 2, name: 'Healthcare' },
  { id: 3, name: 'Finance' },
  { id: 4, name: 'Education' },
  { id: 5, name: 'Retail' },
  { id: 6, name: 'Manufacturing' },
  { id: 7, name: 'Transportation' },
  { id: 8, name: 'Real Estate' },
  { id: 9, name: 'Construction' },
  { id: 10, name: 'Hospitality' },
  { id: 11, name: 'Energy' },
  { id: 12, name: 'Media & Entertainment' },
  { id: 13, name: 'Non-Profit' },
  { id: 14, name: 'Government' },
  { id: 15, name: 'Agriculture' },
];

const companyType = [
  { id: 1, name: 'Startup' },
  { id: 2, name: 'Small Business' },
  { id: 3, name: 'Corporation' },
  { id: 4, name: 'Multinational' },
  { id: 5, name: 'Non-Profit Organization' },
  { id: 6, name: 'Government Agency' },
  { id: 7, name: 'Freelance' },
  { id: 8, name: 'Partnership' },
  { id: 9, name: 'Public Sector' },
  { id: 10, name: 'Private Sector' },
];

const companyLocation = [
  { id: 1, name: 'Thamel' },
  { id: 2, name: 'Lazimpat' },
  { id: 3, name: 'Baneshwor' },
  { id: 4, name: 'Maitighar' },
  { id: 5, name: 'Durbar Marg' },
  { id: 6, name: 'Putalisadak' },
  { id: 7, name: 'Jawalakhel' },
  { id: 8, name: 'Kumaripati' },
  { id: 9, name: 'Kalanki' },
  { id: 10, name: 'Chabahil' },
  { id: 11, name: 'Sinamangal' },
  { id: 12, name: 'Baluwatar' },
  { id: 13, name: 'Naxal' },
  { id: 14, name: 'Kalimati' },
  { id: 15, name: 'Koteshwor' },
  { id: 16, name: 'Boudha' },
  { id: 17, name: 'Samakhusi' },
  { id: 18, name: 'Dillibazar' },
  { id: 19, name: 'Sankhamul' },
  { id: 20, name: 'Gongabu' },
];

const PrimaryContactInfo = ({ setCKValue, data }) => {
  const handleChange = (_, editor) => {
    setCKValue(editor.getData());
  };
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            Label="Company Name"
            name="company_name"
            required
            valMessage={'Company name field is required.'}
          />
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
            required
            valMessage={'Company Type field is required.'}
            array={companyType}
          />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Selects
            className="w-full"
            Label="Business Type"
            name="business_type"
            description="name"
            value="name"
            array={businessType}
            required
            valMessage={'Business Type field is required.'}
          />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Selects
            className="w-full"
            Label="Size of Company"
            description="name"
            name="company_size"
            value="name"
            array={companySize}
            required
            valMessage={'Company Size field is required.'}
          />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <Selects
            className="w-full"
            Label="Company Location"
            name="location"
            description="name"
            value="name"
            array={companyLocation}
            required
            valMessage={'Company Location field is required.'}
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
            required
            valMessage={'Head Person Full Name field is required.'}
          />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            Label="Position"
            name="head_person_pos"
            required
            valMessage={'Position field is required.'}
          />
        </div>
      </div>
    </div>
  );
};

export default PrimaryContactInfo;
