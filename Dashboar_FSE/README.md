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
   Extracted from **Column D** to create separate fields for better filtering and analysis.  
   <img width="1055" height="595" alt="Split Model" src="https://github.com/user-attachments/assets/a3915667-2a08-4542-bde7-42c98abf4d1f" />


2. **Split `start_time` & `end_time`**  
Extracted from **Column F** (format: `YYYY-MM-DD HH:MM - HH:MM`).

   <img width="450" height="500" alt="Intervention Start" src="https://github.com/user-attachments/assets/01fe010b-1606-4e40-8adb-bb452b1f4094" /> <img width="450" height="500" alt="Intervention End" src="https://github.com/user-attachments/assets/2654cf5d-5517-4247-af2d-4869329187a4" />

4. **Extract `fse_name`**  
   Taken from **Column O**.  
   

5. **Include Relevant Columns:** E, G, H, I, J, K, L, M, N, Q.

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
## 📈 Dashboard Insights
![Dashboard](https://github.com/user-attachments/assets/c22ec29a-678a-49fa-9d80-9c9e1cedae51)
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
<img width="1897" height="753" alt="Dashboard" src="https://github.com/user-attachments/assets/e17376f0-29a3-4dc5-8ff8-b6e43fc07e17" />
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

---

## <a name="es"></a>🇪🇸 Español
## 📌 Resumen del Proyecto
Este proyecto analítico consolida informes sintéticos de intervenciones de Ingenieros de Servicio en Terreno (FSE) en Chile para identificar patrones, mejorar la eficiencia y apoyar decisiones basadas en datos.  
Se extraen datos de soluciones FSN como Synchroteam o planillas Excel, se limpian y transforman con **Power Query**, se modelan con **Power Pivot / DAX**, y se visualizan en **Tableros de Excel**.

---

## 📂 Fuente de Datos y ETL (Power Query)

### Importación de Datos
- **Carpeta de origen:** `FSE’s_Reports`
- **Archivo utilizado:** `fse_reports.xlsx`
- Diseñado para **actualizarse automáticamente** cuando se agreguen nuevos reportes a la carpeta de origen.

### Transformaciones
1. **Dividir `analyzer_id` y `analyzer_model`**  
   Extraído de la **Columna D** para crear campos separados que permitan un mejor filtrado y análisis.

2. **Dividir `start_time` y `end_time`**  
   Extraído de la **Columna F** (formato: `AAAA-MM-DD HH:MM - HH:MM`).  

3. **Extraer `fse_name`**  
   Tomado de la **Columna O**.  

4. **Incluir columnas relevantes:** E, G, H, I, J, K, L, M, N, Q.

5. **Renombrar encabezados a formato compatible con código**  
   Mejora la usabilidad en DAX y evita problemas de sintaxis.

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

## 📈 Información del Tablero
### 🎯 Segmentadores
- **Analizador**
- **Repuesto**
- **Estado después de la intervención**
- **Modelo**
- **Tipo de intervención**

---

### 📊 Visuales

#### FSE’s
- Tiempo promedio de resolución (hrs)
- Número de intervenciones

#### Repuestos
- Tiempo de inactividad (promedio hrs)
- Conteo de reemplazos

#### Analizadores con inactividad
- Tiempo total de inactividad (hrs)

---

## ❓ Preguntas y Respuestas del Análisis

### 1. Repuesto que causa mayor inactividad en relación a la frecuencia de reemplazo
**Tabla dinámica:**  
- Filas = `Repuesto`  
- Valores = `Conteo de reemplazos`, `Tiempo de inactividad por intervención (hrs)`  

**Hallazgo clave:**  
- Mayor frecuencia de reemplazo: **Elemento calefactor** — 7 reemplazos, promedio de inactividad **2,9 hrs**  
- Mayor tiempo de inactividad: **Fuente de luz** — 1 reemplazo, inactividad **4,6 hrs**  
- **Nota:** Si el problema no se resuelve → la máquina permanece fuera de servicio hasta la próxima visita

---

### 2. Tiempo promedio de resolución por reemplazo de un repuesto específico
**Tabla dinámica:**  
- Filas = `Repuesto`  
- Valores = `Tiempo promedio de resolución`  

**Hallazgo clave:** _[por agregar]_

---

### 3. FSE recomendados para primeras instalaciones
**Tabla dinámica:**  
- Filas = `Nombre FSE`  
- Valores = `Conteo de intervenciones`, `Tiempo promedio de resolución`  

**Hallazgo clave:** _[por agregar]_

---

### 4. Analizadores con mayor tiempo de inactividad acumulado
**Tabla dinámica:**  
- Filas = `Analizador`  
- Valores = `Tiempo total de resolución (hrs)`  

**Hallazgo clave:** _[por agregar]_

---

### 5. Principales analizadores que presentan reemplazo de un repuesto específico
**Tabla dinámica:**  
- Filas = `Analizador`  
- Columnas = `Repuesto`  
- Valores = `Conteo de intervenciones`  

**Hallazgo clave:** _[por agregar después de aplicar segmentador]_

---

## 📌 Conclusiones
- Desarrollar material de capacitación específico para repuestos con alta inactividad  
- Asignar FSE con experiencia a nuevas instalaciones de clientes  
- Acompañar a nuevos ingenieros en sus primeras instalaciones  
- Fortalecer canales de comunicación entre FSE que intervienen con frecuencia  
- Utilizar los datos de inactividad para optimizar el stock de repuestos y las intervenciones en terreno  
- Organizar visitas para obtener información en sitio de los analizadores principales  

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

## 📂 Source de Données et ETL (Power Query)

### Importation des Données
- **Dossier source :** `FSE’s_Reports`
- **Fichier utilisé :** `fse_reports.xlsx`
- Conçu pour **se mettre à jour automatiquement** lorsque de nouveaux rapports sont ajoutés au dossier source.

### Transformations
1. **Séparer `analyzer_id` et `analyzer_model`**  
   Extrait de la **Colonne D** pour créer des champs séparés permettant un meilleur filtrage et une meilleure analyse.

2. **Séparer `start_time` et `end_time`**  
   Extrait de la **Colonne F** (format : `AAAA-MM-JJ HH:MM - HH:MM`).  

3. **Extraire `fse_name`**  
   Pris de la **Colonne O**.  

4. **Inclure les colonnes pertinentes :** E, G, H, I, J, K, L, M, N, Q.

5. **Renommer les en-têtes en format compatible avec le code**  
   Améliore l’utilisation dans DAX et évite les problèmes de syntaxe.

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

## 📈 Aperçu du Tableau de Bord
### 🎯 Segments
- **Analyseur**
- **Pièce de rechange**
- **Statut après intervention**
- **Modèle**
- **Type d'intervention**

---

### 📊 Visuels

#### FSE’s
- Temps moyen de résolution (hrs)
- Nombre d'interventions

#### Pièces de rechange
- Temps d'arrêt (moyenne hrs)
- Nombre de remplacements

#### Analyseurs en panne
- Temps d'arrêt total (hrs)

---

## ❓ Questions et Réponses de l’Analyse

### 1. Pièce de rechange causant le plus de temps d'arrêt par rapport à la fréquence de remplacement
**Tableau croisé dynamique :**  
- Lignes = `Pièce de rechange`  
- Valeurs = `Nombre de remplacements`, `Temps d'arrêt par intervention (hrs)`  

**Conclusion clé :**  
- Fréquence de remplacement la plus élevée : **Élément chauffant** — 7 remplacements, temps d'arrêt moyen **2,9 hrs**  
- Temps d'arrêt le plus élevé : **Source lumineuse** — 1 remplacement, temps d'arrêt **4,6 hrs**  
- **Remarque :** Si le problème n'est pas résolu → la machine reste hors service jusqu'à la prochaine visite

---

### 2. Temps moyen de résolution pour le remplacement d'une pièce spécifique
**Tableau croisé dynamique :**  
- Lignes = `Pièce de rechange`  
- Valeurs = `Temps moyen de résolution`  

**Conclusion clé :** _[à ajouter]_

---

### 3. FSE recommandés pour les premières installations
**Tableau croisé dynamique :**  
- Lignes = `Nom FSE`  
- Valeurs = `Nombre d'interventions`, `Temps moyen de résolution`  

**Conclusion clé :** _[à ajouter]_

---

### 4. Analyseurs avec le plus long temps d'arrêt cumulé
**Tableau croisé dynamique :**  
- Lignes = `Analyseur`  
- Valeurs = `Temps total de résolution (hrs)`  

**Conclusion clé :** _[à ajouter]_

---

### 5. Principaux analyseurs présentant le remplacement d'une pièce spécifique
**Tableau croisé dynamique :**  
- Lignes = `Analyseur`  
- Colonnes = `Pièce de rechange`  
- Valeurs = `Nombre d'interventions`  

**Conclusion clé :** _[à ajouter après application du segment]_

---

## 📌 Conclusions
- Développer du matériel de formation ciblé pour les pièces ayant un fort temps d'arrêt  
- Affecter des FSE expérimentés aux nouvelles installations clients  
- Accompagner les nouveaux ingénieurs lors de leurs premières installations  
- Renforcer les canaux de communication entre les FSE intervenant fréquemment  
- Utiliser les données de temps d'arrêt pour optimiser le stock de pièces et les interventions sur site  
- Organiser des visites pour recueillir des informations sur les principaux analyseurs  

---

## 🛠 Outils Utilisés
- **Microsoft Excel** (Power Query, Power Pivot, Tableaux croisés dynamiques, DAX)  
- **Source de données :** `fse_reports.xlsx` + nouveaux fichiers ajoutés  
- **Visualisation :** Tableau de bord Excel 


