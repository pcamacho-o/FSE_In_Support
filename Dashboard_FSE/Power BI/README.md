# 🌍 FSE’s Reports Dashboard – Chile

**Language:** [🇬🇧 English](#en) | [🇪🇸 Español](#es) | [🇫🇷 Français](#fr)

## <a name="en"></a>🇬🇧 English
## 📌 Project Overview
This analytical project consolidates synthetic Field Service Engineer (FSE) intervention reports in Chile to identify patterns, improve efficiency, and support data-driven decisions.  
Extracting data from FSN solution suchs as Synchroteam, or excel spreadsheeds, transforming via *Power Query*, modelated with *DAX* and visualized in **Power BI**.

---
## 📈 [Dashboard](/Dashboard_FSE/Power%20BI/PowerBI_FSE.pbix)

![Dashboard_PBI](https://github.com/user-attachments/assets/3b0dc0aa-017b-40f5-a410-2cfad137f48d)

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
- Min
- Median
- Avg
- Max

---

## ❓ Analysis

<img width="1522" height="843" alt="Dasboard_PBI" src="https://github.com/user-attachments/assets/8e11bf6a-88c1-4659-9785-489c9b66f780" />

### 1. Top Root Cause leading to on-site interventions that couldn't be resolved, during actual and last two quarters, for Cobas 8000 Analyzers (?) 
 
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
---
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
- Further investigation
- Escalation
- Chapperone new engeneers on first installations
- Strengthen communication channels between involved FSEs  
- Organize visits to get on-site information of top analyzers

---

## 🛠 Tools Used
- **Power BI** (Power Query, DAX)  
- **Data Source:** `fse_reports_chile.xlsx`   
- **Visualization:** Power BI Dashboard

---
---

## <a name="es"></a>🇪🇸 Español
## 📌 Descripción del Proyecto
Este proyecto analítico consolida reportes sintéticos de intervenciones de Ingenieros de Servicio de Campo (FSE) en Chile para identificar patrones, mejorar la eficiencia y apoyar decisiones basadas en datos.  
Extrayendo datos desde soluciones FSN como Synchroteam o planillas Excel, transformados vía *Power Query*, modelados con *DAX* y visualizados en **Power BI**.

---
## 📈 [Panel de Control](/Dashboard_FSE/Power%20BI/PowerBI_FSE.pbix)

![Dashboard_PBI](https://github.com/user-attachments/assets/3b0dc0aa-017b-40f5-a410-2cfad137f48d)

### 🎯 Segmentadores (Slicers)
1. **Modelo de Analizador**
2. **Estado Después de la Intervención**
3. **FSEs**
4. **Trimestre**
5. **Tipo de Intervención**

---

### 📊 Visualizaciones

1. **Causa Raíz**
- Mediana del Tiempo de Inactividad (H)
- Conteo de intervenciones

2. **Repuestos**

3. **Tiempo de Inactividad (H)**
- Min
- Mediana
- Promedio
- Max

---

## ❓ Análisis

<img width="1522" height="843" alt="Dasboard_PBI" src="https://github.com/user-attachments/assets/8e11bf6a-88c1-4659-9785-489c9b66f780" />

### 1. Principales Causas Raíz que llevaron a intervenciones en terreno que no pudieron resolverse, durante el trimestre actual y los dos anteriores, para analizadores Cobas 8000 (?) 
 
**Información Clave**  
1. Mayor número de Causas Raíz:  
* *Falla de Rotación* — 7 intervenciones y **3.1 H** como mediana de inactividad   
2. Mayor Tiempo de Inactividad:  
* *Error de Lectura* — 1 intervención y  **4.5 H** como mediana de inactividad

**Inspección**
* Causalidades
* Repuestos reemplazados 
* Documentación 
* Historial de analizadores
* Material de soporte 

---

## 📂 Fuente de Datos & ETL (Power Query)

### Importación de Datos
   - **Carpeta Fuente:** [Conjunto de Datos](/SQL_FSE/dataset/)
   - **Archivo Usado:** `fse_reports_chile.xlsx`

### Transformaciones

#### Lenguaje M
```M
let
    Source = Csv.Document(File.Contents(/SQL_FSE/dataset/)), //Fuente de archivo GitHub  
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
---
## 📊 Modelado de Datos (DAX)

### Principales Medidas DAX

**Intervenciones de Seguimiento**

  ```DAX
  boolean_follow_up = IF(ISBLANK(fse_reports_chile[follow_up_date]), "NO", "SÍ")
````

**Análisis Adicionales**

* Tiempo de inactividad considerando la fecha de seguimiento, el estado después de la intervención y los repuestos reemplazados, entre otros valores vía SQL.
* Calibraciones, actualizaciones de Firmware & Software, Buenas prácticas a verificar.
---
## 📌 Conclusiones

* Desarrollar materiales de capacitación específicos
* Profundizar la investigación
* Escalamiento
* Acompañar a nuevos ingenieros en sus primeras instalaciones
* Fortalecer los canales de comunicación entre los FSEs involucrados
* Organizar visitas para obtener información en terreno de los principales analizadores
---
## 🛠 Herramientas Utilizadas

* Power BI (Power Query, DAX)
* Fuente de Datos: fse_reports_chile.xlsx
* Visualización: Panel de Control en Power BI

---
---

## <a name="fr"></a>🇫🇷 Français
## 📌 Vue d’ensemble du projet
Ce projet analytique consolide les rapports synthétiques d’interventions des Field Service Engineers (FSE) au Chili afin d’identifier des tendances, améliorer l’efficacité et soutenir la prise de décisions basées sur les données.  
Les données sont extraites de solutions FSN telles que Synchroteam ou de feuilles Excel, transformées via *Power Query*, modélisées avec *DAX* et visualisées dans **Power BI**.

---
## 📈 [Tableau de bord](/Dashboard_FSE/Power%20BI/PowerBI_FSE.pbix)

![Dashboard_PBI](https://github.com/user-attachments/assets/3b0dc0aa-017b-40f5-a410-2cfad137f48d)

### 🎯 Filtres
1. **Modèle d’analyseur**
2. **Statut après intervention**
3. **FSEs**
4. **Trimestre**
5. **Type d’intervention**

---

### 📊 Visualisations

1. **Cause racine**
- Temps d’arrêt médian (H)
- Nombre d’interventions

2. **Pièces de rechange**

3. **Temps d’arrêt (H)**
- Min
- Médian
- Moyenne
- Max

---

## ❓ Analyse

<img width="1522" height="843" alt="Dasboard_PBI" src="https://github.com/user-attachments/assets/8e11bf6a-88c1-4659-9785-489c9b66f780" />

### 1. Principales causes racines menant à des interventions sur site non résolues, pendant le trimestre actuel et les deux précédents, pour les analyseurs Cobas 8000 (?) 
 
**Information clé**  
1. Plus grand nombre de causes racines :  
* *Défaut de rotation* — 7 interventions et **3,1 H** comme temps d’arrêt médian   
2. Plus long temps d’arrêt :  
* *Erreur de lecture* — 1 intervention et **4,5 H** comme temps d’arrêt médian

**Inspection**
* Causalités
* Pièces de rechange remplacées 
* Documentation 
* Historique des analyseurs
* Matériel de support 

---

## 📂 Source de données & ETL (Power Query)

### Importation de données
   - **Dossier source :** [Dataset](/SQL_FSE/dataset/)
   - **Fichier utilisé :** `fse_reports_chile.xlsx`

### Transformations

#### Langage M
```M
let
    Source = Csv.Document(File.Contents(/SQL_FSE/dataset/)), //Source GitHub du fichier  
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
---
## 📊 Modélisation des données (DAX)

### Mesures DAX clés
**Suivi des interventions**
 ```DAX
boolean_follow_up = IF(ISBLANK(fse_reports_chile[follow_up_date]), "NON", "OUI")
```

**Analyses supplémentaires**

* Temps d’arrêt en tenant compte de la date de suivi, du statut après intervention et des pièces remplacées, entre autres valeurs via SQL.
* Calibrations, mises à jour Firmware & Software, bonnes pratiques à vérifier.

---

## 📌 Conclusions

* Développer du matériel de formation ciblé
*Approfondir les recherches
* Escalader les cas complexes
* Accompagner les nouveaux ingénieurs lors des premières installations
* Renforcer les canaux de communication entre les FSE impliqués
* Organiser des visites pour obtenir des informations sur site des principaux analyseurs

## 🛠 Outils utilisés
* **Power BI** (Power Query, DAX)
* **Source de données :** `fse_reports_chile.xlsx`
* **Visualisation :** Tableau de bord Power BI

--
