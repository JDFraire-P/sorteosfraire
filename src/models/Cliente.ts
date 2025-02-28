import mongoose, { Schema, Document } from "mongoose";

export interface ICliente extends Document {
  telefono: string;
  nombres: string;
  apellidos: string;
  estado: string;
}

const ClienteSchema = new Schema<ICliente>({
  telefono: { type: String, required: true, unique: true },
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  estado: { type: String, required: true }
});

export default mongoose.models.Cliente || mongoose.model<ICliente>("Cliente", ClienteSchema);
