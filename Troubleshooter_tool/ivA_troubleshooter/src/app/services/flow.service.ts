import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ModuleInfo {
  image: string;
}
export interface Step {
  id: string;
  module?: string;
  instruction: string;
  detail: string;
  evidence: string;
  on_fail_next?: string;
  on_pass_next?: string;
}
export interface Symptom {
  id: string;
  label: string;
  module_hint: string[];
  error_codes: string[];
  steps: Step[];
}
export interface FlowData {
  modules: { [key: string]: ModuleInfo };
  symptoms: Symptom[];
  escalation: Step;
  'close procedure': Step;
}

@Injectable({ providedIn: 'root' })
export class FlowService {
  private data: FlowData | null = null;

  constructor(private http: HttpClient) {}

  loadData(): Observable<FlowData> {
    return this.http.get<FlowData>('assets/analyzers_flow.json').pipe(
      tap(d => this.data = d)
    );    
  }

  getSymptoms(): Symptom[] {
    return this.data?.symptoms ?? [];
  }

  getSymptomByLabel(label: string): Symptom | undefined {
    return this.data?.symptoms.find(s => s.label === label);
  }

  getStepById(stepId?: string): Step | null {
    if (!stepId || !this.data) return null;
    if (stepId === 'escalate' || stepId === 'escalation') return this.data.escalation;
    if (stepId === 'close') return this.data['close procedure'];
    for (const s of this.data.symptoms) {
      for (const step of s.steps) {
        if (step.id === stepId) return step;
      }
    }
    return null;
  }

  getModules() {
    return this.data?.modules ?? {};
  }
}