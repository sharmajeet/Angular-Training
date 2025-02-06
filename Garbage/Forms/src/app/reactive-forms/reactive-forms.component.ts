import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css'
})
export class ReactiveFormsComponent {

  UserForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.UserForm = this.fb.group({
      Email: [''],
      Password: [''],
      gender: ['Male'],
      address: [''],
      agree: ['true'],
      attribute :this.fb.array([this.CreateRow()])

    });

  }
  CreateRow(){
    return this.fb.group({
      Hobby : [''],
      Passion : ['']
    })
  }

  AddNewSection(){
    const row = this.CreateRow();
    this.Rows.push(row);
  }

  get Rows(){
    return this.UserForm.get('attribute') as FormArray;

  }
  get f(){
    return this.UserForm.controls;
  }
  onSubmit() {
    if (this.UserForm.valid) {
      console.log(this.UserForm.value);
    }
  }




  SaveUser(){
    debugger;
    console.log(this.UserForm.value);
  }


}

  // UserForm :FormGroup = new FormGroup({
  //   Email: new FormControl(''),
  //   Password:new FormControl(''),
  //   gender:new FormControl(''),
  //   address:new FormControl(''),
  //   agree:new FormControl('true'),

  // });
