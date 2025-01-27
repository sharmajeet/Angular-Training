import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  termsAccepted: boolean = false;
  userObj: any = {
    username: '',
    type: '',
    email: '',
    password: '',
    confirmpassword: ''
  };
  router = inject(Router);
  http = inject(HttpClient);
  Register() {
    if (this.userObj.password !== this.userObj.confirmpassword) {
      alert('Passwords do not match!');
      return;
    }

    if(this.termsAccepted) {
      this.http.post('http://localhost:3000/register', this.userObj).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.success) {
            alert(response.message || 'Registration successful!');
            this.router.navigateByUrl('/');
          } else {
            alert(response.message || 'Registration failed. Please try again.');
          }
        },
        error: (error) => {
          if (error.error.message) {
            alert(error.error.message);
          } else if (error.error) {
            alert(error.error);
          } else {
            alert('Something went wrong. Please try again later.');
          }
        },
      });
    }
  }
}
