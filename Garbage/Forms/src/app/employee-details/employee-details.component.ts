import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header">
          <h3>Employee Details</h3>
        </div>
        <div class="card-body">
          <div *ngIf="employeeData">
            <div class="row mb-3">
              <div class="col-md-6">
                <p><strong>Full Name:</strong> {{employeeData.fullname}}</p>
                <p><strong>Age:</strong> {{employeeData.age}}</p>
                <p><strong>Gender:</strong> {{employeeData.gender}}</p>
                <p><strong>Graduation:</strong> {{employeeData.graduation}}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Email:</strong> {{employeeData.email}}</p>
                <p><strong>Phone:</strong> {{employeeData.number}}</p>
                <p><strong>Address:</strong> {{employeeData.address}}</p>
                <p><strong>Disabilities:</strong> {{employeeData.disabilities}}</p>
              </div>
            </div>

            <div *ngIf="employeeData.attribute?.length">
              <h4>Hobbies & Passions</h4>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Hobby</th>
                      <th>Passion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let attr of employeeData.attribute">
                      <td>{{attr.Hobby}}</td>
                      <td>{{attr.Passion}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div *ngIf="!employeeData" class="alert alert-info">
            No employee data available. Please submit the employee form first.
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .card-header {
      background-color: #f8f9fa;
    }
    strong {
      color: #495057;
    }
  `]
})
export class EmployeeDetailsComponent implements OnInit {
  employeeData: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.currentEmployeeData.subscribe(data => {
      this.employeeData = data;
    });
  }
}
