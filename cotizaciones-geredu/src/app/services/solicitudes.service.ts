// src/app/services/solicitudes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  private baseUrl = 'http://localhost:8080/api/solicitudes';

  constructor(private http: HttpClient) {}

  // Solicitudes CRUD
  getSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.baseUrl);
  }

  getSolicitud(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.baseUrl}/${id}`);
  }

  createSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.baseUrl, solicitud);
  }

  updateSolicitud(id: number, solicitud: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.baseUrl}/${id}`, solicitud);
  }

  deleteSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Opcional: Métodos para anexos e items si decides tener endpoints separados
  // getAnexosDeSolicitud(id: number): Observable<AnexoSolicitud[]> { ... }
  // getItemsDeSolicitud(id: number): Observable<ItemSolicitud[]> { ... }
}
