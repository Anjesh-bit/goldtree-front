import AntdBreadCum from '../../../../../shared/components/AntdBreadCum';
import UploadProfile from '../../../components/UploadProfile';

const UploadPhotoEmployee = () => {
  return (
    <div>
      <AntdBreadCum array={['Employee', 'Upload Picture']} />
      <UploadProfile type="employee" />
    </div>
  );
};

export default UploadPhotoEmployee;
