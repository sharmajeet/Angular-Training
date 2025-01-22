import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalOperationsComponent } from './conditional-operations.component';

describe('ConditionalOperationsComponent', () => {
  let component: ConditionalOperationsComponent;
  let fixture: ComponentFixture<ConditionalOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionalOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionalOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
