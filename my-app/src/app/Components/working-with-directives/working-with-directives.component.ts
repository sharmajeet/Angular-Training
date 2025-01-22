import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Only Router is needed here

@Component({
  selector: 'app-working-with-directives',
  imports: [CommonModule, FormsModule],
  templateUrl: './working-with-directives.component.html',
  styleUrl: './working-with-directives.component.css',
})
export class WorkingWithDirectivesComponent {
  isDiv1Visible = true;
  isDiv2Visible = true;

  num1: string = '';
  num2: string = '';

  selectedCountry: string = 'USA';
  ischecked: boolean = true;

  // array declaration for control flow statments
  countries: string[] = ['USA', 'UK', 'India', 'Australia'];

  //object for employyes
  Employees: any[] = [
{  id: 1,quality_score : 50, status : true , gender : 'male', name: "John Doe",position: "Software Engineer",department: "Engineering"},
{  id: 2,quality_score : 40, status : false , gender : 'female', name: "Jane Smith",position: "Project Manager",department: "Marketing"},
{  id: 3,quality_score : 90, status : true , gender : 'male', name: "Alice Johnson",position: "UX Designer",department: "Design"},
{  id: 4,quality_score : 10, status : false , gender : 'female', name: "Bob Brown",position: "Data Analyst",department: "Analytics"},
{  id: 5,quality_score : 80, status : true , gender : 'male', name: "Charlie Lee",position: "QA Engineer",department: "Quality Assurance"}

  ]


  // attribute directive - ngClass and ng Style
  ColorofDiv: string = "bg-blue-200";

  changeColorToRed() {
    this.ColorofDiv = "bg-red-200";
  }

  changeColorToGreen() {
    this.ColorofDiv = "bg-green-200";
  }

  isDivStatusActive: boolean = false
  valueOfDiv: string = 'inactive';
  toggleBtwConditions() {
    this.isDivStatusActive = !this.isDivStatusActive;
    this.valueOfDiv = this.isDivStatusActive ? 'success' : 'inactive';
  }

  hideBtn1() {
    this.isDiv1Visible = false;
  }

  showBtn1() {
    this.isDiv1Visible = true;
  }

  toggleBtn() {
    this.isDiv2Visible = !this.isDiv2Visible;
  }


  //Dependecies injection
  constructor(private route:  Router) {}
  navigate(){
    this.route.navigateByUrl("/counter-app");
  }
}
