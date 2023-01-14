import axios from 'axios';

type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const baseURL = 'http://localhost:5000/api';

export const handleApi = async (
  url: string,
  method: TMethod,
  data?: Object
) => {
  try {
    return await axios({
      method,
      url: `${baseURL}${url}`,
      data,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        return err.response ?? { data: err };
      });
  } catch (error: any) {
    console.error(error);
    return error.response ?? { data: error };
  }
};
