import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { User, UserRegister, Role } from '../models';
import { ApiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loginError = new EventEmitter<string>();

  constructor(private http: HttpClient, private router: Router) { }

  public get userName(): string {
    return localStorage.getItem('userName');
  }

  public get userRole(): string {
    return localStorage.getItem('role');
  }

  public get isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  public get IsPetOwner(): boolean {
    return localStorage.getItem('role') === 'Власник домашньої тварини';
  }

  public get IsVeterinarian(): boolean {
    return localStorage.getItem('role') === 'Ветеринар';
  }

  public get IsController(): boolean {
    return localStorage.getItem('role') === 'Член контрольних органів';
  }

  login(login: string, password: string): void {
    this.http.post(`${ApiUrl}/User/Login`, { Email: login, Password: password })
      .subscribe((data: User) => {
        localStorage.setItem('userId', data.id.toString());
        localStorage.setItem('role', data.role);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('token', data.token);

        if (data.role === 'Власник домашньої тварини') {
          localStorage.setItem('ownerId', data.id);
        }

        if (this.IsPetOwner) {
          this.router.navigate(['/pets']).then(() => {
            window.location.reload();
          });
        } else if (this.IsController) {
          this.router.navigate(['./pet/control']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['./users']).then(() => {
            window.location.reload();
          });
        }
      },
        (error: HttpErrorResponse) => this.loginError.emit(error.message));
  }

  register(user: UserRegister): void {
    this.http.post(`${ApiUrl}/User/Register`, user)
      .subscribe((data: User) => {
        localStorage.setItem('userId', data.id.toString());
        localStorage.setItem('role', data.role);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('token', data.token);

        if (data.role === 'Власник домашньої тварини') {
          localStorage.setItem('ownerId', data.id);
        }

        if (this.IsPetOwner) {
          this.router.navigate(['/pets']).then(() => {
            window.location.reload();
          });
        } else if (this.IsController) {
          this.router.navigate(['./pet/control']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['./users']).then(() => {
            window.location.reload();
          });
        }
      },
        (error: HttpErrorResponse) => this.loginError.emit(error.message));
  }

  fetchRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${ApiUrl}/User/Roles`);
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
  }
}
