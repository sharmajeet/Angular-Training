import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  imports: [ReactiveFormsModule , JsonPipe],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.css'
})
export class ReactiveComponent {

  StudentForm :  FormGroup  = new FormGroup(
    {
      email : new FormControl('', [Validators.required]),
      password : new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmPassword : new FormControl(''),
      isAgree : new FormControl('')

    }
  );

  formValue : any;
  onSave() {
    debugger;
    this.formValue = this.StudentForm.value;
  }
  onReset()
  {
    this.StudentForm.reset();
  }
}
