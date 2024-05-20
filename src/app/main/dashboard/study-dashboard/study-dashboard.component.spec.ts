import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyDashboardComponent } from './study-dashboard.component';

describe('StudyDashboardComponent', () => {
  let component: StudyDashboardComponent;
  let fixture: ComponentFixture<StudyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
