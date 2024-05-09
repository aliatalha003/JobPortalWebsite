import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailCompanySideComponent } from './job-detail-company-side.component';

describe('JobDetailCompanySideComponent', () => {
  let component: JobDetailCompanySideComponent;
  let fixture: ComponentFixture<JobDetailCompanySideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDetailCompanySideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobDetailCompanySideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
