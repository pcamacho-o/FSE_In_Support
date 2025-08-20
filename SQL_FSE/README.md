# 🌍 FSE's Reports SQL Analysis – Chile
**Language:** [🇬🇧 English](#en) | [🇪🇸 Español](#es) | [🇫🇷 Français](#fr)

---
## <a name="en"></a>🇬🇧 English
## 📌 Project Overview

This project showcases an analysis of *synthetic* **Field Service Engineers (FSE) intervention reports in Chile** for in-vitro diagnostic analyzers.
The two main goals are, to identify trends in spare parts usage, and to calculate Mean Time Between Failures (MTBF), using **PostgreSQL** database.

---

## ❓ Q&A Queries

### 1️⃣ Top 5 time-consuming Spare Parts   
Filtered interventions for the **Cobas 8000 analyzer**, considering **on-site visits in 2025**, and ranked the spare parts by total resolution hours.

```sql
SELECT 
    spare_part_use,
    SUM(CAST(resolution_time_min AS INT)/60) AS resolution_hours
FROM(
    SELECT *
    FROM fse_reports_chile
    WHERE 
        TRIM(analyzer_model) = 'Cobas 8000'
        AND intervention_type = 'On-site Visit'
        AND EXTRACT(YEAR FROM intervention_start) = 2025
        AND spare_part_use <> 'None'
) AS on_site
GROUP BY spare_part_use
ORDER BY resolution_hours DESC
LIMIT 5;
```

✅ **Output:** A ranking of the spare parts replaced in relation to the intervention's resolution time.

| spare_part_use | resolution_hours |
| -------------- | ---------------- |
| Reagent Valve  | 39               |
| Light Source   | 21               |
| Plunger        | 14               |
| Brush          | 10               |
| Encoder Motor  | 4                |

---

### 2️⃣ Mean Time Between Failures (MTBF)  
Using **CTE (Common Table Expression)**, also a **window function**, adding the number of failures, and the average time *in hours* between consecutive failures that required an *on-site* intervention per analyzer.

```sql
WITH ordered_visits AS (
    SELECT *,
        LAG(intervention_start) OVER (
            PARTITION BY analyzer_id
            ORDER BY intervention_start
        ) AS prev_date
    FROM fse_reports_chile
    WHERE 
        intervention_type = 'On-site Visit'
        AND TRIM(analyzer_model) = 'Cobas 8000'
        AND EXTRACT(YEAR FROM intervention_start) = 2025
)
SELECT
    analyzer_id,
    COUNT(*) AS num_failures,
    ROUND(AVG(EXTRACT(EPOCH FROM (
        intervention_start - prev_date)) / 3600)) AS MTBF
FROM ordered_visits
GROUP BY analyzer_id
ORDER BY MTBF DESC;
```

✅ **Output:** MTBF per analyzer, allowing performance comparison across machines.

| analyzer_id   | num_failures | mtbf |
| ------------- | ------------ | ---- |
| CH-83563-007  | 5            | 330  |
| CH-38657-007  | 9            | 76   |
| CH-88907-005  | 10           | 67   |
| CH-36062-008  | 18           | 14   |
| CH-81426-010  | 13           | 0    |


---
## 📌 Conclusions

- Develop data-driven training materials, on spare parts in relation to a high-downtime. 
- Get on-site information from ranked analyzers, during pre-fixed missions.

---
## 🗂️ Repository Structure
[Link to folder: SQL_FSE](/SQL_FSE)

```
📂 SQL_FSE
 ├── 📄 README.md                       ← Project documentation (this file)
    📂dataset
     ├── 📄 fse_reports_chile.csv       ← Dataset (synthetic)
    📂sql_files
     ├── 📄 fse_reports_queries.sql     ← SQL code for analysis

```
---
## 🛠 Tools Used
- **PostgresSQL** (Database)
- **Data Source:** `fse_reports_chile.csv` 
- **Code Editor:** VS Code

---

## <a name="es"></a>🇪🇸 Español
## 📌 Descripción del Proyecto

Este proyecto presenta un análisis de reportes *sintéticos* sobre **intervenciones de Ingenieros de Servicio de Campo (FSE) en Chile** para analizadores de diagnóstico in-vitro.  
El objetivo es identificar tendencias en el uso de repuestos y calcular el Tiempo Medio Entre Fallas (MTBF), utilizando una base de datos en **PostgreSQL**.

---

## ❓ Q&A Queries

### 1️⃣ Top 5 Repuestos por Tiempo de Resolución  
Intervenciones filtradas para el **analizador Cobas 8000**, considerando **visitas en terreno en 2025**, y clasificadas por las horas totales de resolución de los repuestos.

```sql
SELECT 
    spare_part_use,
    SUM(CAST(resolution_time_min AS INT)/60) AS resolution_hours
FROM(
    SELECT *
    FROM fse_reports_chile
    WHERE 
        TRIM(analyzer_model) = 'Cobas 8000'
        AND intervention_type = 'On-site Visit'
        AND EXTRACT(YEAR FROM intervention_start) = 2025
        AND spare_part_use <> 'None'
) AS on_site
GROUP BY spare_part_use
ORDER BY resolution_hours DESC
LIMIT 5;
```

✅ **Resultado:** Un ranking de los repuestos que consumen más tiempo cuando son reemplazadas en una intervencion.

| repuesto       | horas_resolucion |
| -------------- | ---------------- |
| Válvula Reactivo | 39             |
| Fuente de Luz    | 21             |
| Émbolo           | 14             |
| Cepillo          | 10             |
| Motor Encoder    | 4              |

---

### 2️⃣ Tiempo Medio Entre Fallas (MTBF)  
Usando una **CTE (Common Table Expression)** y una **window funtion**, agregando el número de fallas, y el tiempo promedio *en horas* entre fallas consecutivas que requirieron una intervención *en terreno*, para cada analizador.

```sql
WITH ordered_visits AS (
    SELECT *,
        LAG(intervention_start) OVER (
            PARTITION BY analyzer_id
            ORDER BY intervention_start
        ) AS prev_date
    FROM fse_reports_chile
    WHERE 
        intervention_type = 'On-site Visit'
        AND TRIM(analyzer_model) = 'Cobas 8000'
        AND EXTRACT(YEAR FROM intervention_start) = 2025
)
SELECT
    analyzer_id,
    COUNT(*) AS num_failures,
    ROUND(AVG(EXTRACT(EPOCH FROM (
        intervention_start - prev_date)) / 3600)) AS MTBF
FROM ordered_visits
GROUP BY analyzer_id
ORDER BY MTBF DESC;
```

✅ **Resultado:** MTBF por analizador, lo que permite comparar el rendimiento entre máquinas.

| id_analizador | num_fallas | mtbf |
| ------------- | ---------- | ---- |
| CH-83563-007  | 5          | 330  |
| CH-38657-007  | 9          | 76   |
| CH-88907-005  | 10         | 67   |
| CH-36062-008  | 18         | 14   |
| CH-81426-010  | 13         | 0    |


---
## 📌 Conclusiones

- Desarrollar materiales de formación basados en datos sobre piezas de repuesto relacionadas con tiempos de inactividad prolongados.
- Obtener información in situ de analizadores clasificados durante misiones prefijadas. 

---
## 🗂️ Estructura del Repositorio
[Link a carpeta: SQL_FSE](/SQL_FSE)


```
📂 SQL_FSE
 ├── 📄 README.md                        ← Documentación del proyecto (este archivo)
    📂dataset
     ├── 📄 fse_reports_chile.csv        ← Conjunto de datos (sintético)
    📂sql_files
     ├── 📄 fse_reports_queries.sql      ← Código SQL para análisis

```
---
## 🛠 Herramientas utilizadas
- **PostgresSQL** (Database)
- **Data Source:** `fse_reports_chile.csv` 
- **Code Editor:** VS Code

## <a name="fr"></a>🇫🇷 Français
## 📌 Présentation du Projet

Ce projet présente l’analyse de rapports d'interventions *synthétiques* **d’Ingénieurs de Service Terrain (FSE) au Chili** sur des analyseurs de diagnostic in-vitro.  
L’objectif est d’identifier les tendances dans l’utilisation des pièces de rechange et de calculer le Temps Moyen Entre Pannes (MTBF), en utilisant une base de données **PostgreSQL**.

---

## ❓ Q&A Queries

### 1️⃣ Les 5 Pièces de Rechange qui prennent le plus de temps  
Interventions filtrées pour **l'analyseur Cobas 8000**, considérant les **visites sur site en 2025**, et classées selon le nombre total d’heures de résolution des pièces de rechange.

```sql
SELECT 
    spare_part_use,
    SUM(CAST(resolution_time_min AS INT)/60) AS resolution_hours
FROM(
    SELECT *
    FROM fse_reports_chile
    WHERE 
        TRIM(analyzer_model) = 'Cobas 8000'
        AND intervention_type = 'On-site Visit'
        AND EXTRACT(YEAR FROM intervention_start) = 2025
        AND spare_part_use <> 'None'
) AS on_site
GROUP BY spare_part_use
ORDER BY resolution_hours DESC
LIMIT 5;
```

✅ **Résultat :** Classement des pièces détachées remplacées en relation avec le temps de résolution de l'intervention.

| pièce_de_rechange | heures_resolution |
| ----------------- | ----------------- |
| Valve Réactif     | 39                |
| Source Lumineuse  | 21                |
| Piston            | 14                |
| Brosse            | 10                |
| Moteur Encodeur   | 4                 |

---

### 2️⃣ Temps Moyen Entre Pannes (MTBF)  
En utilisant une **CTE (Common Table Expression)** et une **window function**, ajoutant le nombre de pannes, et le temps moyen en heures entre les pannes consécutives ayant nécessité une intervention *sur site* par analyseur.

```sql
WITH ordered_visits AS (
    SELECT *,
        LAG(intervention_start) OVER (
            PARTITION BY analyzer_id
            ORDER BY intervention_start
        ) AS prev_date
    FROM fse_reports_chile
    WHERE 
        intervention_type = 'On-site Visit'
        AND TRIM(analyzer_model) = 'Cobas 8000'
        AND EXTRACT(YEAR FROM intervention_start) = 2025
)
SELECT
    analyzer_id,
    COUNT(*) AS num_failures,
    ROUND(AVG(EXTRACT(EPOCH FROM (
        intervention_start - prev_date)) / 3600)) AS MTBF
FROM ordered_visits
GROUP BY analyzer_id
ORDER BY MTBF DESC;
```

✅ **Résultat :** MTBF par analyseur, permettant la comparaison des performances entre machines.

| id_analyzer    | nb_pannes | mtbf |
| -------------- | --------- | ---- |
| CH-83563-007   | 5         | 330  |
| CH-38657-007   | 9         | 76   |
| CH-88907-005   | 10        | 67   |
| CH-36062-008   | 18        | 14   |
| CH-81426-010   | 13        | 0    |


---
## 📌 Conclusions

- Développer des supports de formation basés sur des données, sur les pièces détachées en relation avec un temps d'arrêt élevé.
- Obtenir des informations sur site à partir d'analyseurs classés, lors de missions préétablies.

---
## 🗂️ Structure du Répertoire
[Lien vers dossier: SQL_FSE](/SQL_FSE)

```
📂 SQL_FSE
 ├── 📄 README.md                      ← Documentation du projet (ce fichier)
    📂dataset
     ├── 📄 fse_reports_chile.csv      ← Basse de données (synthétique)
    📂sql_files
     ├── 📄 fse_reports_queries.sql    ← Code SQL pour analyse

```
---
## 🛠 Outils utilisés
- **PostgresSQL** (Database)
- **Data Source:** `fse_reports_chile.csv` 
- **Code Editor:** VS Code