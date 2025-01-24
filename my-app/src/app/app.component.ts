import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from './Components/navbar/navbar.component';
// import { ProfileComponent } from './Components/profile/profile.component';
// import { CounterComponent } from './Components/counter/counter.component';
// import { ConditionalOperationsComponent } from './Components/conditional-operations/conditional-operations.component';
// import { OneWayDataBindingComponent } from './Components/one-way-data-binding/one-way-data-binding.component';
// import { WorkingWithDirectivesComponent } from './Components/working-with-directives/working-with-directives.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [

    RouterOutlet,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Learning Angular';
  name = 'Jeet Shamra';

  Greet() {
    return 'Hello ' + this.name;
  }
}
