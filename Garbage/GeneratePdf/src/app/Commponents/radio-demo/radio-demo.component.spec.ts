import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioDemoComponent } from './radio-demo.component';

describe('RadioDemoComponent', () => {
  let component: RadioDemoComponent;
  let fixture: ComponentFixture<RadioDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
