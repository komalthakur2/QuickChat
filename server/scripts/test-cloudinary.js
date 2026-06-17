import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

// Load environment variables
dotenv.config();

console.log("=== CLOUDINARY DIAGNOSTICS ===");
console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME || "Not defined");
console.log("API KEY:   ", process.env.CLOUDINARY_API_KEY ? `${process.env.CLOUDINARY_API_KEY.substring(0, 4)}... (length: ${process.env.CLOUDINARY_API_KEY.length})` : "Not defined");
console.log("API SECRET:", process.env.CLOUDINARY_API_SECRET ? "Exists (hidden)" : "Not defined");

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("\n[ERROR] Missing Cloudinary environment variables in .env!");
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// A tiny 1x1 transparent pixel to test uploads
const dummyImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

console.log("\nTesting upload with a 1x1 test image...");

cloudinary.uploader.upload(dummyImage)
  .then((result) => {
    console.log("\n[SUCCESS] Cloudinary is configured correctly!");
    console.log("Test Image URL:", result.secure_url);
    process.exit(0);
  })
  .catch((err) => {
    console.error("\n[FAILED] Cloudinary returned an error:");
    console.error("HTTP Code:", err.http_code);
    console.error("Error Message:", err.message);
    
    if (err.http_code === 403) {
      console.error("\n[HELP] This is a permissions error. Please check your Cloudinary Console (Settings > API Keys) and verify that your API key is active and has the 'Admin' or 'Master Admin' role assigned.");
    } else if (err.http_code === 401) {
      console.error("\n[HELP] This is an authentication error. Please verify that your API Key and API Secret in .env are copied correctly and match your dashboard.");
    }
    process.exit(1);
  });
