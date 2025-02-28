import mongoose, { Schema, Document } from "mongoose";

interface Precio {
  cantidad: number;
  precio: number;
}

interface IBoletoVendido {
    numero: number;
    telefono: string;
    fechaCompra: Date;
}

interface IBoletoApartado {
  numero: number;
  telefono: string;
  startDate: Date;
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
  boletosApartados: IBoletoApartado[];
  boletosVendidos: IBoletoVendido[];
}

const SorteoSchema = new Schema<ISorteo>({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  premioPrincipal: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaSorteo: { type: Date, required: true },
  condiciones: { type: String, required: true },
  precios: [{ 
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true }
  }],
  tiempoSeleccion: { type: Number, default: 60*10 }, // segundos
  tiempoApartado: { type: Number, default: 60*60*24 }, // segundos
  boletosApartados: [{
    numero: { type: Number, required: true },
    telefono: { type: String, required: true },
    startDate: { type: Date, required: true }
  }],
  boletosVendidos: [{
    numero: { type: Number, required: true },
    telefono: { type: String, required: true },
    fechaCompra: { type: Date, required: true }
  }]
});

export default mongoose.models.Sorteo || mongoose.model<ISorteo>("Sorteo", SorteoSchema);
