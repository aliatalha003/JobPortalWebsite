import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavjopsComponent } from './favjops.component';

describe('FavjopsComponent', () => {
  let component: FavjopsComponent;
  let fixture: ComponentFixture<FavjopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavjopsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavjopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
