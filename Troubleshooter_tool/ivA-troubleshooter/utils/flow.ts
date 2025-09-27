import flow from "../assets/data/analyzers_flow.json";

export type Step = any;

export function getSymptoms() {
  return flow.symptoms.map((s: any) => ({ id: s.id, label: s.label }));
}

export function getSymptomById(id: string) {
  return flow.symptoms.find((s: any) => s.id === id);
}

export function getFirstStep(symptomId: string) {
  const s = getSymptomById(symptomId);
  return s?.steps?.[0] ?? null;
}

export function getStep(symptomId: string, stepId: string) {
  const s = getSymptomById(symptomId);
  return s?.steps?.find((st: any) => st.id === stepId) ?? null;
}

export function getNext(symptomId: string, nextId: string) {
  if (!nextId) return null;
  if (nextId === "close") return flow["close procedure"];
  if (nextId === "escalate") return flow.escalation;
  return getStep(symptomId, nextId);
}

// map modules to image requires
const moduleImages: Record<string, any> = {
  power_supply: require("../assets/images/power_supply.jpg"),
  arm_module: require("../assets/images/arm_module.png"),
  barcode_reader: require("../assets/images/barcode_reader.jpg"),
  optics_module: require("../assets/images/optics_module.png"),
  fluidics_module: require("../assets/images/fluidics_module.jpg"),
  reagent_module: require("../assets/images/reagent_module.png"),
  conveyor_module: require("../assets/images/conveyor_module.png"),
  cuvette_loader: require("../assets/images/cuvette_loader.png"),
};

export function getModuleImage(moduleKey: string) {
  return moduleImages[moduleKey] ?? null;
}

export default flow;
