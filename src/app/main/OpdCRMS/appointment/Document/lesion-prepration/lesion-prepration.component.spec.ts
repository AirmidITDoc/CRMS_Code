import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesionPreprationComponent } from './lesion-prepration.component';

describe('LesionPreprationComponent', () => {
  let component: LesionPreprationComponent;
  let fixture: ComponentFixture<LesionPreprationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LesionPreprationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LesionPreprationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
