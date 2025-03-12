import mongoose, { Schema, Document } from "mongoose";
import { nanoid } from "nanoid";

// Función para generar un UID único de 21 caracteres (Sera usado para una URL segura)
export const generateUID = () => nanoid();	

export interface IFolio extends Document {
  uid: string; // Identificador único del folio
  sorteo: mongoose.Types.ObjectId; // Referencia al sorteo
  cliente: mongoose.Types.ObjectId; // Referencia al cliente
  boletos: number[]; // Números de boletos apartados
  total: number; // Total a pagar
  estado: "pendiente" | "pagado"; // Estado del pago del folio (apartado o confirmado)
  fechaCreacion: Date; // Cuándo se generó el folio
  fechaConfirmacion?: Date; // Cuándo se confirmó el pago (opcional)
}

const FolioSchema = new Schema<IFolio>({
  uid: { type: String, required: true, unique: true},
  sorteo: { type: Schema.Types.ObjectId, ref: "Sorteo", required: true },
  cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
  boletos: { type: [Number], required: true },
  total: { type: Number, required: true },
  estado: { type: String, enum: ["pendiente", "pagado"], default: "pendiente" },
  fechaCreacion: { type: Date, default: Date.now },
  fechaConfirmacion: { type: Date },
});

export default mongoose.models.Folio || mongoose.model<IFolio>("Folio", FolioSchema);