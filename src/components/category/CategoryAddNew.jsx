import Button from "@components/button/Button";
import Radio from "@components/checkbox/Radio";
import Field from "@components/field/Field";
import Input from "@components/Input/Input";
import Label from "@components/label/Label";
import LoadingSpiner from "@components/loading/LoadingSpiner";
import DashboardHeading from "@components/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { categoryStatus } from "@utils/constant";
import slugify from "slugify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CategoryAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: Number(categoryStatus.APPROVED),
    },
  });
  const navigate = useNavigate();
  const watchStatus = Number(watch("status"));
  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.name, {
      lower: true,
      locale: "vi",
    });
    cloneValues.status = Number(values.status);

    const colRef = collection(db, "categories");
    await addDoc(colRef, {
      ...cloneValues,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    toast.success("Category added successfully!");
    reset({
      name: "",
      slug: "",
      status: `${categoryStatus.APPROVED}`,
      createdAt: new Date(),
    });
    navigate("/manage/categories");
  };
  return (
    <div className="flex flex-col gap-10">
      <DashboardHeading title="Add new category"></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
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
              "Add new category"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryAddNew;
