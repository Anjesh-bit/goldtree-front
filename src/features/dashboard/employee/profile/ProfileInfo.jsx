import Inputs from '../../../../shared/components/form/AntdInputs';

const ProfileInfo = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Full Name" name="full_name" />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Address 1" name="address_1" />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Address 2" name="address_2" />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Phone" name="phone" />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Alternate Phone" name="alt_phone" />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Fax" name="fax" />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="P.O. Box No." name="po_box" />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="E-mail" name="email" />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Sec.E-mail" name="sec_email" />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs className="w-full" Label="Website" name="website" />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
