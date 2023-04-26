import axios from 'axios';

// À mettre à jour avec l'url d'upload nécessaire
// const API_URL = process.env.VUE_APP_API_URL;

// Upload file
const upload = async (file, handleUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(
      'https://httpbin.org/post',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: handleUploadProgress,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const api = {};
api.upload = upload;

export default api;
