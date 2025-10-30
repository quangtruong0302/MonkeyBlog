import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { userStatus, userRole } from "@utils/constant";
import useUploadImage from "@hooks/useUploadImage";
import DashboardHeading from "@components/dashboard/DashboardHeading";
import ImageUpload from "@components/image/ImageUpload";
import Field from "@components/field/Field";
import Input from "@components/Input/Input";
import Label from "@components/label/Label";
import FieldCheckboxes from "@components/drafts/FieldCheckboxes";
import Radio from "@components/checkbox/Radio";
import Button from "@components/button/Button";
import LoadingSpiner from "@components/loading/LoadingSpiner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@firebase-app/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
const UserAddNew = () => {
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
  });
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidate),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar:
        "https://res.cloudinary.com/dqo9guoih/image/upload/v1761659184/e6fvpyxm3jng42aog4ds.png",
      status: Number(userStatus.ACTIVE),
      role: Number(userRole.USER),
    },
  });
  const {
    imgCloud,
    setImgCloud,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
  } = useUploadImage(setValue, getValues);

  const handleAddNewUser = async (values) => {
    try {
      // await createUserWithEmailAndPassword(auth, values.email, values.password);
      // await addDoc(collection(db, "users"), {
      //   fullname: values.fullname,
      //   username: values.username,
      //   email: values.email,
      //   avatar:
      //     imgCloud.url ||
      //     "https://res.cloudinary.com/dqo9guoih/image/upload/v1761659184/e6fvpyxm3jng42aog4ds.png",
      //   password: values.password,
      //   status: Number(values.status),
      //   role: Number(values.role),
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const uid = userCredential.user.uid;
      await setDoc(doc(db, "users", uid), {
        fullname: values.fullname,
        username: values.username,
        email: values.email,
        avatar: values.avatar || null,
        password: values.password,
        status: Number(values.status) || 1,
        role: Number(values.role) || 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      reset({
        fullname: "",
        email: "",
        password: "",
        username: "",
        avatar:
          "https://res.cloudinary.com/dqo9guoih/image/upload/v1761659184/e6fvpyxm3jng42aog4ds.png",
        status: Number(userStatus.ACTIVE),
        role: Number(userRole.USER),
      });
      setImgCloud({});
      setProgress(0);

      toast.success("User added successfully!");
      navigate("/manage/users");
    } catch (error) {
      console.log(error);
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
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0].message);
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Add new user";
  }, []);

  const watchStatus = watch("status");
  const watchRole = watch("role");
  return (
    <div className="flex flex-col gap-10">
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form
        onSubmit={handleSubmit(handleAddNewUser)}
        className="flex flex-col justify-center gap-10 px-30"
      >
        <div className="">
          <div className="w-[250px] h-[250px] mx-auto rounded-full">
            <ImageUpload
              className="!rounded-full !p-0 h-full"
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              image={imgCloud}
              name="avatar"
            ></ImageUpload>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-10 gap-x-5">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="text"
            ></Input>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={Number(userRole.ADMIN)}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={Number(userRole.MOD)}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={Number(userRole.USER)}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <div className="w-full flex justify-center items-center ">
          <div className="mx-auto w-[250px]">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoadingSpiner size={"30px"} borderSize={"3px"}></LoadingSpiner>
              ) : (
                "Add new user"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserAddNew;
