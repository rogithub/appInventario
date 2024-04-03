

export enum TipoMovimientoBancario {
    Gasto,
    Ingreso
}


export interface IMovimientoBancario {
    id: string;
    userUpdatedId: string;
    fechaCreado: Date;
    concepto: string;
    dinero: number;
    balance: number;
    tipo: TipoMovimientoBancario;
}