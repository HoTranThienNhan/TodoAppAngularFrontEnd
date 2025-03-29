import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { UserStore } from '../../store/user.store';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user/user.model';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // injection 
  router: Router = inject(Router);
  userStore = inject(UserStore);
  authService: AuthService = inject(AuthService);

  ngOnInit(): void {

  }

  // methods
  navigateToLoginPage(): void {
    this.router.navigate(['/signin']);
  }

  navigateToSignUpPage(): void {
    this.router.navigate(['signup']);
  }
}