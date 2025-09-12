import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { TroubleshooterComponent } from './troubleshooter.component';

describe('TroubleshooterComponent', () => {
  let component: TroubleshooterComponent;
  let fixture: ComponentFixture<TroubleshooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TroubleshooterComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TroubleshooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
