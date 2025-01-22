import { Routes } from '@angular/router';
import { CounterComponent } from './Components/counter/counter.component';
import { WorkingWithDirectivesComponent } from './Components/working-with-directives/working-with-directives.component';
import { OneWayDataBindingComponent } from './Components/one-way-data-binding/one-way-data-binding.component';
import { ControlFlowDirectivesComponent } from './Components/control-flow-directives/control-flow-directives.component';
import { PipeComponent } from './Components/pipe/pipe.component';
import { TemplateComponent } from './Forms/template/template.component';
import { ReactiveComponent } from './Forms/reactive/reactive.component';
import { ApiIntegrationComponent } from './Working_With_Api/api-integration/api-integration.component';
import { PostApiComponent } from './Working_With_Api/post-api/post-api.component';

export const routes: Routes = [
  {
    path : 'counter-app',
    component:CounterComponent
  },
  {
    path : 'directives',
    component:WorkingWithDirectivesComponent
  },
  {
    path : 'data-binding',
    component: OneWayDataBindingComponent
  },
  {
    path: 'controlflow',
    component:ControlFlowDirectivesComponent
  },
  {
    path : 'pipes',
    component:PipeComponent
  },
  {
    path : 'forms',
    component:TemplateComponent
  },
  {
    path : 'reactiveforms',
    component:ReactiveComponent
  },
  {
    path  : 'api',
    component:ApiIntegrationComponent
  },
  {
    path  : 'postapi',
    component:PostApiComponent
  }
];
