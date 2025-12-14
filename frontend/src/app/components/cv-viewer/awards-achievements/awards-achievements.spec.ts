import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsAchievements } from './awards-achievements';

describe('AwardsAchievements', () => {
  let component: AwardsAchievements;
  let fixture: ComponentFixture<AwardsAchievements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwardsAchievements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardsAchievements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
