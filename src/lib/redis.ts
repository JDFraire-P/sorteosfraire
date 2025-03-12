import Redis from "ioredis";
import dotenv from "dotenv";
import path from "path";

// Ensure dotenv is configured with the correct path
dotenv.config({ 
  path: path.resolve(process.cwd(), '.env.local') 
});

const REDIS_URI = process.env.REDIS_URI;

if (!REDIS_URI) {
  throw new Error(
    "⚠️ La variable de entorno REDIS_URI no está definida en .env.local\n" +
    "Asegúrate de crear el archivo .env.local con la variable REDIS_URI"
  );
}

const redis = new Redis(REDIS_URI);

export default redis;