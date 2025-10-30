import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

import Button from "@components/button/Button";
import DashboardHeading from "@components/dashboard/DashboardHeading";
import Field from "@components/field/Field";
import ImageUpload from "@components/image/ImageUpload";
import Input from "@components/Input/Input";
import Label from "@components/label/Label";
import Radio from "@components/checkbox/Radio";
import Toggle from "@components/toggle/Toggle";
import { Dropdown } from "@components/dropdown";
import LoadingSpiner from "@components/loading/LoadingSpiner";

import useUploadImage from "@hooks/useUploadImage";
import { postStatus } from "@utils/constant";
import { useNavigate, useParams } from "react-router-dom";

const PostUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const schemaValidate = Yup.object({
    title: Yup.string().required("Title is required."),
  });

  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const { control, watch, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(schemaValidate),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: postStatus.PENDING,
      categoryId: "",
      hot: false,
      imageUrl: "",
    },
  });

  const {
    imgCloud,
    setImgCloud,
    progress,
    handleDeleteImage,
    handleSelectImage,
  } = useUploadImage();
  const watchStatus = Number(watch("status"));
  const watchHot = watch("hot");

  useEffect(() => {
    const getCategories = async () => {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(results);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const docRef = doc(db, "posts", id);
      const singleDoc = await getDoc(docRef);
      const postData = singleDoc.data();
      if (!postData) return;
      reset(postData);
      if (postData.content) {
        setContent(postData.content);
      }

      if (postData.categoryId) {
        const catRef = doc(db, "categories", postData.categoryId);
        const catSnap = await getDoc(catRef);
        if (catSnap.exists()) {
          setSelectCategory({ id: catSnap.id, ...catSnap.data() });
        }
      }
      setImgCloud(postData.imageUrl);
    };
    fetchPost();
  }, [id, reset, setImgCloud]);
  const handleClickOption = (category) => {
    setSelectCategory(category);
    setValue("categoryId", category.id);
  };

  const handleUpdatePost = async (values) => {
    setIsLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, {
        lower: true,
        locale: "vi",
      });
      cloneValues.status = Number(values.status);
      cloneValues.imageUrl = imgCloud || "";
      cloneValues.content = content;
      cloneValues.updatedAt = new Date();
      if (selectCategory.id) {
        cloneValues.categoryId = selectCategory.id;
      }
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, cloneValues);
      toast.success("Post updated successfully!");
      navigate("/manage/posts");
    } catch (error) {
      console.error("Update post error:", error);
      toast.error("Update post failed!");
    } finally {
      setIsLoading(false);
    }
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  useEffect(() => {
    document.title = "Update post";
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <DashboardHeading title="Update post"></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
        <div className="grid grid-cols-2 gap-y-10 gap-x-5 mb-10">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              control={control}
              name="title"
              id="title"
              placeholder="Enter your title"
            />
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              name="slug"
              id="slug"
              placeholder="Enter your slug"
            />
            <span className="text-sm text-slate-600">
              * Slug (e.g., your-blog-title). If left empty, it will be
              generated from the title.
            </span>
          </Field>
          <div className="flex flex-col gap-10">
            <Field>
              <Label>Category</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={selectCategory.name || "Select the category"}
                  className="rounded-sm px-3 py-2 border border-gray-300 bg-white cursor-pointer"
                />
                <Dropdown.List className="bg-white border border-gray-300 rounded shadow-lg mt-1">
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <Dropdown.Option
                        key={category.id}
                        onClick={() => handleClickOption(category)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {category.name}
                      </Dropdown.Option>
                    ))}
                </Dropdown.List>
              </Dropdown>
            </Field>

            <Field>
              <Label>Status</Label>
              <div className="flex gap-5">
                <Radio
                  name="status"
                  control={control}
                  value={postStatus.APPROVED}
                  checked={watchStatus === postStatus.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  value={postStatus.PENDING}
                  checked={watchStatus === postStatus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  value={postStatus.REJECT}
                  checked={watchStatus === postStatus.REJECT}
                >
                  Reject
                </Radio>
              </div>
            </Field>

            <Field>
              <Label>Feature post</Label>
              <div className="flex gap-3 items-center">
                <Toggle
                  on={watchHot}
                  onClick={() => setValue("hot", !watchHot)}
                />
                <span className="text-sm text-slate-600">
                  * Selecting this will make your post featured on the homepage.
                </span>
              </div>
            </Field>
          </div>
          <Field>
            <Label>Image</Label>
            <ImageUpload
              name="image"
              className="!p-0"
              onChange={handleSelectImage}
              progress={progress}
              image={imgCloud || ""}
              handleDeleteImage={handleDeleteImage}
            />
          </Field>
        </div>
        <div className="my-10">
          <Field>
            <Label>Content</Label>
            <div className="entry-content">
              <ReactQuill
                theme="snow"
                formats={formats}
                modules={modules}
                value={content}
                onChange={setContent}
              />
            </div>
          </Field>
        </div>

        <div className="mx-auto w-[250px]">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoadingSpiner size="30px" borderSize="3px" />
            ) : (
              "Update post"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostUpdate;
