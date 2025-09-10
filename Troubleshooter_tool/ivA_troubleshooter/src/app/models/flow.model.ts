export interface ModuleItem { image: string; }
export interface ModuleMap { [key: string]: ModuleItem; }

export interface Step {
        id: string;
    module?: string;
    instruction?: string;
    detail?: string;
    evidence?: string;
    on_fail_next?: string;
    on_pass_next?: string;
}

export interface Symptom {
    id: string;
    label: string;
    module_hint?: string[];
    error_codes?: string[];
    steps: Step[];
}

export interface FlowData {
    modules: ModuleMap;
    symptoms: Symptom[];
    escalation: Step; // maps to JSON "escalation"
     'close procedure': Step; // maps to JSON "close procedure"
}
