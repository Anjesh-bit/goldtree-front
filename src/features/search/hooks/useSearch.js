import { useLocation } from 'react-router-dom';
import { useGlobalSearch } from '../../../services/search/setUp';
import { useState } from 'react';

export const useSearch = () => {
  const { state } = useLocation();

  const [querySearchParams, setQuerySearchParams] = useState({
    q: state,
    vacancyType: [],
    careerLevel: [],
    gender: [],
    qualifications: [],
  });

  const { data, isLoading } = useGlobalSearch(querySearchParams);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setQuerySearchParams({ q: value });
  };

  return { handleOnChange, data, isLoading, setQuerySearchParams };
};
