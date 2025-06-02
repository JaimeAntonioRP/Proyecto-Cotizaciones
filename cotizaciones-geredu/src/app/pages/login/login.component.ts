import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const credentials: LoginRequest = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        const role = this.authService.getUserRole();

        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'TRABAJADOR') {
          this.router.navigate(['/trabajador']);
        } else {
          this.router.navigate(['/']); // fallback o página pública
        }
      },

      error: (err) => {
        this.error = 'Correo o contraseña incorrectos';
        console.error(err);
      },
    });
  }
}
