# 🌍 FSE's Reports SQL Analysis – Chile
**Language:** [🇬🇧 English](#en) | [🇪🇸 Español](#es) | [🇫🇷 Français](#fr)

---
## <a name="en"></a>🇬🇧 English
## 📌 Project Overview

This project showcases the analysis of *synthetic* **Field Service Engineers (FSE) intervention reports in Chile** for in-vitro diagnostic analyzers.
The goal is to identify trends in spare parts usage, calculate Mean Time Between Failures (MTBF), using **PostgreSQL** database.

---

## 🛠️ Dataset Structure

The data is stored in a PostgreSQL table named `fse_reports_chile`, loaded from a .csv file located in [dataset folder](/SQL_FSE/dataset/).

---

## 📌 Analysis Queries

### 1️⃣ Top 5 Spare Parts by Resolution Time  
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

✅ **Output:** A ranking of the most time-consuming spare parts involved when there is an issue to resolve.

| spare_part_use | resolution_hours |
| -------------- | ---------------- |
| Reagent Valve  | 39               |
| Light Source   | 21               |
| Plunger        | 14               |
| Brush          | 10               |
| Encoder Motor  | 4                |

---

### 2️⃣ Mean Time Between Failures (MTBF)  
Using **CTE (Common Table Expression)**, also a **window function**, adding the number of failures and the average time in hours between consecutive failures that required an *on-site* intervention per analyzer.

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
## 🗂️ Repository Structure

```
📂 SQL_FSE
 ├── 📄 README.md                   ← Project documentation (this file)
 ├── 📄 fse_reports_chile.csv       ← Dataset (synthetic)
 ├── 📄 fse_reports_queries.sql     ← SQL code for analysis

```

---
## 📌 Conclusions

- Develop targeted training materials for high-downtime spare parts 
- Organize visits to get on-site information of top analyzers
- Use downtime insights to optimize spare part stock and field interventions

---

## <a name="es"></a>🇪🇸 Español
## 📌 Descripción del Proyecto

Este proyecto presenta el análisis de *reportes sintéticos* de **intervenciones de Ingenieros de Servicio de Campo (FSE) en Chile** para analizadores de diagnóstico in-vitro.  
El objetivo es identificar tendencias en el uso de repuestos y calcular el Tiempo Medio Entre Fallas (MTBF), utilizando una base de datos en **PostgreSQL**.

---

## 🛠️ Estructura del Conjunto de Datos

Los datos se almacenan en una tabla de PostgreSQL llamada `fse_reports_chile`, cargada desde un archivo .csv ubicado en [carpeta dataset](/SQL_FSE/dataset/).

---

## 📌 Consultas de Análisis

### 1️⃣ Los 5 Repuestos Principales por Tiempo de Resolución  
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

✅ **Resultado:** Un ranking de los repuestos que consumen más tiempo cuando hay un problema que resolver.

| repuesto       | horas_resolucion |
| -------------- | ---------------- |
| Válvula Reactivo | 39             |
| Fuente de Luz    | 21             |
| Émbolo           | 14             |
| Cepillo          | 10             |
| Motor Encoder    | 4              |

---

### 2️⃣ Tiempo Medio Entre Fallas (MTBF)  
Usando una **CTE (Expresión de Tabla Común)** y una **función de ventana**, agregando el número de fallas y el tiempo promedio en horas entre fallas consecutivas que requirieron una intervención *en terreno* por analizador.

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
## 🗂️ Estructura del Repositorio

```
📂 SQL_FSE
 ├── 📄 README.md                   ← Documentación del proyecto (este archivo)
 ├── 📄 fse_reports_chile.csv       ← Conjunto de datos (sintético)
 ├── 📄 fse_reports_queries.sql     ← Código SQL para análisis

```

---
## 📌 Conclusiones

- Desarrollar materiales de capacitación dirigidos a repuestos con alto tiempo de inactividad  
- Organizar visitas para recopilar información en terreno de los analizadores principales  
- Usar los datos de tiempo de inactividad para optimizar el stock de repuestos y las intervenciones en terreno  

---

## <a name="fr"></a>🇫🇷 Français
## 📌 Présentation du Projet

Ce projet présente l’analyse de *rapports synthétiques* des **interventions d’Ingénieurs de Service Terrain (FSE) au Chili** pour des analyseurs de diagnostic in-vitro.  
L’objectif est d’identifier les tendances dans l’utilisation des pièces de rechange et de calculer le Temps Moyen Entre Pannes (MTBF), en utilisant une base de données **PostgreSQL**.

---

## 🛠️ Structure du Jeu de Données

Les données sont stockées dans une table PostgreSQL appelée `fse_reports_chile`, chargée à partir d’un fichier .csv situé dans [dossier dataset](/SQL_FSE/dataset/).

---

## 📌 Requêtes d’Analyse

### 1️⃣ Top 5 des Pièces de Rechange par Temps de Résolution  
Interventions filtrées pour l’**analyseur Cobas 8000**, considérant les **visites sur site en 2025**, et classées selon le nombre total d’heures de résolution des pièces de rechange.

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

✅ **Résultat :** Un classement des pièces de rechange les plus chronophages lorsqu’un problème doit être résolu.

| pièce_de_rechange | heures_resolution |
| ----------------- | ----------------- |
| Valve Réactif     | 39                |
| Source Lumineuse  | 21                |
| Piston            | 14                |
| Brosse            | 10                |
| Moteur Encodeur   | 4                 |

---

### 2️⃣ Temps Moyen Entre Pannes (MTBF)  
En utilisant une **CTE (Expression de Table Commune)** et une **fonction fenêtre**, ajoutant le nombre de pannes et le temps moyen en heures entre les pannes consécutives ayant nécessité une intervention *sur site* par analyseur.

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
## 🗂️ Structure du Répertoire

```
📂 SQL_FSE
 ├── 📄 README.md                   ← Documentation du projet (ce fichier)
 ├── 📄 fse_reports_chile.csv       ← Jeu de données (synthétique)
 ├── 📄 fse_reports_queries.sql     ← Code SQL pour analyse

```

---
## 📌 Conclusions

- Développer du matériel de formation ciblant les pièces avec un temps d’arrêt élevé  
- Organiser des visites pour recueillir des informations sur site concernant les analyseurs principaux  
- Utiliser les données sur les temps d’arrêt pour optimiser le stock de pièces de rechange et les interventions terrain  

