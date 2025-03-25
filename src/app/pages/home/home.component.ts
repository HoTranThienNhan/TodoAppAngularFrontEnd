import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/buttons/button/button.component';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // injection 
  private router: Router = inject(Router);

  // methods
  navigateToLoginPage(): void {
    this.router.navigate(['/signin']);
  }

  navigateToSignUpPage(): void {
    this.router.navigate(['signup']);
  }
}