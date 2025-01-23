import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateComponents } from './template.component';

describe('TemplateComponent', () => {
  let component: TemplateComponents;
  let fixture: ComponentFixture<TemplateComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
