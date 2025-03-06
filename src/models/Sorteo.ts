import mongoose, { Schema, Document } from "mongoose";

interface Precio {
  cantidad: number;
  precio: number;
}

export interface ISorteo extends Document {
  titulo: string;
  descripcion: string;
  premioPrincipal: string;
  fechaInicio: Date;
  fechaSorteo: Date;
  condiciones: string;
  precios: Precio[];
  tiempoSeleccion: number;
  tiempoApartado: number;
}

const SorteoSchema = new Schema<ISorteo>({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  premioPrincipal: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaSorteo: { type: Date, required: true },
  condiciones: { type: String, required: true },
  precios: [{ cantidad: Number, precio: Number }],
  tiempoSeleccion: { type: Number, default: 60 },
  tiempoApartado: { type: Number, default: 600 }
});

export default mongoose.models.Sorteo || mongoose.model<ISorteo>("Sorteo", SorteoSchema);
