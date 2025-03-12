import { connectDB } from "@/lib/mongodb";
import Folio, { IFolio, generateUID } from "@/models/mongodb/Folio";
import Sorteo, { calcularTotal } from "@/models/mongodb/Sorteo";
import Cliente from "@/models/mongodb/Cliente"; 

// Ensure that the database connection is established
connectDB();

// *** CREATE ***

// Funcion para crear un nuevo folio
export const createFolio = async (sorteo: number, telefono: string, boletos: number[]): Promise<IFolio> => {
    // Crear un UID para el folio, verificar que no exista en la base de datos, si existe, crear otro UID
    let uid = generateUID();
    while (await Folio.findOne({ uid })) {
        uid = generateUID();
    }

    // verificar que el numero de sorteo existe
    const sorteoDoc = await Sorteo.findOne({ numero: sorteo });
    if (!sorteoDoc) {
        throw new Error("Sorteo no encontrado");
    }

    // Verificar que el cliente existe
    const cliente = await Cliente.findOne({ telefono: telefono });
    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }

    // En la función createFolio:
    const total = calcularTotal(boletos.length, sorteoDoc.precios);

    // Crear el folio en la base de datos
    const folio = Folio.create({
        uid,
        sorteo: sorteoDoc._id,
        cliente: cliente._id,
        boletos,
        total,
    });

    return folio;
};

// *** READ ***

// Funcion para obtener un folio por su UID
export const getFolioByUID = async (uid: string): Promise<IFolio | null> => {
    // Buscar el folio por su UID
    const folio = await Folio.findOne({ uid });
    return folio;
}

// Funcion para buscar un numero de boleto en los folios
export const findBoleto = async (numero: number): Promise<IFolio | null> => {
    // Buscar un folio que contenga el numero de boleto
    const folio = await Folio.findOne({ boletos: numero });
    return folio;
}

// Funcion para obtener todos los numeros de boletos pendientes en un sorteo
export const getBoletosPendientes = async (sorteo: number): Promise<number[]> => {
    // Buscar el sorteo por su numero
    const sorteoDoc = await Sorteo.findOne({ numero: sorteo });
    if (!sorteoDoc) {
        throw new Error("Sorteo no encontrado");
    }

    // Buscar todos los folios pendientes en el sorteo
    const folios = await Folio.find({ sorteo: sorteoDoc._id, estado: "pendiente" });

    // Obtener todos los numeros de boletos pendientes
    const boletosPendientes = folios.reduce((boletos, folio) => [...boletos, ...folio.boletos], [] as number[]);
    return boletosPendientes;
}

// Funcion para obtener todos los numeros de boletos pagados en un sorteo
export const getBoletosPagados = async (sorteo: number): Promise<number[]> => {
    // Buscar el sorteo por su numero
    const sorteoDoc = await Sorteo.findOne({ numero: sorteo });
    if (!sorteoDoc) {
        throw new Error("Sorteo no encontrado");
    }

    // Buscar todos los folios pendientes en el sorteo
    const folios = await Folio.find({ sorteo: sorteoDoc._id, estado: "pagados" });

    // Obtener todos los numeros de boletos pendientes
    const boletosPendientes = folios.reduce((boletos, folio) => [...boletos, ...folio.boletos], [] as number[]);
    return boletosPendientes;
}

// *** UPDATE ***

// Funcion para confirmar un folio
export const confirmFolio = async (uid: string): Promise<IFolio | null> => {
    // Buscar el folio por su UID
    const folio = await Folio.findOne({ uid });
    if (!folio) {
        throw new Error("Folio no encontrado");
    }

    // Actualizar el estado del folio a "pagado"
    folio.estado = "pagado";
    folio.fechaConfirmacion = new Date();
    await folio.save();
    return folio;
}

// *** DELETE ***

// Funcion para eliminar un folio
export const deleteFolio = async (uid: string): Promise<IFolio | null> => {
    // Buscar el folio por su UID
    const folio = await Folio.findOne({ uid });
    if (!folio) {
        throw new Error("Folio no encontrado");
    }

    // Eliminar el folio de la base de datos
    await folio.remove();
    return folio;
}

// Funcion para eliminar todos los folios de un sorteo
export const deleteFoliosBySorteo = async (sorteo: number): Promise<void> => {
    // Buscar el sorteo por su numero
    const sorteoDoc = await Sorteo.findOne({ numero: sorteo });
    if (!sorteoDoc) {
        throw new Error("Sorteo no encontrado");
    }

    // Eliminar todos los folios del sorteo
    await Folio.deleteMany({ sorteo: sorteoDoc._id });
}

// Funcion para eliminar todos los folios de un cliente
export const deleteFoliosByCliente = async (cliente: string): Promise<void> => {
    // Eliminar todos los folios del cliente
    await Folio.deleteMany({ cliente });
}
