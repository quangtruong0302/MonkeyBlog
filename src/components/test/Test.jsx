import React from "react";
import Field from "@components/field/Field";
import Label from "@components/label/Label";
import ImageUpload from "@components/image/ImageUpload";
import useUploadImage from "@hooks/useUploadImage";
import { useForm } from "react-hook-form";

const Test = () => {
  const { imgCloud, progress, handleDeleteImage, handleSelectImage } =
    useUploadImage();
  const { handleSubmit } = useForm({
    mode: "onChange",
  });
  return (
    <div>
      <form onSubmit={handleSubmit(handle)}>
        <Field>
          <Label>Image</Label>
          <ImageUpload
            name="image"
            onChange={handleSelectImage}
            progress={progress}
            image={imgCloud || ""}
            handleDeleteImage={handleDeleteImage}
          />
        </Field>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Test;
