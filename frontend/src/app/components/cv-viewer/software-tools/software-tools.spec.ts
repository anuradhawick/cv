import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareTools } from './software-tools';

describe('SoftwareTools', () => {
  let component: SoftwareTools;
  let fixture: ComponentFixture<SoftwareTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareTools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareTools);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
