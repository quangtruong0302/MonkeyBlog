import React, { useState } from "react";
import { uploadToCloudinary } from "@utils/uploadToCloudinary";
import { deleteFromCloudinary } from "@utils/deleteFromCloudinary";

const useUploadImage = () => {
  const [progress, setProgress] = useState(0);
  const [imgCloud, setImgCloud] = useState({});

  const handleSelectImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgCloud(await uploadToCloudinary(file, setProgress));
  };
  const handleDeleteImage = async () => {
    await deleteFromCloudinary(imgCloud.delete_token);
    setImgCloud({});
    setProgress(0);
  };
  return {
    imgCloud,
    setImgCloud,
    progress,
    setProgress,
    handleSelectImage,
    handleDeleteImage,
  };
};

export default useUploadImage;
