import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-driven-forms',
  imports: [CommonModule, FormsModule,JsonPipe],
  templateUrl: './template-driven-forms.component.html',
  styleUrl: './template-driven-forms.component.css'
})
export class TemplateDrivenFormsComponent {

  FormDetails : any = {
    Email :  '',
    Password : '',
   gender :'',
   address : ''
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
    gender: '',
    address:''

  }
}
}
