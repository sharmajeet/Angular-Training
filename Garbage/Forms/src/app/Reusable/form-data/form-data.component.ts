import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-form-data',
  imports: [],
  templateUrl: './form-data.component.html',
  styleUrl: './form-data.component.css'
})
export class FormDataComponent {
// message : any = '';
@Input() message  : any = '';
}
