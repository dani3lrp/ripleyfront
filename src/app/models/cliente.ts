export interface Transaccion {
    egresoIngreso: string;
    monto: string;
}

export interface Cuenta {
    activo: boolean;
    banco: string;
    tipo: string;
    numCuenta: string;
    transaccion: Transaccion[];
}

export interface Destinatario {
    activo: boolean;
    nombre: string;
    rut: string;
    correo: string;
    telefono: string;
    cuenta: Cuenta[];
}

export interface Movimiento {
    destinatario: Destinatario;
}

export interface Cliente {
    activo: boolean;
    rut: string;
    nombre: string;
    telefono: string;
    correo: string;
    numCuenta: string;
    password: string;
    saldo: string;
    movimientos: Movimiento[];
    _id: string;
}

