import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-template',
  imports: [CommonModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponents {
  isUserLoggedIn = false; // Change to false to test the "not logged in" message
  userName = 'Jeet Sharma';


 
  loginUser()
  {
    this.isUserLoggedIn = true;
    this.userName = 'Jeet Sharma'; // Change to actual user name after login

  }

  logoutUser(){
    this.isUserLoggedIn = false;
    
  }


}
