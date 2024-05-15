import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitAutoServiceComponent } from './visit-auto-service.component';

describe('VisitAutoServiceComponent', () => {
  let component: VisitAutoServiceComponent;
  let fixture: ComponentFixture<VisitAutoServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitAutoServiceComponent]
    });
    fixture = TestBed.createComponent(VisitAutoServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
