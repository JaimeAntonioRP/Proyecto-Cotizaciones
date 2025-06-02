import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService, Usuario } from '../../../services/users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'], 
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'actions'];
  users: Usuario[] = [];

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsuarios().subscribe({
      next: (data) => (this.users = data),
      error: () => this.snackBar.open('Error cargando usuarios', 'Cerrar', { duration: 3000 }),
    });
  }

  openUserDialog(user?: Usuario) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      height: '500px',
      data: user ? { ...user } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (user) {
          this.usersService.updateUsuario(user.id!, result).subscribe({
            next: () => {
              this.snackBar.open('Usuario actualizado', 'Cerrar', { duration: 2000 });
              this.loadUsers();
            },
            error: () => this.snackBar.open('Error actualizando usuario', 'Cerrar', { duration: 3000 }),
          });
        } else {
          this.usersService.createUsuario(result).subscribe({
            next: () => {
              this.snackBar.open('Usuario creado', 'Cerrar', { duration: 2000 });
              this.loadUsers();
            },
            error: () => this.snackBar.open('Error creando usuario', 'Cerrar', { duration: 3000 }),
          });
        }
      }
    });
  }

  deleteUser(user: Usuario) {
    if (confirm(`¿Seguro que quieres eliminar al usuario ${user.nombre}?`)) {
      this.usersService.deleteUsuario(user.id!).subscribe({
        next: () => {
          this.snackBar.open('Usuario eliminado', 'Cerrar', { duration: 2000 });
          this.loadUsers();
        },
        error: () => this.snackBar.open('Error eliminando usuario', 'Cerrar', { duration: 3000 }),
      });
    }
  }
}
