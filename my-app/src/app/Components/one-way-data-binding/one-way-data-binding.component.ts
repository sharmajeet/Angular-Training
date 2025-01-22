import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-one-way-data-binding',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './one-way-data-binding.component.html',
  styleUrl: './one-way-data-binding.component.css',
})
export class OneWayDataBindingComponent {
  InputType: string = 'text';
  InputText: string = 'Enter Your Name Here...';
  stateName : string  = "Gujarat"
  myClassname: string = 'bg-gray-300';

  //signal
  myname = signal("Jeet Sharma");

  changeSignalValue()
  {
    this.myname.set("Jeet");
  }

  constructor() {}

  //events
  showAlert(msg: string) {
    alert(msg);
  }
}
