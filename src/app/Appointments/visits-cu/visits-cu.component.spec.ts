import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsCuComponent } from './visits-cu.component';

describe('VisitsCuComponent', () => {
  let component: VisitsCuComponent;
  let fixture: ComponentFixture<VisitsCuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitsCuComponent]
    });
    fixture = TestBed.createComponent(VisitsCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
