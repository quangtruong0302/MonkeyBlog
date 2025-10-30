import React, { useEffect, useState } from "react";
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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dqo9guoih/image/upload/v1761659184/e6fvpyxm3jng42aog4ds.png";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const schemaValidate = Yup.object({
    fullname: Yup.string().required("Full name is required."),
    username: Yup.string().required("User name is required."),
    email: Yup.string()
      .email("Invalid email format.")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        "Password must include uppercase, lowercase, number, and special char."
      )
      .required("Password is required."),
  });

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
      username: "",
      email: "",
      password: "",
      avatar: DEFAULT_AVATAR,
      status: Number(userStatus.ACTIVE),
      role: Number(userRole.USER),
    },
  });

  const watchStatus = watch("status");
  const watchRole = watch("role");

  const {
    imgCloud,
    setImgCloud,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useUploadImage(setValue, getValues);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        reset(data);
        setUser(data);
        if (data.avatar) {
          setImgCloud(data.avatar);
        }
      }
    };
    fetchUser();
  }, [id, reset, setImgCloud]);

  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0].message);
    }
  }, [errors]);

  const handleDeleteCurrentImage = () => {
    setImgCloud("");
    setValue("avatar", DEFAULT_AVATAR);
    if (user.avatar) {
      handleDeleteImage();
    }
  };

  const handleUpdateUser = async (values) => {
    try {
      const urlAvatar = imgCloud ? imgCloud : DEFAULT_AVATAR;
      await updateDoc(doc(db, "users", id), {
        ...values,
        avatar: urlAvatar,
        status: Number(values.status),
        role: Number(values.role),
      });

      toast.success("User update successful!");
      navigate("/manage/users");
    } catch (error) {
      console.error("Update user error:", error);
      toast.error("Update user failed!");
    }
  };
  useEffect(() => {
    document.title = "Update user";
  }, []);

  if (!id) return null;

  return (
    <div className="flex flex-col gap-10">
      <DashboardHeading title="Update user" desc="Update user information" />
      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="flex flex-col justify-center gap-10 px-30"
      >
        <div className="w-[250px] h-[250px] mx-auto rounded-full">
          <ImageUpload
            className="!rounded-full !p-0 h-full"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteCurrentImage}
            progress={progress}
            image={imgCloud || ""}
            name="avatar"
          />
        </div>

        <div className="grid grid-cols-2 gap-y-10 gap-x-5">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              control={control}
              placeholder="Enter fullname"
            />
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              control={control}
              placeholder="Enter username"
            />
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              control={control}
              placeholder="Enter email"
              type="email"
            />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              control={control}
              placeholder="Enter password"
              type="text"
            />
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
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="mx-auto w-[250px]">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoadingSpiner size="30px" borderSize="3px" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserUpdate;
