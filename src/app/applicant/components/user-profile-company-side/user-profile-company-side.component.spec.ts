import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCompanySideComponent } from './user-profile-company-side.component';

describe('UserProfileCompanySideComponent', () => {
  let component: UserProfileCompanySideComponent;
  let fixture: ComponentFixture<UserProfileCompanySideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileCompanySideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileCompanySideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
