import { Component, OnInit } from '@angular/core';
import { FlowService, FlowData, Symptom, Step } from '../../services/flow.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule
  ], 
  templateUrl: './troubleshooter.component.html',
  styleUrls: ['./troubleshooter.component.scss']
})
export class TroubleshooterComponent implements OnInit {
  data: FlowData | null = null;
  symptomLabels: string[] = [];
  selectedLabel: string | null = null;
  selectedSymptom: Symptom | null = null;
  currentStep: Step | null = null;
  loading = true;

  constructor(private flowService: FlowService) {}

  ngOnInit(): void {
    this.flowService.loadData().subscribe({
      next: d => {
        this.data = d;
        this.symptomLabels = d.symptoms.map(s => s.label);
        // Restore persisted state if present
        let saved: string | null = null;
        if (typeof window !== 'undefined' && window.localStorage) {
          saved = localStorage.getItem('iva_state');
        }
        if (saved) {
          try {
            const st = JSON.parse(saved);
            if (st.lastSymptom && this.symptomLabels.includes(st.lastSymptom)) {
              this.selectSymptom(st.lastSymptom, st.currentStepId);
            } else {
              this.selectSymptom(this.symptomLabels[0]);
            }
          } catch {
            this.selectSymptom(this.symptomLabels[0]);
          }
        } else {
          this.selectSymptom(this.symptomLabels[0]);
        }
        this.loading = false;
      },
      error: err => {
        console.error('Failed loading flow JSON', err);
        this.loading = false;
      }
    });
  }

  selectSymptom(label: string, restoreStepId?: string) {
    if (!this.data) return;
    this.selectedLabel = label;
    this.selectedSymptom = this.data.symptoms.find(s => s.label === label) ?? null;
    if (restoreStepId) {
      this.currentStep = this.flowService.getStepById(restoreStepId) ?? this.selectedSymptom?.steps[0] ?? null;
    } else {
      this.currentStep = this.selectedSymptom?.steps[0] ?? null;
    }
    this.saveState();
  }

  goNext(pass: boolean) {
    if (!this.currentStep) return;
    const nextId = pass ? this.currentStep.on_pass_next : this.currentStep.on_fail_next;
    const nextStep = this.flowService.getStepById(nextId);
    if (nextStep) {
      this.currentStep = nextStep;
    } else {
      this.currentStep = null;
    }
    this.saveState();
  }

    saveState() {
      if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('iva_state', JSON.stringify({
        lastSymptom: this.selectedLabel,
        currentStepId: this.currentStep?.id ?? null
      }));
    }
  }
}