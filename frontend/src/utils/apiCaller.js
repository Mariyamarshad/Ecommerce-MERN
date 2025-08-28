import axios from "axios";

const apiCaller = async ({ url, method, data }) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios({
      url,
      method,
      data,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });

    return res.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default apiCaller;
