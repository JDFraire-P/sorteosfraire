import mongoose, { Schema, Document } from "mongoose";
import { estadosMX, estados_mx } from "@/models/types/estadosMX";

export interface ICliente extends Document {
  telefono: string;
  nombres: string;
  apellidos: string;
  estado_mx: estadosMX;
}

const ClienteSchema = new Schema<ICliente>({
  telefono: { type: String, required: true, unique: true },
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  estado_mx: { type: String, required: true, enum: estados_mx, default: estados_mx[25] }
});

export default mongoose.models.Cliente || mongoose.model<ICliente>("Cliente", ClienteSchema);
