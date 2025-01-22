import { CommonModule } from '@angular/common';
import { Component , Input ,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-button',
  imports: [CommonModule],
  templateUrl: './my-button.component.html',
  styleUrl: './my-button.component.css'
})
export class MyButtonComponent {
  @Input() btnText = "";
  @Input() btnClass = "";

  @Output() onBtnClick = new EventEmitter<any>();

  onClick()
  {
    this.onBtnClick.emit("Hi from onClick");
  }
}
