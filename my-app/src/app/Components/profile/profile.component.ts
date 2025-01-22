import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {

  name:string  = "Jeet Sharma";
  data : string|number = 10;
  other : any = {
    name : "Jeet Sharma",
    age : 20

  }

  onClickHandler() {
  //  return this.name;
return this.other;
  }

}
