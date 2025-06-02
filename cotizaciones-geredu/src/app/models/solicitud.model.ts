import { AnexoSolicitud } from "./anexo-solicitud";
import { ItemSolicitud } from "./item-solicitud";

export interface Solicitud {
  id?: number;
  numeroSolicitud: string;
  anio: number;
  tipo: string;
  numeroPedido: string;
  unidadEjecutora: string;
  codigoUnidad: string;
  numeroConsolidado: string;
  rubro: string;
  concepto: string;
  publicadoPor: string;
  fechaInicio: string;  // usar ISO string (ej. "2025-05-23T14:00:00")
  fechaLimite: string;
  anexos?: AnexoSolicitud[];       // puedes definir la interfaz si ya tienes el modelo
  items?: ItemSolicitud[];
}