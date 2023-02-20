import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUserLoginMutation } from "../Features/Auth/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [userLogin, { isError, isLoading, err }] = useUserLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const user = {
          email: values.email,
          password: values.password,
        };
        console.log(user);
        //.unwrap yeo grnai parxa like  formula
        const response = await userLogin(user).unwrap();
        dispatch(addUser(response.data));

        // if (!isError) {
        toast.success("Login Successful");
        nav(-1);
        // }
        // nav(-1) means jun page batw ako tei page mah return jani
      } catch (error) {
        toast.error("Email or Password Incorrect");
      }
    },
  });
  return (
    <div>
      <div className="bg-no-repeat bg-cover bg-center relative">
        <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <img src="" className="mb-3" />
              <h1 className="mb-3 font-bold text-5xl">
                Hi ? Welcome Back Ayush ji !{" "}
              </h1>
              <p className="pr-3">
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center  z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign In{" "}
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Email
                    </label>

                    <input
                      className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      name="email"
                      placeholder="mail@gmail.com"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <h1 className="text-pink-700">{formik.errors.email}</h1>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Password
                    </label>
                    <input
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      name="password"
                      placeholder="Enter your password"
                    />
                    {formik.errors.password ? (
                      <h1 className="text-red-700">
                        {formik.errors.password}{" "}
                      </h1>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember_me"
                        className="ml-2 block text-sm text-gray-800"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="text-green-400 hover:text-green-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  <div>
                    <button
                      className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                      type="submit"
                    >
                      {isLoading === true ? (
                        <div className="h-7 w-7 mx-auto rounded-full   border-2 border-black border-t-white animate-spin"></div>
                      ) : (
                        <h1>Submit</h1>
                      )}
                    </button>
                  </div>
                </div>
              </form>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2021-2022
                  <a
                    href="https://codepen.io/uidesignhub"
                    rel=""
                    target="_blank"
                    title="Ayush"
                    className="text-green hover:text-green-500 "
                  >
                    Ayush
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
