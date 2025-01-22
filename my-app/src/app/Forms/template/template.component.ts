import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template',
  imports: [CommonModule,FormsModule , JsonPipe],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent {
FormDetails : any = {
  Email :  '',
  Password : '',
  ConfirmPassword : '',
  Firstname : '',
  Lastname : '',
  Phonenumber : '',
  Company : ''
}

RawData : any;
SubmitForm() {
  debugger;
this.RawData = this.FormDetails;
}

ResetForm(){
  this.FormDetails = {
    Email :  '',
    Password : '',
    ConfirmPassword : '',
    Firstname : '',
    Lastname : '',
    Phonenumber : '',
    Company : ''
  }
}
}
