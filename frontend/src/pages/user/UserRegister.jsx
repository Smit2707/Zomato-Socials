// UserRegister.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../api/axios';

const UserRegister = ({ toggleForm, toggleUserType }) => {

  const { register,reset, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log('User registration:', data);

      const response = await axios.post("/auth/user/register", data, { withCredentials: true });
      console.log("Api Response: ", response);

      toast.success('Registration successful!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      reset();
      navigate("/user/login")
      // Handle successful registration here
    } catch (error) {
      toast.error(error.message || 'Registration failed', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left side with form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-amber-600">FoodieGram</h1>
            <button
              onClick={() => navigate("/partner/login")}
              className="text-sm text-amber-600 hover:text-amber-800 font-medium"
            >
              Are you a Food Partner?
            </button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-2">Join our community of food lovers</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-300"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-300"
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-300"
                placeholder="Create a password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-amber-600 hover:text-amber-800">Terms of Service</a> and <a href="#" className="text-amber-600 hover:text-amber-800">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition duration-300 shadow-md"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button onClick={() => navigate("/user/login")} className="font-medium text-amber-600 hover:text-amber-800">
                Sign in
              </button>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <button className="bg-white py-2 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition duration-300">
                <span className="sr-only">Sign up with Google</span>
                <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </button>

              <button className="bg-white py-2 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition duration-300">
                <span className="sr-only">Sign up with Facebook</span>
                <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </button>

              <button className="bg-white py-2 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition duration-300">
                <span className="sr-only">Sign up with Apple</span>
                <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right side with image */}
        <div className="md:w-1/2 bg-gradient-to-br from-orange-400 to-amber-500 rounded-r-2xl hidden md:flex flex-col justify-center items-center p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Join FoodieGram</h2>
            <p className="mb-6">Discover delicious food experiences and share your culinary journey with others.</p>
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <p className="text-sm">Already part of our community?</p>
              <button
                onClick={() => navigate("/user/login")}
                className="mt-4 px-6 py-2 bg-white text-amber-600 rounded-full font-semibold hover:bg-amber-50 transition duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;