import mongoose, { Schema, Document } from "mongoose";

export interface PremioSorteo {
  descripcion: string; // Descripción del premio
  Condiciones: string; // Condiciones del premio
}

export interface PrecioBoleto {
  cantidad: number; // Cantidad de boletos
  precio: number; // Precio por boleto
}

export interface ISorteo extends Document {
  titulo: string;
  descripcion: string;
  premios: PremioSorteo[];
  fechaInicio: Date;
  fechaSorteo: Date;
  condiciones: string;
  precios: PrecioBoleto[];
  tiempoSeleccion: number;
  tiempoApartado: number;
}

const SorteoSchema = new Schema<ISorteo>({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  premios: [{ descripcion: String, condiciones: String, required: true }],
  fechaInicio: { type: Date, required: true },
  fechaSorteo: { type: Date, required: true },
  condiciones: { type: String, required: true },
  precios: [{ cantidad: Number, precio: Number }],
  tiempoSeleccion: { type: Number, default: 60 },
  tiempoApartado: { type: Number, default: 600 }
});

export default mongoose.models.Sorteo || mongoose.model<ISorteo>("Sorteo", SorteoSchema);
