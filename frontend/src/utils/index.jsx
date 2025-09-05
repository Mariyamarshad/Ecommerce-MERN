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

  // Cart APIs
  addToCart: {
    url: `${backendDomain}/api/cart/add`,
    method: "post",
  },
  getCart: {
    url: `${backendDomain}/api/cart`,
    method: "get",
  },
  updateCartItem: (id) => ({
    url: `${backendDomain}/api/cart/${id}`,
    method: "put",
  }),
  deleteCartItem: (id) => ({
    url: `${backendDomain}/api/cart/${id}`,
    method: "delete",
  }),

  //wishlist APIs
addToWishlist: {
    url: `${backendDomain}/api/wishlist/add`,
    method: "post",
  },
  getWishlist: {
    url: `${backendDomain}/api/wishlist`,
    method: "get",
  },
  
  deleteWishlistItem: (id) => ({
    url: `${backendDomain}/api/wishlist/${id}`,
    method: "delete",
  }),
};

export default summaryApi;
 