import isEmpty from 'lodash/isEmpty';

const MatchView = ({ matchedData, isLoading }) => {
  if (isEmpty(matchedData))
    return (
      <div className="text-center flex justify-center items-center h-full">
        There is no data matching the search criteria
      </div>
    );

  if (isLoading) return <div>Loading ...</div>;
  else
    return (
      <div className="grid grid-cols-12 gap-">
        {matchedData?.map((items) => (
          <div
            key={items?.id}
            className="lg:col-span-12 shadow-md rounded-md p-4"
          >
            <div>
              <div>{items?.job_title}</div>
              <div>{items?.job_level}</div>
            </div>
            <div>
              <div>
                {items?.skills?.map((skills, index) => (
                  <div key={index}>{skills}</div>
                ))}
              </div>
              <div dangerouslySetInnerHTML={{ __html: items?.job_desc }} />
            </div>
          </div>
        ))}
      </div>
    );
};

export default MatchView;
