import { useNavigate } from 'react-router-dom';
import { useGetAllEmployeeList } from '../../../services/commonService/setUp';

export const useCompanyList = () => {
  const { isLoading, isError, data } = useGetAllEmployeeList();
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    if (id) navigate(`/employee/${id}`);
  };

  return { handleCardClick, isLoading, isError, data };
};
