import React from "react";
import { Button } from "@material-tailwind/react";

export default function SignIn({ onRouteChange }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-96">
        <h1 className="text-center font-semibold text-3xl text-blue-gray-900 ">
          Sign in
        </h1>
        <p className="mt-3 text-center text-sm text-blue-gray-300">
          Enter your username and password to sign in
        </p>
        <p className="mt-10 mb-1 font-semibold text-sm text-blue-gray-900">
          Username
        </p>
        <input
          type="email"
          placeholder="example_username"
          className="border border-blue-gray-200 text-gray-900 text-sm rounded-md  focus:border-black block w-full p-2.5"
        />
        <p className="mt-5 mb-1 font-semibold text-blue-gray-900 text-sm">
          Password
        </p>
        <input
          type="password"
          placeholder="password123"
          className=" border border-blue-gray-200 text-gray-900 text-sm rounded-md  focus:border-black block w-full p-2.5"
        />
        <p className="mt-2 cursor-pointer font-normal text-sm text-blue-gray-300 ">
          Forgot password?
        </p>
        <div className="">
          <Button
            onClick={() => {
              onRouteChange("home");
            }}
            size="lg"
            className="mt-6 w-full"
          >
            SIGN IN
          </Button>

          <Button
            ripple={true}
            color="white"
            className=" text-blue-gray-700 text-sm mt-3 w-full"
            size="lg"
          >
            <svg
              className="h-6 w-6 inline-block mx-1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            SIGN IN WITH GOOGLE
          </Button>
        </div>
        <p className="mt-5 text-sm text-center text-blue-gray-900">
          {`Not registered? `}
          <span
            onClick={() => {
              onRouteChange("registration");
            }}
            className="font-semibold cursor-pointer"
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}
