import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { FlowService } from './flow.service';

describe('Flow', () => {
  let service: FlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(FlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
