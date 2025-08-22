import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/slices/authSlice";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from redux
  const { loading, error, signupSuccess } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    // Dispatch signup thunk
    dispatch(
      signupUser({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role,
      })
    );
  };

  // If signup successful, navigate to login
  useEffect(() => {
    if (signupSuccess) {
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    }
  }, [signupSuccess, navigate]);

  return (
    <div>
      <section id="signup" className="mt-36">
        <div className="mx-auto container p-4">
          <div className="bg-white py-8 px-6 w-full max-w-md mx-auto rounded-2xl shadow-md">
            {/* Heading */}
            <h2 className="text-gray-900 text-3xl font-bold text-center">
              Create an Account
            </h2>
            <p className="text-center text-gray-600 mt-2 mb-6">
              Enter your details below to get started
            </p>

            {/* Message */}
            {message && (
              <p className="text-center text-green-600 font-medium mb-4">
                {message}
              </p>
            )}
            {error && (
              <p className="text-center text-red-600 font-medium mb-4">
                {error}
              </p>
            )}

            {/* Signup Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="text-gray-700 font-medium">Full Name</label>
                <div className="bg-gray-100 p-3 rounded-md mt-1">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={data.name}
                    onChange={handleOnChange}
                    name="name"
                    className="w-full outline-none bg-transparent text-gray-800"
                    required
                  />
                </div>
              </div>

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
                    onChange={handleOnChange}
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
                    placeholder="Enter you password"
                    onChange={handleOnChange}
                    value={data.password}
                    name="password"
                    className="w-full outline-none bg-transparent text-gray-800"
                    required
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

              {/* Confirm Password */}
              <div>
                <label className="text-gray-700 font-medium">
                  Confirm Password
                </label>
                <div className="bg-gray-100 p-3 flex items-center rounded-md mt-1">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    onChange={handleOnChange}
                    value={data.confirmPassword}
                    name="confirmPassword"
                    className="w-full outline-none bg-transparent text-gray-800"
                    required
                  />
                  <div
                    className="cursor-pointer pl-2 text-red-600"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
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
                          d="M3.98 8.223A10.477 
                             10.477 0 0 0 1.934 12C3.226 
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

              {/* Role 
              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Select Role
                </label>
                <div className="relative ">
                  <select
                    name="role"
                    value={data.role || "user"}
                    onChange={handleOnChange}
                    className="w-full p-3 pr-10 border border-gray-200 rounded-2xl dow-md text-gray-700 font-medium focus:outline-none focus:ring-2 cursor-pointer bg-gray-100 "
                  >
                    <option value="user" >User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>  */}

              {/* Signup Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-lg text-lg font-medium hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            {/* Already have account */}
            <p className="mt-6 text-center text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-600 hover:text-red-700 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
