import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

/**
 * Delete an image from Cloudinary using its delete_token.
 * Returns:
 *   true  → if the image was deleted successfully
 *   false → if deletion failed or token is invalid/expired
 */
export const deleteFromCloudinary = async (delete_token) => {
  try {
    const formData = new FormData();
    formData.append("token", delete_token);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/delete_by_token`,
      formData
    );
    if (response.data?.result === "ok") {
      return true;
    } else {
      console.warn("Failed to delete image:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return false;
  }
};
