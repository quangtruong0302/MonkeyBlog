import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

export const uploadToCloudinary = async (file, setProcess) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      {
        onUploadProgress: (event) => {
          if (setProcess && event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProcess(percent);
          }
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Lỗi upload Cloudinary:", error);
    throw new Error("Không thể upload ảnh. Vui lòng thử lại!");
  }
};
