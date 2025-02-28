import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Ensure dotenv is configured with the correct path
dotenv.config({ 
  path: path.resolve(process.cwd(), '.env.local') 
});

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "⚠️ La variable de entorno MONGODB_URI no está definida en .env.local\n" +
    "Asegúrate de crear el archivo .env.local con la variable MONGODB_URI"
  );
}

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log("📦 Conexión a MongoDB establecida");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
