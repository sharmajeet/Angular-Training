import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  userObj : any  = {
    username : '',
    password : '',
    email : '',
    type :['admin','user'],
    confirmpassword :''
  }


http = inject(HttpClient);
  Register() {
    if(this.userObj.password === this.userObj.confirmpassword) {
      // register user here
      this.http.post('http://localhost:3000/register', this.userObj).subscribe((res) => {
       if(res == true)
       {
         alert('User registered successfully');

       }
      })
    } else {
      // display error message
      alert('Error registering');
    }
  }
}
