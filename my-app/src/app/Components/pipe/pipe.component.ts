import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, PercentPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { NaPipe } from '../../Custome-Pipes/na.pipe';

@Component({
  selector: 'app-pipe',
  imports: [NaPipe,CommonModule ,AsyncPipe, JsonPipe,PercentPipe, UpperCasePipe ,CurrencyPipe, DatePipe, LowerCasePipe , TitleCasePipe],
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.css'
})
export class PipeComponent {
  Value : string = "Angular";
  lorem : string = "lorem ipsum dolor sit amet";
  CurrentDate : Date = new Date();
  Currency : number = 1000;
  Percentage : string = '1';
  JsonObj : any = {
    name : "Jeet Sharma",
    age : 21,
    city : "Vadodara",
    country : ""
  };
  //For Async Pipe - It's an Important Pipe
  CurrentTime : Observable<Date> = new Observable<Date>;
  constructor(){
    this.CurrentTime = interval(1000).pipe(map(() => new Date()));
  }
}

