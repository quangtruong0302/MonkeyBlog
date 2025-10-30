import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@firebase-app/firebaseConfig";
import useAuth from "@contexts/useAuth";

import Button from "@components/button/Button";
import DashboardHeading from "@components/dashboard/DashboardHeading";
import Field from "@components/field/Field";
import FieldCheckboxes from "@components/drafts/FieldCheckboxes";
import ImageUpload from "@components/image/ImageUpload";
import Input from "@components/Input/Input";
import Label from "@components/label/Label";
import Radio from "@components/checkbox/Radio";
import Toggle from "@components/toggle/Toggle";
import { Dropdown } from "@components/dropdown";
import LoadingSpiner from "@components/loading/LoadingSpiner";

import useUploadImage from "@hooks/useUploadImage";
import { postStatus } from "@utils/constant";
import { useNavigate } from "react-router-dom";

const PostAddNew = () => {
  const schemaValidate = Yup.object({
    title: Yup.string().required("Title is required. Please enter title."),
  });
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Monkey Bloging - Add new post";
  }, []);
  const { userInfor } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidate),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: `${postStatus.PENDING}`,
      categoryId: "",
      hot: false,
    },
  });
  const {
    imgCloud,
    setImgCloud,
    progress,
    setProgress,
    handleDeleteImage,
    handleSelectImage,
  } = useUploadImage();
  const watchStatus = Number(watch("status"));
  const watchHot = watch("hot");

  const handleAddNewPost = async (values) => {
    setIsLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, {
        lower: true,
        locale: "vi",
      });
      cloneValues.status = Number(values.status);
      cloneValues.imageUrl = imgCloud || "";
      cloneValues.userId = userInfor.uid;

      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      toast.success("Post added successfully!");
      reset({
        title: "",
        slug: "",
        status: `${postStatus.PENDING}`,
        categoryId: "",
        hot: false,
        image: "",
      });
      setImgCloud({});
      setProgress(0);
      setSelectCategory({});
      navigate("/manage/posts");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClickOption = (category) => {
    setSelectCategory(category);
    setValue("categoryId", category.id);
  };
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);

      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(results);
    }
    getData();
  }, []);
  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0].message);
    }
  }, [errors]);
  return (
    <div className="flex flex-col gap-10">
      <DashboardHeading title="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewPost)}>
        <div className="grid grid-cols-2 gap-y-10 gap-x-5 mb-10">
          <Field>
            <Label htmlFor={"title"}>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              id="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label htmlFor={"slug"}>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
              id="slug"
            ></Input>
            <span className="text-sm text-slate-600">
              * Slug (e.g., your-blog-title). If left empty, it will be
              generated from the title.
            </span>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={selectCategory.name || "Select the category"}
                className="rounded-sm px-3 py-2"
              ></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <Dropdown.Option
                      key={category.id}
                      onClick={() => {
                        handleClickOption(category);
                      }}
                    >
                      {category.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
          <Field>
            <Label>Image</Label>
            <ImageUpload
              name="image"
              onChange={handleSelectImage}
              progress={progress}
              image={imgCloud}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                value={Number(postStatus.APPROVED)}
                checked={watchStatus === Number(Number(postStatus.APPROVED))}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={Number(postStatus.PENDING)}
                checked={watchStatus === Number(Number(postStatus.PENDING))}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                value={Number(postStatus.REJECT)}
                checked={watchStatus === Number(Number(postStatus.REJECT))}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Feature post</Label>
            <div className="flex gap-3 items-center">
              <Toggle
                on={watchHot === true}
                onClick={() => setValue("hot", !watchHot)}
              ></Toggle>
              <span className="text-sm text-slate-600">
                * Selecting this will make your post featured on the homepage.
              </span>
            </div>
          </Field>
        </div>
        <div className="mx-auto w-[250px]">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoadingSpiner size={"30px"} borderSize={"3px"}></LoadingSpiner>
            ) : (
              "Add new post"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostAddNew;
