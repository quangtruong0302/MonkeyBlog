import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "@firebase-app/firebaseConfig";

import Button from "@components/button/Button";
import Field from "@components/field/Field";
import Input from "@components/Input/Input";
import Label from "@components/label/Label";
import ErrrorMessage from "@components/label/ErrrorMessage";
import LoadingSpiner from "@components/loading/LoadingSpiner";
import { userRole, userStatus } from "@utils/constant";

const SignUpPage = () => {
  const navigate = useNavigate();
  const schemaValidate = Yup.object({
    fullname: Yup.string().required(
      "Full name is required. Please enter your full name."
    ),
    username: Yup.string().required(
      "User name is required. Please enter your user name."
    ),

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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match.")
      .required("Password is required. Please enter your password."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaValidate),
    mode: "onChange",
  });

  const [togglePassword, setTogglePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSignUp = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
        photoURL:
          "https://res.cloudinary.com/dqo9guoih/image/upload/v1761659184/e6fvpyxm3jng42aog4ds.png",
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: values.fullname,
        username: values.username,
        email: values.email,
        password: values.password,
        avatar:
          "https://res.cloudinary.com/dqo9guoih/image/upload/v1761659184/e6fvpyxm3jng42aog4ds.png",
        status: Number(userStatus.ACTIVE),
        role: Number(userRole.USER),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      navigate("/");
      toast.success("Welcome! Your account has been created successfully.");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "This email is already registered. Please use another email!"
        );
      } else if (error.code === "auth/invalid-email") {
        toast.error("The email address is invalid!");
      } else if (error.code === "auth/weak-password") {
        toast.error(
          "The password is too weak! Please use a stronger password."
        );
      } else {
        toast.error("Failed to add user. Please try again!");
      }
    }
  };

  useEffect(() => {
    document.title = "Sign up";
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0].message);
    }
  }, [errors]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white w-[550px] h-fit p-8 border border-gray-100 shadow-sm rounded-2xl">
        <img className="mx-auto w-[75px]" src="/images/logo.png" alt="" />
        <div>
          <div className="flex flex-col my-6">
            <div className="flex items-center justify-center gap-2 text-[23px]">
              <h2 className="text-primary font-bold text-2xl text-center">
                Monkey Bloging
              </h2>
            </div>
            <div className="flex justify-center items-center gap-2">
              <p className="text-[15px] text-center">
                Make your app management easy and fun!
              </p>
              <span>🚀</span>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col gap-4"
          >
            <Field>
              <Label htmlFor={"fullname"} label={"Full name"}>
                Full name
              </Label>
              <Input
                name={"fullname"}
                id={"fullname"}
                placeholder="Taylor Swift"
                control={control}
              />
            </Field>
            <Field>
              <Label htmlFor={"username"} label={"User name"}>
                User name
              </Label>
              <Input
                name={"username"}
                id={"username"}
                placeholder="taylorswift"
                control={control}
              />
            </Field>
            <Field className="flex flex-col gap-3">
              <Label htmlFor={"email"} label={"Email address"}>
                Email address
              </Label>
              <Input
                name={"email"}
                id={"email"}
                type={"email"}
                placeholder={"taylor.swift@gmail.com"}
                control={control}
              />
            </Field>

            <Field className="flex flex-col gap-3">
              <Label htmlFor={"password"} label={"Password"}>
                Password
              </Label>
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

            <Field className="flex flex-col gap-3">
              <Label htmlFor={"confirm-password"} label={"Confirm password"}>
                Confirm password
              </Label>
              <Input
                name={"confirmPassword"}
                id={"confirm-password"}
                type={togglePassword.confirmPassword ? "text" : "password"}
                placeholder={"*********"}
                control={control}
              >
                <div
                  onClick={() =>
                    setTogglePassword({
                      ...togglePassword,
                      confirmPassword: !togglePassword.confirmPassword,
                    })
                  }
                >
                  {togglePassword.confirmPassword ? (
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
                "Sing up"
              )}
            </Button>
          </form>

          <p className="mt-4 text-center text-[15px]">
            Already have an account?{" "}
            <Link className="text-primary" to={"/sign-in"}>
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
