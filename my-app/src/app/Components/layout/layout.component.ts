import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  router = inject(Router);
  logout() {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');

    alert('Logout Success');
    this.router.navigateByUrl('login');
  }
}
