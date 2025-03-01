import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // injection 
  private router: Router = inject(Router);

  // methods
  navigateToLoginPage(): void {
    this.router.navigate(['/login']);
  }
}