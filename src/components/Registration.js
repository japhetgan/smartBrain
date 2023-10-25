import React, { useState } from "react";
import { Button } from "@material-tailwind/react";

export default function Registration({ onRouteChange }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-96">
        <h1 className="mb-5 text-center font-semibold text-3xl text-blue-gray-900 ">
          Create account
        </h1>
        <p className="mt-10 mb-1 font-semibold text-sm text-blue-gray-900">
          Email Address
        </p>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="example@gmail.com"
          className="border border-blue-gray-200 text-gray-900 text-sm rounded-md  focus:border-black block w-full p-2.5"
        />
        <p className="mt-5 mb-1 font-semibold text-sm text-blue-gray-900">
          Username
        </p>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="email"
          placeholder="example_username"
          className="border border-blue-gray-200 text-gray-900 text-sm rounded-md  focus:border-black block w-full p-2.5"
        />
        <p className="mt-5 mb-1 font-semibold text-blue-gray-900 text-sm">
          Password
        </p>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="password123"
          className=" border border-blue-gray-200 text-gray-900 text-sm rounded-md  focus:border-black block w-full p-2.5"
        />
        <p className="mt-5 mb-1 font-semibold text-blue-gray-900 text-sm">
          Confirm Password
        </p>
        <input
          type="password"
          placeholder="password123"
          className=" border border-blue-gray-200 text-gray-900 text-sm rounded-md  focus:border-black block w-full p-2.5"
        />
        <div className="">
          <Button
            onClick={() => {
              fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: username,
                  email: email,
                  password: password,
                }),
              }).then((response) => response.json());
              onRouteChange("home");
            }}
            size="lg"
            className="mt-6 w-full"
          >
            REGISTER
          </Button>
        </div>
      </div>
    </div>
  );
}
