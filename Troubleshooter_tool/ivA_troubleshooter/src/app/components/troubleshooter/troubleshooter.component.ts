// ... existing imports
import { Component, OnInit } from '@angular/core';
import { FlowService, FlowData, Symptom, Step } from '../../services/flow.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatRippleModule
  ],
  templateUrl: './troubleshooter.component.html',
  styleUrls: ['./troubleshooter.component.scss']
})
export class TroubleshooterComponent implements OnInit {
  data: FlowData | null = null;
  loading = true;

  // Dashboard Data
  symptoms: Symptom[] = [];
  filteredSymptoms: Symptom[] = [];
  modulesList: { key: string; image: string }[] = [];

  // Filter State
  searchQuery = '';
  selectedModuleFilter: string | null = null;

  // Flow State
  selectedSymptom: Symptom | null = null;
  currentStep: Step | null = null;
  stepHistory: string[] = []; // Stores IDs of previous steps

  constructor(private flowService: FlowService) {}

  ngOnInit(): void {
    this.flowService.loadData().subscribe({
      next: d => {
        this.data = d;
        this.symptoms = d.symptoms;
        this.filteredSymptoms = [...this.symptoms];
        this.modulesList = this.flowService.getModuleList();
        
        this.restoreState();
        this.loading = false;
      },
      error: err => {
        console.error('Failed loading flow JSON', err);
        this.loading = false;
      }
    });
  }

  // --- Filtering ---
  applyFilters() {
    this.filteredSymptoms = this.symptoms.filter(sym => {
      // Module filter
      if (this.selectedModuleFilter && !sym.module_hint.includes(this.selectedModuleFilter)) {
        return false;
      }

      // Search query filter (matches label or error codes)
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const matchesLabel = sym.label.toLowerCase().includes(query);
        const matchesErrorCode = sym.error_codes.some(ec => ec.toLowerCase().includes(query));
        if (!matchesLabel && !matchesErrorCode) {
          return false;
        }
      }

      return true;
    });
  }

  toggleModuleFilter(moduleKey: string) {
    if (this.selectedModuleFilter === moduleKey) {
      this.selectedModuleFilter = null; // Toggle off
    } else {
      this.selectedModuleFilter = moduleKey; // Toggle on
    }
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  // --- Flow Navigation ---
  startFlow(symptom: Symptom, resumeStepId?: string, resumeHistory?: string[]) {
    this.selectedSymptom = symptom;
    
    if (resumeStepId) {
      this.currentStep = this.flowService.getStepById(resumeStepId) ?? symptom.steps[0] ?? null;
      this.stepHistory = resumeHistory ?? [];
    } else {
      this.currentStep = symptom.steps[0] ?? null;
      this.stepHistory = [];
    }
    this.saveState();
  }

  goNext(pass: boolean) {
    if (!this.currentStep) return;
    
    // Save current step to history before moving forward
    this.stepHistory.push(this.currentStep.id);

    const nextId = pass ? this.currentStep.on_pass_next : this.currentStep.on_fail_next;
    const nextStep = this.flowService.getStepById(nextId);
    this.currentStep = nextStep ?? null;
    
    this.saveState();
  }

  goBack() {
    if (this.stepHistory.length > 0) {
      // Pop the last step ID from history
      const prevId = this.stepHistory.pop();
      if (prevId) {
        this.currentStep = this.flowService.getStepById(prevId);
        this.saveState();
      }
    } else {
      // If no history, exit to dashboard
      this.exitFlow();
    }
  }

  exitFlow() {
    this.selectedSymptom = null;
    this.currentStep = null;
    this.stepHistory = [];
    this.saveState();
  }

  // --- State Management ---
  saveState() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(
        'iva_state',
        JSON.stringify({
          lastSymptomId: this.selectedSymptom?.id ?? null,
          currentStepId: this.currentStep?.id ?? null,
          stepHistory: this.stepHistory
        })
      );
    }
  }

  restoreState() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('iva_state');
      if (saved) {
        try {
          const st = JSON.parse(saved);
          if (st.lastSymptomId) {
            const sym = this.symptoms.find(s => s.id === st.lastSymptomId);
            if (sym) {
              this.startFlow(sym, st.currentStepId, st.stepHistory);
            }
          }
        } catch {
          // Keep dashboard view if state parsing fails
        }
      }
    }
  }
}
