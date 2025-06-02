import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { authInterceptorFn } from './auth.interceptor';
import { AuthService } from '../services/auth.service';
import { EnvironmentInjector, inject } from '@angular/core';

describe('authInterceptorFn', () => {
  let originalInject: typeof inject;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['getToken']);
    
    // Mockeamos la función inject() para que devuelva nuestro AuthService espía
    originalInject = inject;
    (inject as any) = () => mockAuthService;
  });

  afterEach(() => {
    // Restauramos inject para no romper otros tests
    (inject as any) = originalInject;
  });

  it('debería agregar el header Authorization si hay token', (done) => {
    const token = 'test-token';
    mockAuthService.getToken.and.returnValue(token);

    const req = new HttpRequest('GET', '/api/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.has('Authorization')).toBeTrue();
      expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`);
      return of({} as HttpEvent<any>);
    };

    authInterceptorFn(req, next).subscribe(() => done());
  });

  it('no debería agregar el header Authorization si no hay token', (done) => {
    mockAuthService.getToken.and.returnValue(null);

    const req = new HttpRequest('GET', '/api/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.has('Authorization')).toBeFalse();
      return of({} as HttpEvent<any>);
    };

    authInterceptorFn(req, next).subscribe(() => done());
  });
});
