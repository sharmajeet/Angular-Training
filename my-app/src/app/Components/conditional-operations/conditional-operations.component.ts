import { Component } from '@angular/core';

@Component({
  selector: 'app-conditional-operations',
  imports: [],
  templateUrl: './conditional-operations.component.html',
  styleUrl: './conditional-operations.component.css'
})
export class ConditionalOperationsComponent {
  //we are working witg conditions here if-else and else if condtitions
  Display:any = null;

  toggle()
  {
    this.Display = !this.Display;
  }
}
