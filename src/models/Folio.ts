import mongoose, { Schema, Document } from "mongoose";
import { randomUUID } from "crypto";

// Función para generar un UID único de 10 caracteres alfanuméricos. Ejemplo: "aGB2c3DKe5"
const generateUID = (): string => randomUUID().replace(/-/g, "").slice(0, 10);

export interface IFolio extends Document {
  uid: string; // Identificador único del folio
  cliente: mongoose.Types.ObjectId; // Referencia al cliente
  sorteo: mongoose.Types.ObjectId; // Referencia al sorteo
  boletos: number[]; // Números de boletos apartados
  total: number; // Total a pagar
  estado: "pendiente" | "pagado"; // Estado del pago del folio (apartado o confirmado)
  fechaCreacion: Date; // Cuándo se generó el folio
  fechaConfirmacion?: Date; // Cuándo se confirmó el pago (opcional)
}

const FolioSchema = new Schema<IFolio>({
  uid: { type: String, required: true, unique: true, default: generateUID },
  cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
  sorteo: { type: Schema.Types.ObjectId, ref: "Sorteo", required: true },
  boletos: [{ type: Schema.Types.ObjectId, ref: "Boleto", required: true }],
  total: { type: Number, required: true },
  estado: { type: String, enum: ["pendiente", "pagado"], default: "pendiente" },
  fechaCreacion: { type: Date, default: Date.now },
  fechaConfirmacion: { type: Date },
});

export default mongoose.models.Folio || mongoose.model<IFolio>("Folio", FolioSchema);