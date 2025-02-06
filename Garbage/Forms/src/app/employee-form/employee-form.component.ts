import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmailValidator, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDataComponent } from '../Reusable/form-data/form-data.component';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule,FormsModule,CommonModule,FormDataComponent],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  EmployeeForm  :FormGroup;



  constructor(private fb : FormBuilder, private employeeService: EmployeeService)
  {
    this.EmployeeForm = this.fb.group({
      fullname : [''],
      age :  [''],
      gender:  [''],
      graduation : [''],
      disablities : ['',Validators.nullValidator],
      address : [''],
      email :  [''],
      number:  [''],
      attribute: this.fb.array([this.CreateRow()])
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
    this.Row.push(row);
  }

  get Row() {
    return this.EmployeeForm.get('attribute') as FormArray;
  }



  get f(){
    return this.EmployeeForm.controls;
  }

  @Output() SendEmpData = new EventEmitter<any>();

  SendData(Emp : any){
    this.SendEmpData.emit(this.EmployeeForm.value);
  }

  SaveUser(){
    console.log(this.EmployeeForm.value);
    this.SendData(this.EmployeeForm.value);
    this.employeeService.updateEmployeeData(this.EmployeeForm.value);
  }


}
