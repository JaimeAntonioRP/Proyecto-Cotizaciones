import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnexosService } from '../../../../services/anexos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-anexos',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.css']
})
export class AnexosComponent implements OnInit {
  solicitudId!: number;
  anexos: any[] = [];
  displayedColumns: string[] = ['tipoDocumento', 'nombreArchivo', 'acciones'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private anexosService: AnexosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.solicitudId = +this.route.snapshot.paramMap.get('id')!;
    this.loadAnexos();
  }

  loadAnexos(): void {
    this.anexosService.getBySolicitudId(this.solicitudId).subscribe(data => {
      this.anexos = data;
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este anexo?')) {
      this.anexosService.delete(id).subscribe(() => {
        this.snackBar.open('Anexo eliminado', 'Cerrar', { duration: 2000 });
        this.loadAnexos();
      });
    }
  }

  nuevoAnexo(): void {
    this.router.navigate([`admin/solicitudes/${this.solicitudId}/anexos/nuevo`]);
  }

  editar(anexo: any): void {
    this.router.navigate([`admin/solicitudes/${this.solicitudId}/anexos/editar`, anexo.id]);
  }
}
