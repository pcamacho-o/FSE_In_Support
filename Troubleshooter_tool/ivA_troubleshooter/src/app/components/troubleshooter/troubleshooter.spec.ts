import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Troubleshooter } from './troubleshooter';

describe('Troubleshooter', () => {
  let component: Troubleshooter;
  let fixture: ComponentFixture<Troubleshooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Troubleshooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Troubleshooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
