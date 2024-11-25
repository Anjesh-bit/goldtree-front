import { useNavigate } from 'react-router-dom';

export const useDetails = () => {
  const navigate = useNavigate();
  const handleSearch = (value) => {
    navigate('/search', { state: value });
  };
  return { handleSearch };
};
