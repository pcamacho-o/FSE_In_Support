
# IVD Troubleshooter (Prototype)

Mobile-friendly Streamlit prototype for a module-based decision-tree troubleshooting assistant for IVD analyzers.

## What's included
- **Streamlit app**: `app.py`
- **Decision tree JSON**: `flows/analyzer_flow.json`
- **Placeholder diagrams** in `assets/` for each module
- **Synthetic logs** generator
- **Export** session history as JSON

## How to run
```bash
# 1) Create and activate a virtual environment (optional)
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# 2) Install dependencies
pip install streamlit

# 3) Run the app
streamlit run app.py
```

Then open the local URL shown by Streamlit in your **phone browser** (same Wi‑Fi) or deploy on Streamlit Community Cloud to access it on mobile.

## Notes
- This is a **web app** optimized for mobile browsers (responsive). It's not a native app yet.
- The troubleshooting flow is defined in `flows/analyzer_flow.json`. You can add symptoms, steps, and cross-module links there.
- Images are placeholders—replace with real diagrams/photos when available.
- For a native mobile app later, consider a **React Native** frontend backed by a **FastAPI** service that reuses this JSON.

## Roadmap
- Add more symptoms/modules and richer branching (multi-conditional rules).
- Persist user authentication and device inventory.
- Attach photo/video evidence capture per step.
- Offline bundle and sync when online.
- Export to PDF.
