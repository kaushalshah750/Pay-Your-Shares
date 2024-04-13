import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSlipComponent } from './create-slip.component';

describe('CreateSlipComponent', () => {
  let component: CreateSlipComponent;
  let fixture: ComponentFixture<CreateSlipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSlipComponent]
    });
    fixture = TestBed.createComponent(CreateSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
