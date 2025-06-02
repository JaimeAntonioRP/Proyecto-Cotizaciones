import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, JwtResponse } from '../models/login.model';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.apiUrl, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    // Extraer rol del token (asumiendo campo 'role')
    const decoded: any = jwtDecode(token);
    localStorage.setItem('role', decoded.role); 
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
