import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsSetupComponent } from './appointments-setup.component';

describe('AppointmentsSetupComponent', () => {
  let component: AppointmentsSetupComponent;
  let fixture: ComponentFixture<AppointmentsSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsSetupComponent]
    });
    fixture = TestBed.createComponent(AppointmentsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
