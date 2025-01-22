import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingWithDirectivesComponent } from './working-with-directives.component';

describe('WorkingWithDirectivesComponent', () => {
  let component: WorkingWithDirectivesComponent;
  let fixture: ComponentFixture<WorkingWithDirectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingWithDirectivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingWithDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
