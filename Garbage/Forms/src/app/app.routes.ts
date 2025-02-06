import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

export const routes: Routes = [
  // ... existing routes ...
  { path: 'employee-form', component: EmployeeFormComponent },
  { path: 'employee-details', component: EmployeeDetailsComponent },
];
