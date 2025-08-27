# 🌍 FSE’s Reports Dashboard – Chile

**Language:** [🇬🇧 English](#en) | [🇪🇸 Español](#es) | [🇫🇷 Français](#fr)

## <a name="en"></a>🇬🇧 English
## 📌 Project Overview
This analytical project consolidates synthetic Field Service Engineer (FSE) intervention reports in Chile to identify patterns, improve efficiency, and support data-driven decisions.  
Extracting data from FSN solution suchs as Synchroteam, or excel spreadsheeds, cleaning and transforming via **Power Query**, modeled with **Power Pivot / DAX**, and visualized in **Excel Dashboards**.

---
## 📈 [Dashboard](/Dashboard_FSE/Excel/FSE_dashboard_reports_chile.xlsx)

![Dashboard](https://github.com/user-attachments/assets/c22ec29a-678a-49fa-9d80-9c9e1cedae51)

### 🎯 Slicers
1. **Analyzer**
2. **Spare Part**
3. **Status After Intervention**
4. **Model**
5. **Intervention Type**

---

### 📊 Visuals

1. **FSEs**
- Average Resolution Time (hrs)
- Number of Interventions

2. **Spare Parts**
- Downtime (Avg-hr)
- Replacement Count

3. **Downtime Analyzers**
- Total Downtime (hrs)

---

## ❓ Analysis

<img width="1897" height="753" alt="Dashboard_img" src="https://github.com/user-attachments/assets/e17376f0-29a3-4dc5-8ff8-b6e43fc07e17" />

### 1. Spare Part Causing Most Downtime Relative to Replacement Frequency
**Pivot Table:**  
1. Rows: 
* `Spare Part`  
2. Values: 
* `Count of Replacements`
* `Downtime per Intervention (hrs)`  

**Key Insight:**  
1. Highest replacement frequency: 
* **Heating Element** — 7 replacements and avg downtime **2.9 hrs**  
2. Longest downtime: 
* **Light Source** — 1 replacement and as downtime **4.6 hrs**

---

## 📂 Data Source & ETL (Power Query)

### Data Import
   - **Source Folder:** [FSE's_Reports](/FSE's_Reports/)
   - **File Used:** `fse_reports.xlsx`
   - Designed to **auto-update** when new reports are added to the source folder.

### Transformations
1. **Split `analyzer_id` & `analyzer_model`**  
   Extracted from **Column D** to create separate fields for better filtering and analysis.
     
   <img width="1055" height="595" alt="Split Model" src="https://github.com/user-attachments/assets/a3915667-2a08-4542-bde7-42c98abf4d1f" />


3. **Split `start_time` & `end_time`**  
Extracted from **Column F** (format: `YYYY-MM-DD HH:MM - HH:MM`).

   <img width="450" height="500" alt="Intervention Start" src="https://github.com/user-attachments/assets/01fe010b-1606-4e40-8adb-bb452b1f4094" /> <img width="450" height="500" alt="Intervention End" src="https://github.com/user-attachments/assets/2654cf5d-5517-4247-af2d-4869329187a4" />

4. **Extract `fse_name`**  
   Taken from **Column O**.

6. **Rename Headers to Code-Friendly Format**  
   Improves DAX usability and avoids syntax issues.
    
   <img width="555" height="555" alt="Rename Columns" src="https://github.com/user-attachments/assets/bf9db4df-e463-40cf-9d80-260774f84af9" />

---

## 📊 Data Modeling (Power Pivot)

### Key DAX Measures
- **Downtime per Intervention (hrs)**  
  ```DAX
  =DIVIDE(
      SUM(FSE_s_Reports[resolution_time_min]) / 60,
      DISTINCTCOUNT(FSE_s_Reports[report_id])
  )

---

## 📌 Conclusions
- Develop targeted training materials for high-downtime spare parts 
- Chapperone new engeneers for first installations  
- Strengthen communication channels between frequently involved FSEs  
- Organize visits to get on-site information of top analyzers  

---

## 🛠 Tools Used
- **Microsoft Excel** (Power Query, Power Pivot, Pivot Tables, DAX)  
- **Data Source:** `fse_reports.xlsx` + new appended files  
- **Visualization:** Excel Dashboard

---

## <a name="es"></a>🇪🇸 Español
## 📌 Resumen del Proyecto
Este proyecto analítico consolida informes sintéticos de intervenciones de Ingenieros de Servicio en Terreno (FSE) en Chile para identificar patrones, mejorar la eficiencia y apoyar decisiones basadas en datos.  
Se extraen datos de soluciones FSN como Synchroteam o planillas Excel, se limpian y transforman con **Power Query**, se modelan con **Power Pivot / DAX**, y se visualizan en **Tableros de Excel**.

---

## 📈 [Tablero](/Dashboard_FSE/Excel/FSE_dashboard_reports_chile.xlsx)

![Dashboard_es](https://github.com/user-attachments/assets/c22ec29a-678a-49fa-9d80-9c9e1cedae51)

### 🎯 Segmentadores
1. **Analizador**
2. **Repuesto**
3. **Estado después de la intervención**
4. **Modelo**
5. **Tipo de intervención**

---

### 📊 Visuales

1. **FSEs**
- Tiempo promedio de resolución (hrs)
- Número de intervenciones

2. **Repuestos**
- Tiempo de inactividad (Media hrs)
- Conteo de reemplazos

3. **Analizadores con inactividad**
- Tiempo total de inactividad (hrs)

---

## ❓ Análisis

<img width="1897" height="753" alt="Dashboard_imges" src="https://github.com/user-attachments/assets/e17376f0-29a3-4dc5-8ff8-b6e43fc07e17" />

### 1. Repuesto que causa mayor inactividad en relación a la frecuencia de reemplazo
**Tabla dinámica:**  
1. Filas: 
* `Repuesto`  
2. Valores: 
* `Conteo de reemplazos`
* `Tiempo de inactividad por intervención (hrs)`  

**Datos clave:**  
1. Mayor frecuencia de reemplazo:
* **Elemento calefactor** — 7 reemplazos con media de inactividad de **2,9 hrs**  
2. Mayor tiempo de inactividad:
* **Fuente de luz** — 1 reemplazo con inactividad de **4,6 hrs**  

---

## 📂 Fuente de Datos y ETL (Power Query)

### Importación de Datos
- **Carpeta de origen:** [FSE's_Reports](/FSE's_Reports/)
- **Archivo utilizado:** `fse_reports.xlsx`
- Diseñado para **actualizarse automáticamente** cuando se agreguen nuevos reportes a la carpeta de origen.

### Transformaciones
1. **Dividir `analyzer_id` y `analyzer_model`**  
   Extraído de la **Columna D** para crear campos separados que permitan un mejor filtrado y análisis.
   
   <img width="1055" height="595" alt="Split Model_es" src="https://github.com/user-attachments/assets/a3915667-2a08-4542-bde7-42c98abf4d1f" />

2. **Dividir `start_time` y `end_time`**  
   Extraído de la **Columna F** (formato: `AAAA-MM-DD HH:MM - HH:MM`).

      <img width="450" height="500" alt="Intervention Start_es" src="https://github.com/user-attachments/assets/01fe010b-1606-4e40-8adb-bb452b1f4094" /> <img width="450" height="500" alt="Intervention End" src="https://github.com/user-attachments/assets/2654cf5d-5517-4247-af2d-4869329187a4" />  

3. **Extraer `fse_name`**  
   Tomado de la **Columna O**.  

4. **Renombrar encabezados a formato compatible con código**  
   Mejora la usabilidad en DAX y evita problemas de sintaxis.
   
   <img width="555" height="555" alt="Rename Columns_es" src="https://github.com/user-attachments/assets/bf9db4df-e463-40cf-9d80-260774f84af9" />

---

## 📊 Modelado de Datos (Power Pivot)

### Medidas DAX Clave
- **Tiempo de inactividad por intervención (hrs)**  
  ```DAX
  =DIVIDE(
      SUM(FSE_s_Reports[resolution_time_min]) / 60,
      DISTINCTCOUNT(FSE_s_Reports[report_id])
  )
  ```


---


## 📌 Conclusiones
- Desarrollar material de capacitación específico para repuestos con alta inactividad   
- Acompañar a nuevos ingenieros en sus primeras instalaciones  
- Fortalecer canales de comunicación con FSEs frecuentes
- Organizar visitas para obtener información in-situ de los analizadores observados   

---

## 🛠 Herramientas Utilizadas
- **Microsoft Excel** (Power Query, Power Pivot, Tablas dinámicas, DAX)  
- **Fuente de datos:** `fse_reports.xlsx` + nuevos archivos agregados  
- **Visualización:** Tablero de Excel  

---

## <a name="fr"></a>🇫🇷 Français
## 📌 Aperçu du Projet
Ce projet analytique consolide les rapports synthétiques d'intervention des Ingénieurs de Service sur le Terrain (FSE) au Chili pour identifier des tendances, améliorer l’efficacité et soutenir les décisions basées sur les données.  
Les données sont extraites de solutions FSN telles que Synchroteam ou des feuilles Excel, nettoyées et transformées via **Power Query**, modélisées avec **Power Pivot / DAX**, et visualisées dans des **tableaux de bord Excel**.

---

## 📈 [Tableau de Bord](/Dashboard_FSE/Excel/FSE_dashboard_reports_chile.xlsx)

![Dashboard_fr](https://github.com/user-attachments/assets/c22ec29a-678a-49fa-9d80-9c9e1cedae51)

### 🎯 Segments
1. **Analyseur**
2. **Pièce de rechange**
3. **Statut après intervention**
4. **Modèle**
5. **Type d'intervention**

---

### 📊 Visuels

1. **FSEs**
- Temps moyen de résolution (hrs)
- Nombre d'interventions

2. **Pièces de rechange**
- Temps d'arrêt (moyenne hrs)
- Nombre de remplacements

3. **Analyseurs en panne**
- Temps d'arrêt total (hrs)

---

## ❓ Analyse

<img width="1897" height="753" alt="Dashboard_imgfr" src="https://github.com/user-attachments/assets/e17376f0-29a3-4dc5-8ff8-b6e43fc07e17" />

### 1. Pièce de rechange causant le plus de temps d'arrêt par rapport à la fréquence de remplacement
**Tableau croisé dynamique :**  
1. Lignes:  
* `Pièce de rechange`  
2. Valeurs:  
* `Nombre de remplacements`
* `Temps d'arrêt par intervention (hrs)`  

**Points clés :**  
1. Fréquence de remplacement la plus élevée : 
* **Élément chauffant** — 7 remplacements et temps d'arrêt moyen **2,9 hrs**  
2. Temps d'arrêt le plus élevé : 
* **Source lumineuse** — 1 remplacement et temps d'arrêt **4,6 hrs**

---

## 📂 Source de Données et ETL (Power Query)

### Importation des Données
- **Dossier source :** [FSE's_Reports](/FSE's_Reports/)
- **Fichier utilisé :** `fse_reports.xlsx`
- Conçu pour **se mettre à jour automatiquement** lorsque de nouveaux rapports sont ajoutés au dossier source.

### Transformations
1. **Séparer `analyzer_id` et `analyzer_model`**  
   Extrait de la **Colonne D** pour créer des champs séparés permettant un meilleur filtrage et une meilleure analyse.
   
   <img width="1055" height="595" alt="Split Model_fr" src="https://github.com/user-attachments/assets/a3915667-2a08-4542-bde7-42c98abf4d1f" />

2. **Séparer `start_time` et `end_time`**  
   Extrait de la **Colonne F** (format : `AAAA-MM-JJ HH:MM - HH:MM`).
   
      <img width="450" height="500" alt="Intervention Start_fr" src="https://github.com/user-attachments/assets/01fe010b-1606-4e40-8adb-bb452b1f4094" /> <img width="450" height="500" alt="Intervention End" src="https://github.com/user-attachments/assets/2654cf5d-5517-4247-af2d-4869329187a4" />  

3. **Extraire `fse_name`**  
   Pris de la **Colonne O**.  

4. **Renommer les en-têtes en format compatible avec le code**  
   Améliore l’utilisation dans DAX et évite les problèmes de syntaxe.

    <img width="555" height="555" alt="Rename Columns_fr" src="https://github.com/user-attachments/assets/bf9db4df-e463-40cf-9d80-260774f84af9" />

---

## 📊 Modélisation des Données (Power Pivot)

### Mesures DAX Clés
- **Temps d'arrêt par intervention (hrs)**  
  ```DAX
  =DIVIDE(
      SUM(FSE_s_Reports[resolution_time_min]) / 60,
      DISTINCTCOUNT(FSE_s_Reports[report_id])
  )
  ```


---

## 📌 Conclusions
- Développer du matériel de formation ciblé pour les pièces ayant un fort temps d'arrêt  
- Accompagner les nouveaux ingénieurs lors de leurs premières installations  
- Renforcer les canaux de communication entre les FSEs intervenant fréquemment
- Organiser des visites pour recueillir des informations les analyseurs observés 

---

## 🛠 Outils Utilisés
- **Microsoft Excel** (Power Query, Power Pivot, Tableaux croisés dynamiques, DAX)  
- **Source de données :** `fse_reports.xlsx` + nouveaux fichiers ajoutés  
- **Visualisation :** Tableau de bord Excel 

---
