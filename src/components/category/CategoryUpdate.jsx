import Button from "@components/button/Button";
import Radio from "@components/checkbox/Radio";
import Field from "@components/field/Field";
import Input from "@components/Input/Input";
import Label from "@components/label/Label";
import LoadingSpiner from "@components/loading/LoadingSpiner";
import DashboardHeading from "@components/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { categoryStatus } from "@utils/constant";
import slugify from "slugify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const CategoryUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: Number(categoryStatus.APPROVED),
    },
  });
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Update category";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const colRef = doc(db, "categories", id);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    };
    fetchData();
  }, [id, reset]);
  if (!id) return null;

  const watchStatus = Number(watch("status"));
  const handleUpdateCategory = async (values) => {
    const colRef = doc(db, "categories", id);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true, locale: "vi" }),
      status: Number(values.status),
      updatedAt: new Date(),
    });
    navigate("/manage/categories");
    toast.success("Category update successful!");
  };
  return (
    <div>
      <DashboardHeading title="Update category"></DashboardHeading>
      <div className="mt-2 text-sm text-gray-500">{`Update your category id: ${id}`}</div>

      <form className="mt-10" onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="grid grid-cols-2 gap-y-10 gap-x-5 mb-10">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
            <span className="text-sm text-slate-600">
              * Slug (e.g., your-blog-title). If left empty, it will be
              generated from the title.
            </span>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                value={Number(categoryStatus.APPROVED)}
                checked={watchStatus === Number(categoryStatus.APPROVED)}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={Number(categoryStatus.UNAPPROVED)}
                checked={watchStatus === Number(categoryStatus.UNAPPROVED)}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <div className="mx-auto w-[250px]">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoadingSpiner size={"30px"} borderSize={"3px"}></LoadingSpiner>
            ) : (
              "Update category"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryUpdate;
