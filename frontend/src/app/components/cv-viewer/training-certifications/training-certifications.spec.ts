import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCertifications } from './training-certifications';

describe('TrainingCertifications', () => {
  let component: TrainingCertifications;
  let fixture: ComponentFixture<TrainingCertifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingCertifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingCertifications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
