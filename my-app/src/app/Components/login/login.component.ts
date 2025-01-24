import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule , FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
hide :boolean = false;
UserObj : any =  {
  username :  "",
  password :  ""
}

router = inject(Router);
Login() {
  debugger;
  if(this.UserObj.username == "Admin" && this.UserObj.password == "12345")
  {
    alert("Login Success");
    localStorage.setItem(this.UserObj.username, this.UserObj.password);
    this.router.navigateByUrl('counter-app');
  }
  else
  {
    alert("Login Failed");
  }
}
}
