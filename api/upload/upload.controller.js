const fs = require('fs');
const cloudinary = require('cloudinary').v2;

async function uploadImage(image) {
  try {
    const result = await cloudinary.uploader.upload(image);
    return result;
  } catch (error) {
    throw new Error(error);
  } finally {
    fs.unlinkSync(image);
  }
}

async function uploadImageHandler(request, response) {
  try {
    const { file } = request;
    const size = file.size / 1024 / 1024;
    if (size > 5) {
      return response.status(400).json({
        message: 'Image size should be less than 5MB',
      });
    }
    const result = await uploadImage(file.path);
    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json(error);
  }
}

module.exports = {
  uploadImageHandler,
};
