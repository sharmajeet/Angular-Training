import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  router = inject(Router);
  UserName : string = "";
  toast = inject(ToastrService);
  constructor() {
   let userInfo = localStorage.getItem('loginUser');
   if(userInfo != null)
   {
    debugger
    this.UserName = userInfo;
   }else{
    debugger
    console.log("There is an error while retriving username.")
   }
  }
  logout() {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');

    this.toast.success('Logout Success');
    this.router.navigateByUrl('login');
  }
}
