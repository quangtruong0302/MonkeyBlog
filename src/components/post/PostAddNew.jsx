import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
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

const PostAddNew = () => {
  useEffect(() => {
    document.title = "Monkey Bloging - Add new post";
  }, []);
  const { userInfor } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { control, watch, handleSubmit, setValue, reset } = useForm({
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
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  // const watchCategory = watch("category");

  const handleAddNewPost = async (values) => {
    setIsLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);
      cloneValues.imageUrl = imgCloud.url || "";
      cloneValues.userId = userInfor.uid;
      cloneValues.createdAt = new Date();

      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
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

  return (
    <div className="">
      <ToastContainer></ToastContainer>
      <DashboardHeading title="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewPost)} className="mt-10">
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
              image={imgCloud.url}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                value={`${postStatus.APPROVED}`}
                checked={watchStatus === `${postStatus.APPROVED}`}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={`${postStatus.PENDING}`}
                checked={watchStatus === `${postStatus.PENDING}`}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                value={`${postStatus.REJECT}`}
                checked={watchStatus === postStatus.REJECT}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
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
