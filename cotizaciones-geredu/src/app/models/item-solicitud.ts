// src/app/models/item-solicitud.model.ts

export interface ItemSolicitud {
  id?: number;
  solicitudId?: number;
  seccion: string;
  descripcion: string;
  cantidad: number;
  unidadMedida: string;
  caracteristica: string;
  detalle: string;
}
