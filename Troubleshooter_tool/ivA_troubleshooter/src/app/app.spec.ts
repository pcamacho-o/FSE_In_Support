import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TroubleshooterComponent } from './components/troubleshooter/troubleshooter.component';


describe('TroubleshooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TroubleshooterComponent],
      providers: [provideHttpClient()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TroubleshooterComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TroubleshooterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')?.textContent).toContain('ivA Troubleshooter');
  });
});
