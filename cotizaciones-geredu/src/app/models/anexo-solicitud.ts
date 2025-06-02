// src/app/models/anexo-solicitud.model.ts

export interface AnexoSolicitud {
  id?: number;
  solicitudId?: number;  // Si necesitas hacer referencia por ID
  tipoDocumento: TipoDocumento;
  nombreArchivo: string;
  urlArchivo: string;
}

export type TipoDocumento = 'COTIZACION' | 'DECLARACION_JURADA' | 'REGISTRO_PROVEEDOR' | 'FICHA_TECNICA' | 'OTRO' | 'ESPECIFICACIONES TéCNICAS';
