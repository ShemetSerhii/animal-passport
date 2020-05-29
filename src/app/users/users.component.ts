import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PetsService } from '../services';
import { UserInfo } from '../models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserInfo[];

  constructor(private petsService: PetsService, private router: Router) { }

  ngOnInit(): void {
    this.petsService.fetchPetOwners().subscribe((users: UserInfo[]) => this.users = users);
  }

  onUserClick(user: UserInfo): void {
    localStorage.setItem('ownerId', user.id);

    this.router.navigate(['./pets']).then(() => {
      window.location.reload();
    });
  }
}
