import { Component, OnInit } from '@angular/core';

import {jsPDF} from "jspdf"
import { RadioDemoComponent } from "./Commponents/radio-demo/radio-demo.component";

@Component({
  selector: 'app-root',
  imports: [RadioDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'GeneratePdf';
  IssuerId = "123456789";

  generatePdf(){
    const doc = new jsPDF();
    doc.text('Hello World!!', 10, 12);
    doc.text(`Issuer Id : ${this.IssuerId}`, 10, 20);
    doc.save('hello_world.pdf');
  }


}
