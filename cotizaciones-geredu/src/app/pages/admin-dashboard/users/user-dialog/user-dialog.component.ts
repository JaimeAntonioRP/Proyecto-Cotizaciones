import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
export type Rol = 'ADMIN' | 'TRABAJADOR';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatDialogModule,
    ]
})
export class UserDialogComponent {
  form: FormGroup;
  roles: Rol[] = ['ADMIN', 'TRABAJADOR'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      rol: [data?.rol || '', Validators.required],
      password: ['', data ? [] : [Validators.required, Validators.minLength(6)]], // Requerido solo si es nuevo usuario
    });
  }

  save() {
    if (this.form.valid) {
      const formValue = { ...this.form.value };
      if (!formValue.password) {
        delete formValue.password; // Para no enviar password vacío al editar
      }
      this.dialogRef.close(formValue);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
