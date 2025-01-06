import AntdHeader from './AntdHeader';
import AntdFooter from './AntdFooter';
import JobSeekerMainPage from '../../../features/dashboard/pages/jobseeker';
import EmployeeMainPage from '../../../features/dashboard/pages/employee';
import { isAuthenticated } from '../../utils/auth';

const DashboardLayout = () => {
  return (
    <div>
      <AntdHeader />
      {isAuthenticated()?.type === 'employee' ? (
        <EmployeeMainPage />
      ) : (
        <JobSeekerMainPage />
      )}

      <AntdFooter />
    </div>
  );
};

export default DashboardLayout;
