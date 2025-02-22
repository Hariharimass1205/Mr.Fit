import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

console.log("came to multer page")
// Define an interface for the params object
interface CloudinaryParams {
  folder: string; // Folder name in Cloudinary
  allowed_formats: string[]; // Allowed formats for the upload
  transformation: { width: number; height: number; crop: string }[]; // Transformations to apply (e.g., resizing)
}

// Configure Cloudinary
cloudinary.config({
  cloud_name:'dk93uklye',
  api_key:'443942247926844',
  api_secret:'XaqGTefNRvrcEuAxlkJMpOC6gq0'
});

// Configure Multer with Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pics', // This is valid for Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp',], // Optional: Restrict formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: Resize images
  } as CloudinaryParams // Type assertion using the CloudinaryParams interface
});

// Initialize Multer
const upload = multer({ storage });

export default upload;