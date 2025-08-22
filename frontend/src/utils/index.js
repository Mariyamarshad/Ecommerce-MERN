const backendDomain = "http://localhost:8000";
const summaryApi = {
  signUP: {
    url: `${backendDomain}/auth/signup`,
    method: "post",
  },
  login: {
    url: `${backendDomain}/auth/login`,
    method: "post",
  },
};

export default summaryApi;
