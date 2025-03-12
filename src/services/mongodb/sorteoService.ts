import { connectDB } from "@/lib/mongodb";
import Sorteo, {ISorteo } from "@/models/mongodb/Sorteo";

// Ensure that the database connection is established
connectDB();

// *** CREATE ***
// Funcion para crear un nuevo sorteo
export const createSorteo = async (sorteo: ISorteo): Promise<ISorteo> => {

    // verificar que el numero sea el siguiente en la secuencia
    const ultimoSorteo = await Sorteo.findOne().sort({ numero: -1 });

    // si no hay sorteos, el numero sera 1
    if (!ultimoSorteo) {
        sorteo.numero = 1;
    } else {
        sorteo.numero = ultimoSorteo.numero + 1;
    }

    // crear los boletos disponibles en redis
    // TODO: Implementar la creación de boletos disponibles en redis (/src/services/redis/boletoService.ts)

    // Crear el sorteo en la base de datos
    const sorteoDoc = await Sorteo.create(sorteo);
    return sorteoDoc;
};

// *** READ ***
// Funcion para obtener un sorteo por su numero
export const getSorteoByNumero = async (numero: number): Promise<ISorteo | null> => {
    // Buscar el sorteo por su numero
    const sorteo = await Sorteo.findOne({ numero });
    return sorteo;
}

// Funcion para obtener todos los sorteos
export const getAllSorteos = async (): Promise<ISorteo[]> => {

    // Buscar todos los sorteos
    const sorteos = await Sorteo.find();
    return sorteos;
}

// Funcion para obtener los sorteos disponibles
export const getSorteosDisponibles = async (): Promise<ISorteo[]> => {

    // Buscar los sorteos disponibles
    const sorteos = await Sorteo.find({ fechaInicio: { $lte: new Date() }, fechaSorteo: { $gte: new Date() } });
    return sorteos;
}

// Funcion para obtener los sorteos pasados
export const getSorteosPasados = async (): Promise<ISorteo[]> => {

    // Buscar los sorteos pasados
    const sorteos = await Sorteo.find({ fechaSorteo: { $lt: new Date() } });
    return sorteos;
}


// *** UPDATE ***
// Funcion para actualizar un sorteo
export const updateSorteo = async (numero: number, sorteo: ISorteo): Promise<ISorteo | null> => {
    // Buscar y actualizar el sorteo
    const sorteoDoc = await Sorteo.findOneAndUpdate({ numero }, sorteo, { new: true });
    return sorteoDoc;
}


// *** DELETE ***
// Funcion para eliminar un sorteo
export const deleteSorteo = async (numero: number): Promise<ISorteo | null> => {
    // Buscar y eliminar el sorteo
    const sorteo = await Sorteo.findOneAndDelete({ numero });
    return sorteo;
}

