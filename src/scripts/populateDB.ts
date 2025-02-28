import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Sorteo from "@/models/Sorteo";
import Cliente, { ICliente } from "@/models/Cliente";


const createTestData = async () => {
  console.log("🚀 Creando datos de prueba...");

  await Sorteo.deleteMany({});
  await Cliente.deleteMany({});

  const clientes = [] as ICliente[]; // Arreglo de clientes

  for (let i = 1; i <= 40; i++) {
    clientes.push(
      new Cliente({
        telefono: `55500000${i}`,
        nombres: `Usuario ${i}`,
        apellidos: `Prueba`,
        estado: "CDMX",
      })
    );
  }

  await Cliente.insertMany(clientes);
  console.log("👥 40 Clientes creados");

  const sorteos = [
    {
      titulo: "Sorteo de un Auto",
      descripcion: "Gana un auto último modelo.",
      premioPrincipal: "Auto 2024",
      fechaInicio: new Date(),
      fechaSorteo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Sorteo en 7 días
      condiciones: "Compra un boleto y participa.",
      precios: [{ cantidad: 1, precio: 100 }],
      tiempoSeleccion: 60,
      tiempoApartado: 300,
      boletosApartados: [],
      boletosVendidos: Array.from({ length: 20 }, (_, i) => ({
        numero: i + 1,
        telefono: clientes[i].telefono,
        fechaCompra: new Date(),
      })),
    },
    {
      titulo: "Sorteo de una Moto",
      descripcion: "Gana una motocicleta deportiva.",
      premioPrincipal: "Moto 2024",
      fechaInicio: new Date(),
      fechaSorteo: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // Sorteo en 10 días
      condiciones: "Compra un boleto y participa.",
      precios: [{ cantidad: 1, precio: 50 }],
      tiempoSeleccion: 60,
      tiempoApartado: 300,
      boletosApartados: [],
      boletosVendidos: Array.from({ length: 20 }, (_, i) => ({
        numero: i + 21,
        telefono: clientes[i + 20].telefono,
        fechaCompra: new Date(),
      })),
    },
  ];

  await Sorteo.insertMany(sorteos);
  console.log("🎟️ 2 Sorteos creados con 20 boletos vendidos cada uno.");

  mongoose.connection.close();
  console.log("🔌 Conexión cerrada.");
};

const run = async () => {
  await connectDB();
  await createTestData();
};

run();
