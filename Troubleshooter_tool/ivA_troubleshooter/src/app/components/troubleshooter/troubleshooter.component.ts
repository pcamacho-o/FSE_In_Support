import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FlowService, Symptom, Step } from '../../services/flow.service';
import { TitleCasePipe } from '@angular/common';
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
  imports: [
    TitleCasePipe,
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
  styleUrls: ['./troubleshooter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TroubleshooterComponent implements OnInit {
  private flowService = inject(FlowService);

  data = this.flowService.data;
  loading = signal(true);

  // Filter State
  searchQuery = signal('');
  selectedModuleFilter = signal<string | null>(null);

  // Flow State
  selectedSymptom = signal<Symptom | null>(null);
  currentStep = signal<Step | null>(null);
  stepHistory = signal<string[]>([]); // Stores IDs of previous steps

  // Computed Data
  symptoms = computed(() => this.data()?.symptoms ?? []);
  modulesList = computed(() => this.flowService.getModuleList());

  filteredSymptoms = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const moduleFilter = this.selectedModuleFilter();
    const allSymptoms = this.symptoms();

    return allSymptoms.filter(sym => {
      // Module filter
      if (moduleFilter && !sym.module_hint.includes(moduleFilter)) {
        return false;
      }

      // Search query filter (matches label or error codes)
      if (query) {
        const matchesLabel = sym.label.toLowerCase().includes(query);
        const matchesErrorCode = sym.error_codes.some(ec => ec.toLowerCase().includes(query));
        if (!matchesLabel && !matchesErrorCode) {
          return false;
        }
      }

      return true;
    });
  });

  ngOnInit(): void {
    this.flowService.loadData().subscribe({
      next: () => {
        this.restoreState();
        this.loading.set(false);
      },
      error: err => {
        console.error('Failed loading flow JSON', err);
        this.loading.set(false);
      }
    });
  }

  // --- Filtering ---
  toggleModuleFilter(moduleKey: string) {
    this.selectedModuleFilter.update(current => current === moduleKey ? null : moduleKey);
  }

  onSearchChange() {
    // Computed property handles this automatically
  }

  // --- Flow Navigation ---
  startFlow(symptom: Symptom, resumeStepId?: string, resumeHistory?: string[]) {
    this.selectedSymptom.set(symptom);
    
    if (resumeStepId) {
      this.currentStep.set(this.flowService.getStepById(resumeStepId) ?? symptom.steps[0] ?? null);
      this.stepHistory.set(resumeHistory ?? []);
    } else {
      this.currentStep.set(symptom.steps[0] ?? null);
      this.stepHistory.set([]);
    }
    this.saveState();
  }

  goNext(pass: boolean) {
    const current = this.currentStep();
    if (!current) return;
    
    // Save current step to history before moving forward
    this.stepHistory.update(history => [...history, current.id]);

    const nextId = pass ? current.on_pass_next : current.on_fail_next;
    const nextStep = this.flowService.getStepById(nextId);
    this.currentStep.set(nextStep ?? null);
    
    this.saveState();
  }

  goBack() {
    const history = this.stepHistory();
    if (history.length > 0) {
      const newHistory = [...history];
      const prevId = newHistory.pop();
      this.stepHistory.set(newHistory);
      if (prevId) {
        this.currentStep.set(this.flowService.getStepById(prevId));
        this.saveState();
      }
    } else {
      this.exitFlow();
    }
  }

  exitFlow() {
    this.selectedSymptom.set(null);
    this.currentStep.set(null);
    this.stepHistory.set([]);
    this.saveState();
  }

  // --- State Management ---
  saveState() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(
        'iva_state',
        JSON.stringify({
          lastSymptomId: this.selectedSymptom()?.id ?? null,
          currentStepId: this.currentStep()?.id ?? null,
          stepHistory: this.stepHistory()
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
            const sym = this.symptoms().find(s => s.id === st.lastSymptomId);
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
