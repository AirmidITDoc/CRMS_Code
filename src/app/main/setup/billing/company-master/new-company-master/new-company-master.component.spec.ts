import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyMasterComponent } from './new-company-master.component';

describe('NewCompanyMasterComponent', () => {
  let component: NewCompanyMasterComponent;
  let fixture: ComponentFixture<NewCompanyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompanyMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
