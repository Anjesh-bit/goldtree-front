import isEmpty from 'lodash/isEmpty';

const MatchView = ({ matchedData, isLoading }) => {
  if (isEmpty(matchedData))
    return (
      <div className="text-center flex justify-center items-center h-full text-gray-700">
        There is no data matching the search criteria
      </div>
    );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {matchedData?.map((item) => (
        <div
          key={item?.id}
          className="shadow-md rounded-lg p-4 bg-white border cursor-pointer transition-colors hover:bg-gray-300"
        >
          <div className="mb-4">
            <div className="text-lg font-bold text-gray-800">
              {item?.job_title}
            </div>
            <div className="text-sm text-gray-600">{item?.job_level}</div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {item?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div
              className="text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: item?.job_desc }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchView;
