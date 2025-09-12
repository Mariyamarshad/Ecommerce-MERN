const backendDomain = import.meta.env.VITE_BACKEND_URL;

const summaryApi = {
  // Auth APIs
  signUP: {
    url: `${backendDomain}/auth/signup`,
    method: "post",
  },
  login: {
    url: `${backendDomain}/auth/login`,
    method: "post",
  },
  currentUser: {
    url: `${backendDomain}/auth/currentuser`,
    method: "get"
  },
  logout: {
    url: `${backendDomain}/auth/logout`,
    method: "post",
  },

  // Product APIs
  getProducts: {
    url: `${backendDomain}/api/products`,
    method: "get",
  },
  createProduct: {
    url: `${backendDomain}/api/products`,
    method: "post",
  },
  updateProduct: (id) => ({
    url: `${backendDomain}/api/products/${id}`,
    method: "put",
  }),
  deleteProduct: (id) => ({
    url: `${backendDomain}/api/products/${id}`,
    method: "delete",
  }),

  //order APIs
  getOrders: {
    url: `${backendDomain}/api/order/user`,
    method: "get",
    withCredentials: true,
  },

  getOrderById: (id) => ({
    url: `${backendDomain}/api/order/${id}`,
    method: "get",
    withCredentials: true,
  }),


  
};

export default summaryApi;
 