import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { Solicitud } from '../../../models/solicitud.model';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-public-solicitudes',
  standalone: true,
  templateUrl: './public-solicitudes.component.html',
  styleUrls: ['./public-solicitudes.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ]
})
export class PublicSolicitudesComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  solicitudesFiltradas: Solicitud[] = [];
  filtro = new FormControl('');
  displayedColumns: string[] = ['numeroSolicitud', 'anio', 'unidadEjecutora', 'concepto', 'acciones'];

  constructor(
    private solicitudesService: SolicitudesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.solicitudesService.getSolicitudes().subscribe(data => {
      this.solicitudes = data;
      this.solicitudesFiltradas = data;
    });

    this.filtro.valueChanges.subscribe(valor => {
      const query = valor?.toLowerCase() || '';
      this.solicitudesFiltradas = this.solicitudes.filter(s =>
        s.concepto?.toLowerCase().includes(query) || s.numeroSolicitud?.toLowerCase().includes(query)
      );
    });
  }

  verAnexos(solicitud: Solicitud): void {
    this.router.navigate(['/admin/solicitudes', solicitud.id, 'anexos']);
  }
}
