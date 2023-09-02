import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngioplastiComponent } from './angioplasti.component';

describe('AngioplastiComponent', () => {
  let component: AngioplastiComponent;
  let fixture: ComponentFixture<AngioplastiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngioplastiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngioplastiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
