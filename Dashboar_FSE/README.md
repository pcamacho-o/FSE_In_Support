# 🌍 FSE’s Reports Dashboard – Chile

**Language:** [🇬🇧 English](#en) | [🇪🇸 Español](#es) | [🇫🇷 Français](#fr)

---

## <a name="en"></a>🇬🇧 English
## 📌 Project Overview
This analytical project consolidates Field Service Engineer (FSE) synthetic intervention reports in Chile to identify patterns, improve efficiency, and support data-driven decisions.  
By extracting data from FSN solution suchs as Synchroteam, or excel spreadsheeds, cleaning and transforming via **Power Query**, modeled with **Power Pivot / DAX**, and visualized in **Excel Dashboards**.

---

## 📂 Data Source & ETL (Power Query)

### Data Import
- **Source Folder:** `FSE’s_Reports`
- **File Used:** `fse_reports.xlsx`
- Designed to **auto-update** when new reports are added to the source folder.

### Transformations
1. **Split `analyzer_id` & `analyzer_model`**  
   - Extracted from **Column D** to create separate fields for better filtering and analysis.  
   ![Split column D]<img width="1716" height="1010" alt="Split Model" src="https://github.com/user-attachments/assets/a3915667-2a08-4542-bde7-42c98abf4d1f" />


2. **Split `start_time` & `end_time`**  
   - Extracted from **Column F** (format: `YYYY-MM-DD HH:MM - HH:MM`).  
   ![Start](<Intervention Start.png>)
   ![End](<Intervention End.png>)

3. **Extract `fse_name`**  
   - Taken from **Column O**.  
   

4. **Include Relevant Columns:** E, G, H, I, J, K, L, M, N, Q.

5. **Rename Columns to Code-Friendly Format**  
   - Improves DAX usability and avoids syntax issues.  
   ![Rename columns](<Rename Columns.png>)

6. **Calculate Total Minutes**  
   - Convert resolution time into minutes for easier aggregation in DAX.  

7. **Other Applied Steps**  
   - Replaced values, data type changes.  
   ![Total Queries](<Total Queries.png>)

---

## 📊 Data Modeling (Power Pivot)
![Dashboard](Dashboard.gif)
### Key DAX Measures
- **Downtime per Intervention (hrs)**  
  ```DAX
  =DIVIDE(
      SUM(FSE_s_Reports[resolution_time_min]) / 60,
      DISTINCTCOUNT(FSE_s_Reports[report_id])
  )
## 📈 Dashboard Insights

### 🎯 Slicers
- **Analyzer**
- **Spare Part**
- **Status After Intervention**
- **Model**
- **Intervention Type**

---

### 📊 Visuals

#### FSE’s
- Average Resolution Time (hrs)
- Number of Interventions

#### Spare Parts
- Downtime (Avg-hr)
- Replacement Count

#### Downtime Analyzers
- Total Downtime (hrs)

---

## ❓ Analysis Questions & Answers
![Dashboard](Dashboard.png)
### 1. Spare Part Causing Most Downtime Relative to Replacement Frequency
**Pivot Table:**  
- Rows = `Spare Part`  
- Values = `Count of Replacements`, `Downtime per Intervention (hrs)`  

**Key Insight:**  
- Highest replacement frequency: **Heating Element** — 7 replacements, avg downtime **2.9 hrs**  
- Highest downtime: **Light Source** — 1 replacement, downtime **4.6 hrs**  
- **Note:** If issue not resolved → machine remains offline until next visit


---

### 2. Avg Resolution Time for Specific Spare Part Replacement
**Pivot Table:**  
- Rows = `Spare Part`  
- Values = `Average Resolution Time`  

**Key Insight:** _[to be added]_

---

### 3. FSE’s Recommended for First Installations
**Pivot Table:**  
- Rows = `FSE Name`  
- Values = `Intervention Count`, `Avg Resolution Time`  

**Key Insight:** _[to be added]_

---

### 4. Analyzers with Longest Cumulative Downtime
**Pivot Table:**  
- Rows = `Analyzer`  
- Values = `Total Resolution Time (hrs)`  

**Key Insight:** _[to be added]_

---

### 5. Top Analyzers Presenting Specific Spare Part Replacement
**Pivot Table:**  
- Rows = `Analyzer`  
- Columns = `Spare Part`  
- Values = `Count of Interventions`  

**Key Insight:** _[to be added after slicer application]_


---

## 📌 Conclusions
- Develop targeted training materials for high-downtime spare parts  
- Assign experienced FSE’s for new client installations
- Chapperone new engeneers for first installations  
- Strengthen communication channels between frequently involved FSE’s  
- Use downtime insights to optimize spare part stock and field interventions
- Organize visits to get on-site information of top analyzers  

---

## 🛠 Tools Used
- **Microsoft Excel** (Power Query, Power Pivot, Pivot Tables, DAX)  
- **Data Source:** `fse_reports.xlsx` + new appended files  
- **Visualization:** Excel Dashboard


