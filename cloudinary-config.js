import cloudinary from './cloudinarysecrets'

const cloud = cloudinary.config({ 
    cloud_name: cloudinary.cloud_name, 
    api_key: cloudinary.api_key, 
    api_secret: cloudinary.api_secret
  });

  export default cloud