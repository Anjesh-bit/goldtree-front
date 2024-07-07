import AntdHeader from "./AntdHeader";
import AntdFooter from "./AntdFooter";
import JobSeekerMainPage from "../components/dashboard/jobseeker";
import EmployeeMainPage from "../components/dashboard/employee";
import { isAuthenticated } from "../utils/auth";

const DashboardLayout = () => {
  return (
    <div>
      <AntdHeader />
      {isAuthenticated()?.type === "employee" ? (
        <EmployeeMainPage />
      ) : (
        <JobSeekerMainPage />
      )}

      <AntdFooter />
    </div>
  );
};

export default DashboardLayout;
