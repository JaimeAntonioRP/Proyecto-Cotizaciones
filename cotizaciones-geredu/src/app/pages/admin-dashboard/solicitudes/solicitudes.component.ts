// solicitudes.component.ts
import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { Solicitud } from '../../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
  ],
})
export class SolicitudesComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  displayedColumns: string[] = [
    'id',
    'numeroSolicitud',
    'tipo',
    'anio',
    'unidadEjecutora',
    'concepto',
    'acciones',
    
  ];

  constructor(
    private solicitudService: SolicitudesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  loadSolicitudes(): void {
    this.solicitudService.getSolicitudes().subscribe({
      next: (data) => {
        this.solicitudes = data;
      },
      error: (err) => {
        this.snackBar.open('Error cargando solicitudes', 'Cerrar', { duration: 3000 });
        console.error('Error al cargar solicitudes:', err);
      }
    });
  }

  crearSolicitud(): void {
    this.router.navigate(['/admin/solicitudes/nueva']);
  }

  editarSolicitud(solicitud: Solicitud): void {
    this.router.navigate(['/admin/solicitudes/editar', solicitud.id]);
  }

  deleteSolicitud(solicitud: Solicitud): void {
    if (confirm(`¿Eliminar solicitud ${solicitud.numeroSolicitud}?`)) {
      this.solicitudService.deleteSolicitud(solicitud.id!).subscribe({
        next: () => {
          this.snackBar.open('Solicitud eliminada', 'Cerrar', { duration: 2000 });
          this.loadSolicitudes();
        },
        error: () => this.snackBar.open('Error eliminando solicitud', 'Cerrar', { duration: 3000 }),
      });
    }
  }

  verAnexos(solicitud: Solicitud): void {
    this.router.navigate(['admin/solicitudes',solicitud.id, 'anexos']);
  }

  verItems(solicitud: Solicitud): void {
    console.log('Ver Items de', solicitud.id);
  }
}
