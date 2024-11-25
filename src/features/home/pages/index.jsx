import CompanyList from "../components/companylist";
import DetailedComponent from "../components/details";
import FeaturedJobs from "../components/featured";

const JobPortalHome = () => {
  return (
    <div>
      <div>
        <DetailedComponent />
      </div>
      <div>
        <FeaturedJobs />
      </div>
      <div>
        <CompanyList />
      </div>
    </div>
  );
};

export default JobPortalHome;
