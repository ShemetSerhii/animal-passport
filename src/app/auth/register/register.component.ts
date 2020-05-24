import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { UserRegister } from 'src/app/models/user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  eror: string;

  constructor(public authService: AuthService) { }

  onSubmit() {
    const user = new UserRegister();
    user.username = this.registerForm.value.name;
    user.email = this.registerForm.value.email;
    user.password = this.registerForm.value.password;

    this.authService.register(user);
  }
}
