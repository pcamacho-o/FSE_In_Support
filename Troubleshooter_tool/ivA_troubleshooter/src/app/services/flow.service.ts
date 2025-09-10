import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlowData, Symptom, Step } from '../models/flow.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FlowService {
  private data: FlowData | null = null;

  constructor(private http: HttpClient) {}

  // Call once on app start (or whenever) to load the JSON
  loadData(): Observable<FlowData> {
    return this.http.get<FlowData>('assets/analyzers_flow.json').pipe(
      tap(d => this.data = d)
    );
  }

  // helpers (assume loadData() was called and resolved)
  getSymptoms(): Symptom[] { return this.data?.symptoms ?? []; }

  getSymptomByLabel(label: string): Symptom | undefined {
    return this.data?.symptoms.find(s => s.label === label);
  }

  getStepById(stepId?: string): Step | null {
    if (!stepId || !this.data) return null;
    // terminal nodes in your JSON
    if (stepId === 'escalate' || stepId === 'escalation') return this.data.escalation as Step;
    if (stepId === 'close') return this.data['close procedure'] as Step;

    for (const s of this.data.symptoms) {
      for (const step of s.steps) {
        if (step.id === stepId) return step;
      }
    }
    return null;
  }
}
