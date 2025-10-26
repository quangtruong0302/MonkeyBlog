import Button from "@components/button/Button";
import Radio from "@components/checkbox/Radio";
import Field from "@components/field/Field";
import Input from "@components/Input/Input";
import Label from "@components/label/Label";
import DashboardHeading from "@components/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
import { categoryStatus } from "@utils/constant";
import slugify from "slugify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@firebase-app/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";

const CategoryAddNew = () => {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: `${categoryStatus.APPROVED}`,
      createdAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const handleAddNewCategory = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.name, { lower: true });
    cloneValues.status = Number(values.status);

    const colRef = collection(db, "categories");
    await addDoc(colRef, {
      ...cloneValues,
    });
    toast.success("Category added successfully!");
    console.log(cloneValues);
  };
  return (
    <div>
      <DashboardHeading title="Add new category"></DashboardHeading>
      <ToastContainer></ToastContainer>
      <form className="mt-10" onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="grid grid-cols-2 gap-y-10 gap-x-5 mb-10">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                value={`${categoryStatus.APPROVED}`}
                checked={watchStatus === `${categoryStatus.APPROVED}`}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={`${categoryStatus.UNAPPROVED}`}
                checked={watchStatus === `${categoryStatus.UNAPPROVED}`}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <div className="mx-auto w-[250px]">
          <Button type="submit">Add new category</Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryAddNew;
