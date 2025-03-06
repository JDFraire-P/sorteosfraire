import mongoose, { Schema, Document } from "mongoose";

export interface IFolio extends Document {
  uid: string; // Identificador único del folio
  cliente: mongoose.Types.ObjectId; // Referencia al cliente
  boletos: mongoose.Types.ObjectId[]; // Referencias a boletos
  total: number; // Total a pagar
  estado: "pendiente" | "pagado"; // Estado del pago
  fechaApartado: Date; // Cuándo se generó el folio
  fechaConfirmacion?: Date; // Cuándo se confirmó el pago (opcional)
}

const FolioSchema = new Schema<IFolio>({
  uid: { type: String, required: true, unique: true }, // Se generará un UID único
  cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
  boletos: [{ type: Schema.Types.ObjectId, ref: "Boleto", required: true }],
  total: { type: Number, required: true },
  estado: { type: String, enum: ["pendiente", "pagado"], default: "pendiente" },
  fechaApartado: { type: Date, default: Date.now },
  fechaConfirmacion: { type: Date },
});

export default mongoose.models.Folio || mongoose.model<IFolio>("Folio", FolioSchema);
