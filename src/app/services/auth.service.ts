import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { UserRegister } from '../models/user-register';
import { ApiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  login(login: string, password: string): void {
    this.http.post(`${ApiUrl}/User/Login`, { UserName: login, Password: password })
      .subscribe((data: User) => {
        console.log(data);
        localStorage.setItem('userId', data.id.toString());
        localStorage.setItem('userName', data.username);
        localStorage.setItem('token', data.token);

        this.router.navigate(['/pets']).then(() => {
          window.location.reload();
        });
      });
  }

  register(user: UserRegister): void {
    this.http.post(`${ApiUrl}/User/Register`, user)
      .subscribe(() => this.router.navigate(['/pets']));
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
  }
}
