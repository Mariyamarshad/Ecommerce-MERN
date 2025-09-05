import axios from "axios";

const apiCaller = async ({ url, method, data }) => {
  try {

    const res = await axios({
      url,
      method,
      data,
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default apiCaller;
