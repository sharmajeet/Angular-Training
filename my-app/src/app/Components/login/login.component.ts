import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [CommonModule , FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
hide :boolean = false;
UserObj : any =  {
  username :  "",
  password :  ""
}
http = inject(HttpClient);
router = inject(Router);
toast = inject(ToastrService)

//code fot the signup
signUp(){
  this.router.navigateByUrl('signup');
}
Login() {
  this.http.post(`http://localhost:3000/login`, this.UserObj).subscribe(
    (res: any) => {
      if (res.success) {
        this.toast.success("Login Succesfull.")
        localStorage.setItem('loginUser', this.UserObj.username);
        // You might also want to store the user type and email
        localStorage.setItem('userType', res.user.type);
        localStorage.setItem('userEmail', res.user.email);
        this.router.navigateByUrl('counter-app');
      } else {
        alert(res.message || "Login Failed");
      }
    },
    (error) => {
      // Handle errors (like network errors or invalid credentials)
      this.toast.error(error.error?.message || "Login Failed");
    }
  );
}

// Login() {

//   debugger;
//   if(this.UserObj.username == "Admin" && this.UserObj.password == "12345")
//   {
//     alert("Login Success");
//     localStorage.setItem('loginUser', this.UserObj.username);
//     this.router.navigateByUrl('counter-app');
//   }
//   else
//   {
//     alert("Login Failed");
//   }
// }
}
