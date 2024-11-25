import Inputs from '../../../../../shared/components/form/AntdInputs';

const SocialNetworks = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-12 gap-4">
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            placeholder="Facebook Link"
            name="fb_link"
          />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            placeholder="Instagram Link"
            name="ig_link"
          />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            placeholder="Linkedin Link"
            name="linkedin_link"
          />
        </div>
        <div className="lg:col-span-6 md:col-span-6 col-span-12">
          <Inputs
            className="w-full"
            placeholder="Twitter Link"
            name="twitter_link"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialNetworks;
