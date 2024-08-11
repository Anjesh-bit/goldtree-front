import AntdHeader from "./AntdHeader";
import AntdFooter from "./AntdFooter";
import JobSeekerMainPage from "../components/dashboard/jobseeker";
import EmployeeMainPage from "../components/dashboard/employee";
import { isAuthenticated } from "../utils/auth";
import useAuthHook from "../hooks/useAuthHook";

const DashboardLayout = () => {
  const isAuth = useAuthHook(false);
  return (
    <div>
      <AntdHeader />
      {isAuth?.type === "employee" ? (
        <EmployeeMainPage />
      ) : (
        <JobSeekerMainPage />
      )}

      <AntdFooter />
    </div>
  );
};

export default DashboardLayout;
