import { useQuery } from '@tanstack/react-query';
import { searchQueryKeys } from '../../queryKeys/keys';
import { fetcher } from '../../axios/fetcher';
import isEmpty from 'lodash/isEmpty';

export const useGlobalSearch = (params) => {
  const urlSearchParams = new URLSearchParams();

  const { q, vacancyType, careerLevel, gender, qualifications } = params;

  if (q) {
    urlSearchParams.append('q', q);
  }

  const addArrayToParams = (key, array) => {
    if (!isEmpty(array)) {
      urlSearchParams.append(key, array.join(','));
    }
  };

  addArrayToParams('vacancyType', vacancyType);
  addArrayToParams('careerLevel', careerLevel);
  addArrayToParams('gender', gender);
  addArrayToParams('qualifications', qualifications);

  return useQuery({
    queryFn: () => fetcher(`search?${urlSearchParams.toString()}`),
    queryKey: [
      searchQueryKeys.setUp.globalSearch,
      q,
      vacancyType,
      careerLevel,
      gender,
      qualifications,
    ],

    enabled: !!(
      q ||
      !isEmpty(vacancyType) ||
      !isEmpty(careerLevel) ||
      !isEmpty(gender) ||
      !isEmpty(qualifications)
    ),
  });
};
