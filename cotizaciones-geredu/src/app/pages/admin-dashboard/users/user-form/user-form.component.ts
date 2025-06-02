import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../../../models/usuario.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  @Input() user: Usuario | null = null;
  @Output() save = new EventEmitter<Usuario>();
  @Output() cancel = new EventEmitter<void>();

  model: Usuario = {
    id: 0,
    nombre: '',
    email: '',
    password: '',
    rol: 'TRABAJADOR', // o el valor default que uses
  };

  ngOnChanges(): void {
    if (this.user) {
      this.model = { ...this.user, password: '' }; // no mostrar password en edición
    } else {
      this.model = { id: 0, nombre: '', email: '', password: '', rol: 'TRABAJADOR' };
    }
  }

  onSubmit() {
    this.save.emit(this.model);
  }

  onCancel() {
    this.cancel.emit();
  }
}
