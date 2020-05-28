import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy  {
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });
  error: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loginError.subscribe((error: string) => this.error = error);
  }

  ngOnDestroy(): void {
    this.authService.loginError.unsubscribe();
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password);
  }
}
