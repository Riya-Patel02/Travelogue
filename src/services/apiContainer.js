import axios from 'axios';

const createApiRequest = (endPoint, defaultParams = {}) => {
  const axiosInstance = axios.create({
    baseURL: endPoint,
    params: defaultParams,
  });

  return async params => {
    try {
      const response = await axiosInstance.get('', {params});

      if (response.data) {
        const stringified = JSON.stringify(response.data);
        return stringified;
      }
    } catch (error) {
      console.log('Error fetching api', error);
    }
  };
};

export default createApiRequest;



