import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { fetchWishlist } from "../../redux/slices/wishlistSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const { loading, error, user, token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (user ) {
      setMessage("Login successful ");
      
      dispatch(fetchWishlist())

      // redirect based on role
      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1500);
    }
  }, [user, navigate]);

  return (
    <div>
      <section id="login" className="mt-36">
        <div className="mx-auto container p-4">
          <div className="bg-white py-8 px-6 w-full max-w-md mx-auto rounded-2xl shadow-md">
            {/* Heading */}
            <h2 className="text-gray-900 text-3xl font-bold text-center">
              Log in to Exclusive
            </h2>
            <p className="text-center text-gray-600 mt-2 mb-6">
              Enter your details below to get started
            </p>

            {/* Login Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="text-gray-700 font-medium">
                  Email Address
                </label>
                <div className="bg-gray-100 p-3 rounded-md mt-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={handleChange}
                    name="email"
                    className="w-full outline-none bg-transparent text-gray-800"
                    required
                  />
                </div>
              </div>

               {/* Password */}
              <div>
                <label className="text-gray-700 font-medium">Password</label>
                <div className="bg-gray-100 p-3 flex items-center rounded-md mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={data.password}
                    name="password"
                    className="w-full outline-none bg-transparent text-gray-800"
                  />
                  <div
                    className="cursor-pointer pl-2 text-red-600"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      // Hide Icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 
                             0 0 0 1.934 12C3.226 
                             16.338 7.244 19.5 12 
                             19.5c.993 0 1.953-.138 
                             2.863-.395M6.228 
                             6.228A10.451 10.451 0 
                             0 1 12 4.5c4.756 0 
                             8.773 3.162 10.065 
                             7.498a10.522 10.522 
                             0 0 1-4.293 5.774M6.228 
                             6.228 3 3m3.228 
                             3.228 3.65 3.65m7.894 
                             7.894L21 21m-3.228-3.228-3.65-3.65m0 
                             0a3 3 0 1 0-4.243-4.243m4.242 
                             4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      // Show Icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 
                             1.012 0 0 1 0-.639C3.423 
                             7.51 7.36 4.5 12 4.5c4.638 
                             0 8.573 3.007 9.963 
                             7.178.07.207.07.431 
                             0 .639C20.577 16.49 
                             16.64 19.5 12 
                             19.5c-4.638 
                             0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 
                             0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-lg text-lg font-medium hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Show API messages */}
            {message && (
              <p className="text-center text-green-600 mt-4">{message}</p>
            )}
            {error && (
              <p className="text-center text-red-600 mt-4">{error}</p>
            )}

            {/* Redirect to signup */}
            <p className="mt-6 text-center text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-red-600 hover:text-red-700 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
