
import streamlit as st
import json
# Load JSON
with open("analyzers_flow.json") as f:
    data = json.load(f)
# Symptom selector
symptom = st.selectbox("Select symptom", [s["label"] for s in data["symptoms"]])
symptom_data = next(s for s in data["symptoms"] if s["label"] == symptom)
# Track current step in session
if "current_step" not in st.session_state:
    st.session_state.current_step = symptom_data["steps"][0]["id"]
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
st.subheader(f"Step {step['id']}")
st.write(f"**Module**: {step['module']}")
st.write(f"**Instruction**: {step['instruction']}")
st.write(f"**Detail**: {step['detail']}")
st.write(f"**Evidence**: {step['evidence']}")
# Navigation buttons
col1, col2 = st.columns(2)
if col1.button("✅ Pass"):
    st.session_state.current_step = step["on_pass_next"]
    st.rerun()
if col2.button("❌ Fail"):
    st.session_state.current_step = step["on_fail_next"]
    st.rerun()
