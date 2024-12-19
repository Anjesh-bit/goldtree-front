import { useParams } from 'react-router-dom';
import { useGetSingleEmployeeDataById } from '../../services/employee/setUp';

const EmployeeDetails = () => {
  const { id } = useParams();
  const { isLoading, isError, data } = useGetSingleEmployeeDataById(id);

  if (isLoading) return <div className="text-center">Loading...</div>;

const {
  personalInfo: {
    company_name = '',
    company_type = '',
    business_type = '',
    company_size = '',
    location = '',
    description = '',
    head_person_name = '',
    head_person_pos = '',
  } = {},
  primaryContact: { email = '', phone = '', website = '' } = {},
  socialLink: {
    fb_link = '',
    ig_link = '',
    linkedin_link = '',
    twitter_link = '',
  } = {},
  profile_images = '',
} = data || {};


  return (
    <div className="bg-gray-200 p-6 md:p-8 lg:p-12 xl:p-[48px]">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-6">
          <img
            src={profile_images ?? 'default-image.jpg'}
            alt={company_name}
            className="w-28 h-28 object-cover rounded-full shadow-md"
          />
          <div>
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#08142c] bg-gradient-to-r from-[#0a223f] to-[#08142c] text-transparent bg-clip-text tracking-wider py-2 mt-6">
              {company_name ?? 'N/A'}
            </div>

            <p className="text-sm md:text-base text-gray-600 mt-2">
              {description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Company Info</h3>
          <ul className="mt-4 text-sm text-gray-600">
            <li>
              <strong>Type:</strong> {company_type ?? 'N/A'}
            </li>
            <li>
              <strong>Business Type:</strong> {business_type ?? 'N/A'}
            </li>
            <li>
              <strong>Size:</strong> {company_size ?? 'N/A'}
            </li>
            <li>
              <strong>Location:</strong> {location ?? 'N/A'}
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Contact Info</h3>
          <ul className="mt-4 text-sm text-gray-600">
            <li>
              <strong>Email:</strong> {email ?? 'N/A'}
            </li>
            <li>
              <strong>Phone:</strong> {phone ?? 'N/A'}
            </li>
            <li>
              <strong>Website:</strong>{' '}
              {website ? (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {website}
                </a>
              ) : (
                'N/A'
              )}
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Head Person</h3>
          <ul className="mt-4 text-sm text-gray-600">
            <li>
              <strong>Name:</strong> {head_person_name ?? 'N/A'}
            </li>
            <li>
              <strong>Position:</strong> {head_person_pos ?? 'N/A'}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Social Links</h3>
        <div className="flex gap-4 mt-4">
          {fb_link && (
            <a
              href={fb_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Facebook
            </a>
          )}
          {ig_link && (
            <a
              href={ig_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Instagram
            </a>
          )}
          {linkedin_link && (
            <a
              href={linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {twitter_link && (
            <a
              href={twitter_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Twitter
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
