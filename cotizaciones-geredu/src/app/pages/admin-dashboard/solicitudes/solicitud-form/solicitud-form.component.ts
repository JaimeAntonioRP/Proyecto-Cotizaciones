import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SolicitudesService } from '../../../../services/solicitudes.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.css']
})
export class SolicitudFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  solicitudId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private solicitudService: SolicitudesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      anio: [new Date().getFullYear(), [Validators.required, Validators.min(2000), Validators.max(2100)]],
      tipo: ['', Validators.required],
      numeroPedido: ['', Validators.required],
      concepto: ['', Validators.required],
      publicadoPor: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaLimite: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.solicitudId = +params['id'];
        this.solicitudService.getSolicitud(this.solicitudId).subscribe(data => {
          const patchData = {
            ...data,
            fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : null,
            fechaLimite: data.fechaLimite ? new Date(data.fechaLimite) : null
          };
          this.form.patchValue(patchData);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const value = {
        ...this.form.value,
        fechaInicio: this.form.value.fechaInicio.toISOString(),
        fechaLimite: this.form.value.fechaLimite.toISOString()
      };

      const request = this.isEditMode
        ? this.solicitudService.updateSolicitud(this.solicitudId!, value)
        : this.solicitudService.createSolicitud(value);

      request.subscribe({
        next: (response) => {
          if (!this.isEditMode) {
            // Actualiza el formulario con el número generado
            this.form.patchValue({ numeroSolicitud: response.numeroSolicitud });
          }

          this.snackBar.open(
            this.isEditMode ? 'Solicitud actualizada' : `Solicitud creada - N° ${response.numeroSolicitud}`,
            'Cerrar',
            { duration: 3000 }
          );

          // Redirigir después de mostrar número (puedes comentar si quieres mostrarlo antes de redirigir)
          this.router.navigate(['/admin/solicitudes']);
        },
        error: () => {
          this.snackBar.open('Error al guardar', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }


  cancelar(): void {
    this.router.navigate(['/admin/solicitudes']);
  }
}
