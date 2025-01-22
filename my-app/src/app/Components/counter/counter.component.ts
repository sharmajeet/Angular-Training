import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  counter: number = 0;
  handleCounter(value: string) {
    if (value === 'add') {
      this.counter += 1;
    } else if (value === 'sub') {
      this.counter -= 1;
    } else {
      this.counter = 0;
    }
  }
}
