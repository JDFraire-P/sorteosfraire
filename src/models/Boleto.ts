import mongoose, { Schema, Document } from "mongoose";

export interface IBoleto extends Document {
  numero: number;
  sorteoId: mongoose.Types.ObjectId;
  estado: "disponible" | "seleccionado" | "apartado" | "comprado";
  folioId?: mongoose.Types.ObjectId;
}

const BoletoSchema = new Schema<IBoleto>({
  numero: { type: Number, required: true },
  sorteoId: { type: Schema.Types.ObjectId, ref: "Sorteo", required: true },
  estado: { type: String, enum: ["disponible", "seleccionado", "apartado", "comprado"], default: "disponible" },
  folioId: { type: Schema.Types.ObjectId, ref: "Folio", required: false }
});

export default mongoose.models.Boleto || mongoose.model<IBoleto>("Boleto", BoletoSchema);
