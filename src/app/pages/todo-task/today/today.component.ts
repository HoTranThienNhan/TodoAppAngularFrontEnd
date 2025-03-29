import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../../../store/user.store';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-today',
  imports: [],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss'
})
export class TodayComponent {
  // props

  // injection
  router: Router = inject(Router);
  userStore = inject(UserStore);
  user!: User;

  // hooks
  ngOnInit(): void {
    this.user = this.userStore.getUser();
    console.log(this.user);
  }

  // methods

}
