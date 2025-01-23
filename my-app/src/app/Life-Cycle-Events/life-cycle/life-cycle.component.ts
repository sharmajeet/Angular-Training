import {
  Component,
  OnInit,
  DoCheck,
  AfterContentChecked,
  AfterViewChecked,
  AfterContentInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  imports: [],
  templateUrl: './life-cycle.component.html',
  styleUrl: './life-cycle.component.css',
})
export class LifeCycleComponent
  implements
    OnInit,
    DoCheck,
    AfterContentChecked,
    AfterViewChecked,
    AfterViewInit,
    AfterContentInit,
    OnDestroy
{
  ngOnInit(): void {
    console.log('ng oninit called');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called');
  }

  ngAfterContentChecked(): void {
    console.log('AfterContentChecked called');
  }

  ngAfterViewChecked(): void {
    console.log('AfterViewChecked called');
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit called');
  }

  ngAfterContentInit(): void {
    console.log('AfterContentInit called');
  }

  ngOnDestroy(): void {
    console.log('AfterViewDestroy called');
  }
}
