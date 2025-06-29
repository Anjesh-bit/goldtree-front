import isEmpty from 'lodash/isEmpty';

export const MatchView = ({ matchedData, isLoading }) => {
  if (isLoading)
    return (
      <div className="text-center text-[#f1c40f] font-semibold text-lg py-20">
        Loading...
      </div>
    );

  if (isEmpty(matchedData))
    return (
      <div className="text-center flex justify-center items-center h-full text-gray-600 font-medium py-20">
        There is no data matching the search criteria
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {matchedData?.map((item) => (
        <div
          key={item?.id}
          className="shadow-md rounded-lg p-6 bg-white border border-[#f1c40f] cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[#f1c40f]/40"
          title={item?.job_title}
        >
          <div className="mb-4">
            <div className="text-xl font-semibold text-[#08142c] truncate">
              {item?.job_title}
            </div>
            <div className="text-sm text-gray-600">{item?.job_level}</div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {item?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#f1c40f]/20 text-[#f1c40f] text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div
              className="text-sm text-gray-700 max-h-24 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: item?.job_desc }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
