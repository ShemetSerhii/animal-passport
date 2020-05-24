import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });
  eror: string;

  constructor(public authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password);
  }
}
