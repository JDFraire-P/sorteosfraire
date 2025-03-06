import mongoose, { Schema, Document } from "mongoose";

// Definir enum para los estados de mexico
const estados = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas"
];


export interface ICliente extends Document {
  telefono: string;
  nombres: string;
  estado: string;
  apellidos: string;
}

const ClienteSchema = new Schema<ICliente>({
  telefono: { type: String, required: true, unique: true },
  nombres: { type: String, required: true },
  estado: { type: String, required: true, enum: estados, default: "Ciudad de México" },
  apellidos: { type: String, required: true }
});

export default mongoose.models.Cliente || mongoose.model<ICliente>("Cliente", ClienteSchema);
