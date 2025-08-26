# 🌍 FSE’s Reports Dashboard – Chile

**Language:** [🇬🇧 English](#en) | [🇪🇸 Español](#es) | [🇫🇷 Français](#fr)

---

## <a name="en"></a>🇬🇧 English
## 📌 Project Overview
This analytical project consolidates synthetic Field Service Engineer (FSE) intervention reports in Chile to identify patterns, improve efficiency, and support data-driven decisions.  
Extracting data from FSN solution suchs as Synchroteam, or excel spreadsheeds, transforming via *Power Query*, modelated with *DAX* and visualized in **Power BI**.

---
## 📈 [Dashboard](/Dashboard_FSE/Power%20BI/PowerBI_FSE.pbix) Insights

![Dashboard](https://github.com/user-attachments/assets/c22ec29a-678a-49fa-9d80-9c9e1cedae51)

### 🎯 Slicers
1. **Analyzer Model**
2. **Status After Intervention**
3. **FSEs**
4. **Quarter**
5. **Intervention Type**

---

### 📊 Visuals

1. **Root Cause**
- Median Downtime (H)
- Count of interventions

2. **Spare Parts**

3. **Downtime (H)**
- MIN
- MEDIAN
- AVG
- MAX

---

## ❓ Analysis

<img width="1897" height="753" alt="Dashboard_img" src="https://github.com/user-attachments/assets/e17376f0-29a3-4dc5-8ff8-b6e43fc07e17" />

### 1. Root Cause leading to on-site interventions that couldn't be resolved, during actual and last two quarters, for Cobas 8000 Analyzers (?) 
 
**Key Insight**  
1. Highest count of Root Cause: 
* *Rotation Fault* — 7 interventions and **3.1 H** as Median downtime   
2. Largest Downtime: 
* *Read Error* — 1 intervention and  **4.5 H** as Median downtime

**Inspection**
* Causalities
* Spare Parts replaced 
* Documentation 
* Analyzers historial
* Support material 

---

## 📂 Data Source & ETL (Power Query)

### Data Import
   - **Source Folder:** [Dataset](/SQL_FSE/dataset/)
   - **File Used:** `fse_reports_chile.xlsx`

### Transformations

#### M Language
```M
let
    Source = Csv.Document(File.Contents(/SQL_FSE/dataset/)), //GitHub file source  
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{{"source_excel", type text}, {"report_id", type text}, {"analyzer_model", type text}, {"analyzer_id", type text}, {"intervention_type", type text}, {"symptoms_reported", type text}, {"root_cause", type text}, {"actions_taken", type text}, {"spare_part_use", type text}, {"spare_part_sn", type text}, {"status_after_intervention", type text}, {"follow_up_date", type text}, {"fse_name", type text}, {"notes", type text}, {"intervention_start", type datetime}, {"intervention_end", type datetime}, {"duration", type duration}, {"resolution_time_min", Int64.Type}}),
    #"Removed Columns" = Table.RemoveColumns(#"Changed Type",{"source_excel"}),
    #"Replaced Value" = Table.ReplaceValue(#"Removed Columns","Root cause of","",Replacer.ReplaceText,{"root_cause"}),
    #"Extracted Text Before Delimiter" = Table.TransformColumns(#"Replaced Value", {{"root_cause", each Text.BeforeDelimiter(_, " in "), type text}}),
    #"Trimmed Text" = Table.TransformColumns(#"Extracted Text Before Delimiter",{{"root_cause", Text.Trim, type text}}),
    #"Replaced Value1" = Table.ReplaceValue(#"Trimmed Text","No","NULL",Replacer.ReplaceText,{"follow_up_date"}),
    #"Changed Type1" = Table.TransformColumnTypes(#"Replaced Value1",{{"follow_up_date", type date}}),
    #"Replaced Value2" = Table.ReplaceValue(#"Changed Type1","None",null,Replacer.ReplaceValue,{"spare_part_use"}),
    #"Divided Column" = Table.TransformColumns(#"Replaced Value2", {{"resolution_time_min", each _ / 60, type number}}),
    #"Rounded Off" = Table.TransformColumns(#"Divided Column",{{"resolution_time_min", each Number.Round(_, 1), type number}}),
    #"Capitalized Each Word" = Table.TransformColumns(#"Rounded Off",{{"root_cause", Text.Proper, type text}, {"spare_part_use", Text.Proper, type text}})
in
    #"Capitalized Each Word"
````

## 📊 Data Modeling (DAX)

### Key DAX Measures
**Follow up interventions**
  ```DAX
  boolean_follow_up = IF(ISBLANK(fse_reports_chile[follow_up_date]), "NO", "YES")
```


**Further Analyses**
* Downtime considering follow-up date, status after intervention and spare part replaced, among others values via SQL.
* Calibrations, Firmware & Software updates, Good practices to check.  

---

## 📌 Conclusions
- Develop targeted training materials
- Chapperone new engeneers on first installations
- Strengthen communication channels between involved FSEs  
- Organize visits to get on-site information of top analyzers

---

## 🛠 Tools Used
- **Power BI** (Power Query, DAX)  
- **Data Source:** `fse_reports_chile.xlsx`   
- **Visualization:** Power BI Dashboard