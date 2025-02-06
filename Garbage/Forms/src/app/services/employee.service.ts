import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeData = new BehaviorSubject<any>(null);
  currentEmployeeData = this.employeeData.asObservable();

  constructor() { }

  updateEmployeeData(data: any) {
    this.employeeData.next(data);
  }
}
