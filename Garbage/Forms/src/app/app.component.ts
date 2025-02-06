import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateDrivenFormsComponent } from "./template-driven-forms/template-driven-forms.component";
import { ReactiveFormsComponent } from "./reactive-forms/reactive-forms.component";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { FormDataComponent } from './Reusable/form-data/form-data.component';
@Component({
  selector: 'app-root',
  imports: [EmployeeFormComponent,FormDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Forms';


}
