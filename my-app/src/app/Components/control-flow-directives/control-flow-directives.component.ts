import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-control-flow-directives',
  imports: [CommonModule],
  templateUrl: './control-flow-directives.component.html',
  styleUrl: './control-flow-directives.component.css'
})
export class ControlFlowDirectivesComponent {
  //object for employyes
  Employees: any[] = [
    {  id: 1,quality_score : 50, status : true , gender : 'male', name: "John Doe",position: "Software Engineer",department: "Engineering"},
    {  id: 2,quality_score : 40, status : false , gender : 'female', name: "Jane Smith",position: "Project Manager",department: "Marketing"},
    {  id: 3,quality_score : 90, status : true , gender : 'male', name: "Alice Johnson",position: "UX Designer",department: "Design"},
    // {  id: 4,quality_score : 10, status : false , gender : 'female', name: "Bob Brown",position: "Data Analyst",department: "Analytics"},
    {  id: 5,quality_score : 80, status : true , gender : 'male', name: "Charlie Lee",position: "QA Engineer",department: "Quality Assurance"}

      ]
 isDivSuccess : boolean = false;



toggleDiv(){
    this.isDivSuccess = !this.isDivSuccess

 }
}
