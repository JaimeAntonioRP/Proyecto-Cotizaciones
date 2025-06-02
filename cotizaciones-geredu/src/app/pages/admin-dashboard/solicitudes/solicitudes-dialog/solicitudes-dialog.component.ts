import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitudes-dialog',
  templateUrl: './solicitudes-dialog.component.html',
  styleUrls: ['./solicitudes-dialog.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SolicitudesDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SolicitudesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      numeroSolicitud: [this.data?.numeroSolicitud || '', Validators.required],
      anio: [this.data?.anio || new Date().getFullYear(), [Validators.required, Validators.min(2000), Validators.max(2100)]],
      tipo: [this.data?.tipo || '', Validators.required],
      numeroPedido: [this.data?.numeroPedido || '', Validators.required],
      unidadEjecutora: [this.data?.unidadEjecutora || '', Validators.required],
      codigoUnidad: [this.data?.codigoUnidad || '', Validators.required],
      numeroConsolidado: [this.data?.numeroConsolidado || '', Validators.required],
      rubro: [this.data?.rubro || '', Validators.required],
      concepto: [this.data?.concepto || '', Validators.required],
      publicadoPor: [this.data?.publicadoPor || '', Validators.required],
      fechaInicio: [this.data?.fechaInicio ? new Date(this.data.fechaInicio) : null, Validators.required],
      fechaLimite: [this.data?.fechaLimite ? new Date(this.data.fechaLimite) : null, Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      const formValue = {
        ...this.form.value,
        fechaInicio: this.form.value.fechaInicio.toISOString(),
        fechaLimite: this.form.value.fechaLimite.toISOString(),
      };
      this.dialogRef.close(formValue);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
