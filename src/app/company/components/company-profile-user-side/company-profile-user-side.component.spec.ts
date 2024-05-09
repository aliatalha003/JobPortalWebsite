import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileUserSideComponent } from './company-profile-user-side.component';

describe('CompanyProfileUserSideComponent', () => {
  let component: CompanyProfileUserSideComponent;
  let fixture: ComponentFixture<CompanyProfileUserSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyProfileUserSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyProfileUserSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
