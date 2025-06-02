import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnexosService {
  private api = 'http://localhost:8080/api/anexos';

  constructor(private http: HttpClient) {}

  getBySolicitudId(solicitudId: number) {
    return this.http.get<any[]>(`${this.api}/solicitud/${solicitudId}`);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  create(data: any) {
    // Usa el método upload para enviar archivo junto con datos
    return this.upload(data.file, data.tipoDocumento, data.solicitudId);
  }

  upload(file: File, tipoDocumento: string, solicitudId: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tipoDocumento', tipoDocumento);
    formData.append('solicitudId', solicitudId.toString());

    return this.http.post(`${this.api}/upload`, formData);
  }

  update(id: number, data: any) {
    // Si viene archivo, usa FormData; si no, enviar JSON normal
    if (data.file) {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('tipoDocumento', data.tipoDocumento);
      formData.append('solicitudId', data.solicitudId.toString());
      return this.http.put(`${this.api}/upload/${id}`, formData);
    } else {
      // Actualización sin archivo (solo metadatos)
      return this.http.put(`${this.api}/${id}`, {
        tipoDocumento: data.tipoDocumento,
        solicitudId: data.solicitudId,
        nombreArchivo: data.nombreArchivo
      });
    }
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
