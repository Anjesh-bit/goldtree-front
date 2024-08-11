import { Link } from "react-router-dom";
import AntdBreadCum from "../../../../common/AntdBreadCum";
import AntdCards from "../../../../common/AntdCards";
import { useGetAllShortListedCandidates } from "../../../../services/employee/setUp";

const ShortlistCandidate = () => {
  const { data, isError, isPending } = useGetAllShortListedCandidates();

  return (
    <div>
      <AntdBreadCum array={["Employee", "ShortListed Candidates"]} />
      <AntdCards className={"grid grid-cols-12 w-full gap-2 p-4"}>
        {data?.map((items) => {
          return (
            <AntdCards className="col-span-4 p-4 cursor-pointer">
              <Link to={`/jobs/${items.postInfo.company_name}/${items.postId}`}>
                <div>Company Name : {items.postInfo.company_name}</div>
                <div>Job Title : {items.postInfo.job_title}</div>
                <div>Job Location : {items.postInfo.job_location}</div>
                <div>Job Level : {items.postInfo.job_level}</div>
                <div></div>
              </Link>
            </AntdCards>
          );
        })}
      </AntdCards>
    </div>
  );
};

export default ShortlistCandidate;
