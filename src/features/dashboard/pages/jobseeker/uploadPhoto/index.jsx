import AntdBreadCum from '../../../../../shared/components/AntdBreadCum';
import UploadProfile from '../../../components/UploadProfile';

const UploadPhotoJobSeeker = () => {
  return (
    <div>
      <AntdBreadCum array={['JobSeeker', 'Upload Picture']} />
      <UploadProfile type="jobSeeker" />
    </div>
  );
};

export default UploadPhotoJobSeeker;
