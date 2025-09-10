import streamlit as st
import json

# Load JSON
with open("flows/analyzers_flow.json") as f:
    data = json.load(f)

# Symptom selector
symptom = st.selectbox("Select symptom", [s["label"] for s in data["symptoms"]])
symptom_data = next(s for s in data["symptoms"] if s["label"] == symptom)

# Reset step when symptom changes
if "last_symptom" not in st.session_state or st.session_state.last_symptom != symptom:
    st.session_state.current_step = symptom_data["steps"][0]["id"]
    st.session_state.last_symptom = symptom

# Function to retrieve step
def get_step(step_id):
    if step_id == "escalate":
        return data["escalation"]
    if step_id == "close":
        return data["close procedure"]
    for s in data["symptoms"]:
        for step in s["steps"]:
            if step["id"] == step_id:
                return step
    return None

# Show current step
step = get_step(st.session_state.current_step)
st.subheader(f"Step {step.get('id', 'N/A')}")

# Show module + image if available
module_name = step.get("module")
if module_name and module_name in data["modules"]:
    st.image(data["modules"][module_name]["image"], caption=module_name.replace("_", " ").title())

st.write(f"**Instruction**: {step.get('instruction', 'N/A')}")
st.write(f"**Detail**: {step.get('detail', 'N/A')}")
st.write(f"**Evidence**: {step.get('evidence', 'N/A')}")

# Navigation buttons
col1, col2 = st.columns(2)
if col1.button("✅ Pass"):
    next_step = step.get("on_pass_next")
    if next_step:
        st.session_state.current_step = next_step
        st.rerun()
    else:
        st.success("✅ Flow completed.")

if col2.button("❌ Fail"):
    next_step = step.get("on_fail_next")
    if next_step:
        st.session_state.current_step = next_step
        st.rerun()
    else:
        st.error("❌ Flow ended.")
