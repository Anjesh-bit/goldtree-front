import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllPosts } from '../../../services/employee/setUp';

export const useFeatured = () => {
  const navigate = useNavigate();
  const { data: allPostsData } = useGetAllPosts();

  const postsByCompany = useMemo(() => {
    const result = {};
    allPostsData?.forEach((postsItems) => {
      const firstPost = postsItems.posts.find((post) => post.company_name);
      if (!firstPost) return;

      const companyName = firstPost.company_name;
      if (!result[companyName]) result[companyName] = [];
      result[companyName].push(...postsItems.posts);
    });
    return result;
  }, [allPostsData]);

  const handleProductClick = (e, id, name) => {
    e.preventDefault();
    if (id) {
      navigate(`/jobs/${name}/${id}`);
    }
  };

  return { handleProductClick, postsByCompany };
};
