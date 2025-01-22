import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFlowDirectivesComponent } from './control-flow-directives.component';

describe('ControlFlowDirectivesComponent', () => {
  let component: ControlFlowDirectivesComponent;
  let fixture: ComponentFixture<ControlFlowDirectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlFlowDirectivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlFlowDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
