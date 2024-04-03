export enum TipoContacto {
    Cliente,
    Proveedor
}


export interface IContacto {
    id: string;
    userUpdatedId: string;
    fechaCreado: Date;
    nombre: string;
    empresa: string;
    notas: string;
    telefono: string;
    email: string;
    tipo: TipoContacto;
}