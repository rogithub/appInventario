export interface IPedidoItem {
    productoId: string;
    cantidad: number;
}

export interface IPedido {
    id: number;
    uid: string;
    userUpdatedId: string;
    fechaCreado: Date;    
    cliente: string;
    contacto: string;
    items: IPedidoItem[]
}
