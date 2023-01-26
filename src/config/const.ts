const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string;
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/400';

export { UPLOAD_PRESET, CLOUDINARY_URL, DEFAULT_IMAGE_URL };
