import React from "react";

const Login = () => {
  return (
    <div className="lg:flex justify-items-center justify-center my-10 mx-20 gap-10 place-items-center mb-[300px]">
      <div className="w-full max-w-lg">
        <h2 className="font-semibold text-3xl text-blue-700 pb-4">SIGN IN</h2>
        <form className="shadow-md rounded pt-4 px-6 pb-6">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-black text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-black text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-700 text-white py-3 px-8 hover:bg-red-600 font-bold rounded focus:outline-none focus:shadow-outline"
            >
              Sign in
            </button>
            <a
              href="/"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
      <div className="bg-gray-100 shadow-md rounded p-10">
        <h3 className="text-blue-500 font-semibold">New Customer?</h3>
        <br />
        <div className="text-sm">
          <p>Create an account with us and you'll be able to:</p>
          <br />
          <ol className="list-disc ml-10 mb-10">
            <li>Check out faster</li>
            <li>Access your order history</li>
            <li>Save items to your wish list</li>
            <li>Leave product reviews</li>
          </ol>
        </div>
        <div className="">
          <button
            type="button"
            className="bg-blue-700 text-white py-3 px-8 hover:bg-red-600 font-bold rounded focus:outline-none focus:shadow-outline"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
