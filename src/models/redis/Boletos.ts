// Cache object for folio data in cache store (Redis)

export interface boletoDisponible {
    sorteo: number;
    numero: number;
}

export interface boletoSeleccionado {
    sorteo: number;
    numero: number;
    cliente: string;
    fechaSeleccion: Date;
}

export interface boletoApartado {
    sorteo: number;
    numero: number;
    cliente: string;
    fechaApartado: Date;
}

export interface boletoPagado {
    sorteo: number;
    numero: number;
    cliente: string;
    fechaPago: Date;
}

// lista de boletos disponibles (cache store)
export const cacheBoletosDisponibles = new Set<boletoDisponible>();

// lista de boletos apartados por todos los usuarios (cache store)
export const cacheBoletosApartados = new Set<boletoApartado>();

// lista de boletos seleccionados por todos los usuarios (cache store)
export const cacheBoletosSeleccionados = new Set<boletoSeleccionado>();

// lista de boletos pagados por todos los usuarios (cache store)
export const cacheBoletosPagados = new Set<boletoPagado>();