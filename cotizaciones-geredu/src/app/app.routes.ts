import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { TrabajadorDashboardComponent } from './pages/trabajador-dashboard/trabajador-dashboard.component';
import { AppComponent } from './app.component';
import { UsersComponent } from './pages/admin-dashboard/users/users.component';
import { SolicitudesComponent } from './pages/admin-dashboard/solicitudes/solicitudes.component';
import { CotizacionesComponent } from './pages/admin-dashboard/cotizaciones/cotizaciones.component';
import { SolicitudFormComponent } from './pages/admin-dashboard/solicitudes/solicitud-form/solicitud-form.component';
import { AnexosComponent } from './pages/admin-dashboard/solicitudes/anexos/anexos.component';
import { AnexoFormComponent } from './pages/admin-dashboard/solicitudes/anexo-form/anexo-form.component';
import { PublicSolicitudesComponent } from './pages/public/public-solicitudes/public-solicitudes.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      { path: 'usuarios', component: UsersComponent },
      { path: 'solicitudes', component: SolicitudesComponent },
      { path: 'cotizaciones', component: CotizacionesComponent },
      { path: 'solicitudes/nueva', component: SolicitudFormComponent },
      { path: 'solicitudes/editar/:id', component: SolicitudFormComponent },
      { path: 'solicitudes/:id/anexos', component: AnexosComponent },
       // NUEVAS RUTAS PARA ANEXOS
    { path: 'solicitudes/:solicitudId/anexos', component: AnexosComponent },
    { path: 'solicitudes/:solicitudId/anexos/nuevo', component: AnexoFormComponent },
    { path: 'solicitudes/:solicitudId/anexos/editar/:anexoId', component: AnexoFormComponent },


    ]
  },

  {
    path: 'trabajador',
    component: TrabajadorDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['TRABAJADOR'] }
  },

  //{ path: 'unauthorized', component: UnauthorizedComponent }, // si tienes esta vista
 // RUTA PÚBLICA
  { path: 'public-solicitudes', component: PublicSolicitudesComponent },
  // Ruta catch-all (opcional)
];