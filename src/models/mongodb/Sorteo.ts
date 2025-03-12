import mongoose, { Schema, Document } from "mongoose";

export interface PremioSorteo {
  descripcion: string; // Descripción del premio
  Condiciones: string; // Condiciones para ganar el premio
}

export interface PrecioBoleto {
  cantidad: number; // Si se compran mas de esta cantidad, se aplica el precio 
  precio: number; // Precio por boleto
}

// calcular el total a pagar
export const calcularTotal = (cantidadBoletos: number, precios: PrecioBoleto[]): number => {
  // Ordenar precios de mayor a menor cantidad para encontrar el precio correcto
  const precioAplicable = precios
      .sort((a, b) => b.cantidad - a.cantidad)
      .find(precio => cantidadBoletos >= precio.cantidad); // Encontrar el precio correcto
  return precioAplicable ? cantidadBoletos * precioAplicable.precio : 0;
};

export interface ISorteo extends Document {
  titulo: string;
  numero: number; // Numero de sorteo
  descripcion: string;
  premios: PremioSorteo[]; 
  fechaInicio: Date;
  fechaSorteo: Date;
  boletos: number; // Cantidad de boletos disponibles
  precios: PrecioBoleto[]; // Lista de precios por cantidad de boletos
  tiempoSeleccion: number; // Tiempo en segundos para seleccionar boletos
  tiempoApartado: number; // Tiempo en segundos para apartar boletos
}

const SorteoSchema = new Schema<ISorteo>({
  titulo: { type: String, required: true },
  numero: { type: Number, required: true },
  descripcion: { type: String, required: true },
  premios: [{ descripcion: String, condiciones: String, required: true }],
  fechaInicio: { type: Date, required: true },
  fechaSorteo: { type: Date, required: true },
  boletos: { type: Number, required: true, default: 60000 },
  precios: [{ cantidad: Number, precio: Number }],
  tiempoSeleccion: { type: Number, default: 60 * 8 }, // 8 minutos
  tiempoApartado: { type: Number, default: 60 * 60 * 24 * 2 } // 2 días
});

export default mongoose.models.Sorteo || mongoose.model<ISorteo>("Sorteo", SorteoSchema); // Export model Sorteo or create a new one if it doesn't exist