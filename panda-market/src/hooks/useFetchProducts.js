import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchProducts = ({ sortBy, page, pageSize, search }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://panda-market-api.vercel.app/products', {
          params: {
            sort: sortBy,
            page,
            pageSize,
            search,
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy, page, pageSize, search]);

  return { data, loading, error };
};

export default useFetchProducts;
