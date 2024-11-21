import AntdHeader from './AntdHeader';
import AntdFooter from './AntdFooter';
import JobSeekerMainPage from '../../../features/dashboard/jobseeker';
import EmployeeMainPage from '../../../features/dashboard/employee';
import useAuthHook from '../../../hooks/useAuthHook';

const DashboardLayout = () => {
  const isAuth = useAuthHook(false);
  return (
    <div>
      <AntdHeader />
      {isAuth?.type === 'employee' ? (
        <EmployeeMainPage />
      ) : (
        <JobSeekerMainPage />
      )}

      <AntdFooter />
    </div>
  );
};

export default DashboardLayout;
