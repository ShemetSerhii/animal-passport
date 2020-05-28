import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/services';
import { UserRegister, Role } from 'src/app/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('')
  });
  eror: string;

  roles: Role[];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.fetchRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
      this.registerForm.controls.role.setValue(roles[0].id);
    });
  }

  onSubmit() {
    const user = new UserRegister();
    user.username = this.registerForm.value.name;
    user.email = this.registerForm.value.email;
    user.password = this.registerForm.value.password;
    user.role = this.registerForm.value.role;

    this.authService.register(user);
  }
}
