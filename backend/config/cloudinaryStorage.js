import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'food_items',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [
      { width: 400, height: 300, crop: "fill" } 
    ]
  },
});

export default storage;
