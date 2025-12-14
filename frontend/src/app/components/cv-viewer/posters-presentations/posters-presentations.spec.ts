import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostersPresentations } from './posters-presentations';

describe('PostersPresentations', () => {
  let component: PostersPresentations;
  let fixture: ComponentFixture<PostersPresentations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostersPresentations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostersPresentations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
