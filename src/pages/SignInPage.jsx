import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@firebase-app/firebaseConfig";
import useAuth from "@contexts/useAuth";

import Button from "@components/button/Button";
import Field from "@components/field/Field";
import Input from "@components/Input/Input";
import Label from "@components/label/Label";
import LoadingSpiner from "@components/loading/LoadingSpiner";

const SignInPage = () => {
  const { userInfor } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfor?.email) navigate("/");
  }, [userInfor]);
  const schemaValidate = Yup.object({
    email: Yup.string()
      .email(
        "The email address you entered is not valid. Please include '@' and a domain name (e.g., example@example.com)."
      )
      .required("Email is required. Please enter a valid email address."),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      .required("Password is required. Please enter your password."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schemaValidate),
    mode: "onChange",
  });

  const [togglePassword, setTogglePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const onSubmit = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to sign in. Please check your credentials and try again."
      );
    }
  };
  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0].message);
    }
  }, [errors]);
  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer></ToastContainer>
      <div className="bg-white w-[550px] h-fit p-8 border border-gray-100 shadow-sm rounded-2xl">
        <img className="mx-auto w-[75px]" src="/images/logo.png" alt="" />
        <div>
          <div className="flex flex-col my-6">
            <div className="flex items-center justify-center gap-2 text-[23px]">
              <h2 className="text-primary font-bold text-2xl text-center">
                Welcome to Monkey Bloging
              </h2>
            </div>
            <div className="flex justify-center items-center gap-2">
              <p className="text-[15px] text-center">
                Please sign in to your account and start the adventure
              </p>
              <span>👋</span>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Field>
              <Label htmlFor={"email"} label={"Email address"}></Label>
              <Input
                name={"email"}
                id={"email"}
                type={"email"}
                placeholder={"you@example.com"}
                control={control}
              />
            </Field>

            <Field>
              <Label htmlFor={"password"} label={"Password"}></Label>
              <Input
                name={"password"}
                id={"password"}
                type={togglePassword.password ? "text" : "password"}
                placeholder={"*********"}
                control={control}
              >
                <div
                  onClick={() =>
                    setTogglePassword({
                      ...togglePassword,
                      password: !togglePassword.password,
                    })
                  }
                >
                  {togglePassword.password ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </div>
              </Input>
            </Field>
            <br />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoadingSpiner size={"30px"} borderSize={"3px"}></LoadingSpiner>
              ) : (
                "Sing in"
              )}
            </Button>
          </form>

          <p className="mt-4 text-center text-[15px]">
            New on our platform?{" "}
            <Link className="text-primary" to={"/sign-up"}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
