import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AnexosService } from '../../../../services/anexos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-anexo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './anexo-form.component.html',
  styleUrls: ['./anexo-form.component.css'],
  providers: [AnexosService, MatSnackBar]
})
export class AnexoFormComponent implements OnInit {
  form: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;

  solicitudId: number = 0;
  anexoId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private anexosService: AnexosService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      tipoDocumento: ['', Validators.required],
      nombreArchivo: ['', Validators.required],
      urlArchivo: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const solicitudParam = params.get('solicitudId');
      const anexoParam = params.get('anexoId');

      if (solicitudParam) {
        this.solicitudId = +solicitudParam;
      }

      if (anexoParam) {
        this.anexoId = +anexoParam;
        this.cargarAnexo(this.anexoId);
      }
    });
  }

  cargarAnexo(id: number): void {
    this.anexosService.getById(id).subscribe(anexo => {
      this.form.patchValue({
        tipoDocumento: anexo.tipoDocumento,
        nombreArchivo: anexo.nombreArchivo,
        urlArchivo: anexo.urlArchivo || ''
      });
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      this.fileError = 'Debe seleccionar un archivo PDF';
      this.selectedFile = null;
      this.form.patchValue({ nombreArchivo: '' });
      return;
    }

    const file = input.files[0];
    if (file.type !== 'application/pdf') {
      this.fileError = 'Sólo se permite archivo PDF';
      this.selectedFile = null;
      this.form.patchValue({ nombreArchivo: '' });
      return;
    }

    this.fileError = null;
    this.selectedFile = file;

    this.form.patchValue({
      nombreArchivo: file.name,
      urlArchivo: ''
    });
  }

  guardar(): void {
    if (!this.form.valid) {
      this.snackBar.open('Complete todos los campos obligatorios', 'Cerrar', { duration: 2000 });
      return;
    }

    if (!this.selectedFile && !this.anexoId) {
      this.fileError = 'Debe seleccionar un archivo PDF';
      return;
    }

    if (this.anexoId) {
      // Actualización con o sin archivo
      this.anexosService.update(this.anexoId, {
        file: this.selectedFile,
        tipoDocumento: this.form.value.tipoDocumento,
        solicitudId: this.solicitudId,
        nombreArchivo: this.form.value.nombreArchivo
      }).subscribe({
        next: () => {
          this.snackBar.open('Anexo actualizado', 'Cerrar', { duration: 2000 });
          this.router.navigate([`/admin/solicitudes/${this.solicitudId}/anexos`]);
        },
        error: () => {
          this.snackBar.open('Error al actualizar anexo', 'Cerrar', { duration: 2000 });
        }
      });
    } else {
      // Creación de nuevo anexo
      const formData = new FormData();
      formData.append('file', this.selectedFile!);
      formData.append('tipoDocumento', this.form.value.tipoDocumento);
      formData.append('solicitudId', this.solicitudId.toString());

      this.anexosService.create(formData).subscribe({
        next: () => {
          this.snackBar.open('Anexo creado', 'Cerrar', { duration: 2000 });
          this.router.navigate([`/admin/solicitudes/${this.solicitudId}/anexos`]);
        },
        error: () => {
          this.snackBar.open('Error al crear anexo', 'Cerrar', { duration: 2000 });
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate([`/admin/solicitudes/${this.solicitudId}/anexos`]);
  }
}
