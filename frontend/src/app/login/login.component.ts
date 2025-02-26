import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { Auth } from '../models/auth';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,
    MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  hide = signal(true);
  private _snackBar = inject(MatSnackBar);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.preventDefault();
    event.stopPropagation();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
  }

  submitForm() {
    if (this.form.invalid || this.form.controls.email === null || this.form.controls.password === null) {
      this.form.markAllAsTouched(); // Marca todos los campos como "touched" para que los errores aparezcan
      this.updateErrorMessage();
      return;
    }
    
    // Aquí manejarías el login correctamente
    const user: User = {
      email: this.form.controls.email.value!,
      password: this.form.controls.password.value!
    }

    this.apiService.login(user).subscribe({
      next: (auth: Auth) => {
        sessionStorage.setItem('access_token', JSON.stringify(auth.token));
        this.router.navigate(['/home']);
      },
      error: response => {
        console.error('Error en el login', response);
        this.openSnackBar('Error, correo o contraseña incorrectos');
      }
    });
  }

  updateErrorMessage() {
    const email = this.form.controls.email;
    const password = this.form.controls.password;

    if (email.hasError('required')) {
      this.emailErrorMessage.set('Tienes que ingresar un correo');
    } else if (email.hasError('email')) {
      this.emailErrorMessage.set('No es un correo válido');
    } else {
      this.emailErrorMessage.set('');
    }
    
    if (password.hasError('required')) {
      this.passwordErrorMessage.set('Tienes que ingresar una contraseña');
    } else if (password.hasError('minlength')) {
      this.passwordErrorMessage.set('La contraseña debe tener al menos 6 caracteres');
    } else {
      this.passwordErrorMessage.set('');
    }
  }
}