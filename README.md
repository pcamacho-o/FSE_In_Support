# 🌍 FSE’s Reports Analysis – Chile  

**Language:** [🇬🇧 English](#en) | [🇪🇸 Español](#es) | [🇫🇷 Français](#fr)  

---

## <a name="en"></a>🇬🇧 English  

### 📌 Project Overview  
This repository brings together two analytical projects based on *synthetic* Field Service Engineers (FSE) intervention reports in Chile for in-vitro diagnostic analyzers:  

1. [**Excel Dashboard Project**](/Dashboar_FSE) – ETL using **Power Query**, modeling with **Power Pivot/DAX**, and visualization through interactive dashboards.  
2. [**SQL Analysis Project**](/SQL_FSE/) – Analytical queries in **PostgreSQL** to calculate Mean Time Between Failures (MTBF), and spare parts impact.  

Both projects aim to **identify intervention patterns, and support data-driven decisions**.  

### ⚠️ Important Note  
All analyses are performed on **synthetic data** generated for demonstration and educational purposes.

Example: Investigating the **CTE result set**, filtered by *on-site* interventions, we can verify the **same intervention_start date** each visit for one machine, *which is not a common behavior for an FSE*, causing a logical equal to **0** result when referencing the CTE in the MTBF SQL query.

---
CTE result set

<img width="1918" height="1078" alt="CTE set" src="https://github.com/user-attachments/assets/35d52ed7-a2bd-4c0c-890b-adaaad5904d4" />

---
CTE Query

```sql

WITH ordered_visits AS (
    SELECT *,
        LAG(intervention_start) OVER (
            PARTITION BY analyzer_id
            ORDER BY intervention_start
        ) AS prev_date
    FROM fse_reports_chile
    WHERE 
    intervention_type = 'On-site Visit' AND
    TRIM(analyzer_model) = 'Cobas 8000' AND
    EXTRACT(YEAR FROM intervention_start) = 2025
)

```
---
Result

<img width="500" height="272" alt="Result MTBF" src="https://github.com/user-attachments/assets/bbd661cd-c775-48e5-b611-c68f0eb12978" />

---
### 📊
I would be very **grateful and open** if any organization would like to collaborate by providing **real-world datasets** in order to conduct deeper, more meaningful analyses.  

---

## <a name="es"></a>🇪🇸 Español  

### 📌 Descripción del Proyecto  
Este repositorio reúne dos proyectos analíticos basados en datos *sintéticos* de reportes de intervenciones de Ingenieros de Servicio de Campo (FSE) en Chile para analizadores de diagnóstico in vitro:  

1. [**Proyecto de Dashboard en Excel**](/Dashboar_FSE) – ETL con **Power Query**, modelado con **Power Pivot/DAX**, y visualización mediante tableros interactivos.  
2. [**Proyecto de Análisis SQL**](/SQL_FSE/) – Consultas analíticas en **PostgreSQL** para calcular MTBF y el impacto al reemplazar un repuesto.  

Ambos proyectos buscan **identificar patrones de intervención, y apoyar decisiones basadas en datos**.  

### ⚠️ Nota Importante  
Todos los análisis se realizan sobre **datos sintéticos** generados con fines demostrativos y educativos.

Ejemplo: Al investigar el **conjunto de resultados CTE**, filtrado por intervenciones *in situ*, podemos verificar la **misma fecha de inicio de la intervención** en cada visita para una máquina, *lo cual no es un comportamiento habitual para un FSE*, provocando un resultado lógico igual a **0** al referenciar la CTE en la consulta SQL para el MTBF.

---
Conjunto de resultados CTE

<img width="1918" height="1078" alt="CTE set" src="https://github.com/user-attachments/assets/35d52ed7-a2bd-4c0c-890b-adaaad5904d4" />

---
CTE Query

```sql

WITH ordered_visits AS (
    SELECT *,
        LAG(intervention_start) OVER (
            PARTITION BY analyzer_id
            ORDER BY intervention_start
        ) AS prev_date
    FROM fse_reports_chile
    WHERE 
    intervention_type = 'On-site Visit' AND
    TRIM(analyzer_model) = 'Cobas 8000' AND
    EXTRACT(YEAR FROM intervention_start) = 2025
)

```
---
Result

<img width="500" height="272" alt="Result MTBF" src="https://github.com/user-attachments/assets/bbd661cd-c775-48e5-b611-c68f0eb12978" />

---
### 📊
Estaré muy **agradecido y abierto** si alguna organización desea colaborar proporcionando **datos reales** para realizar análisis más profundos y relevantes.  

---

## <a name="fr"></a>🇫🇷 Français  

### 📌 Présentation du Projet  
Ce dépôt réunit deux projets analytiques basés sur des données *synthétiques* provenant des rapports d’interventions des Ingénieurs de Service (FSE) au Chili pour les analyseurs de diagnostic in vitro :  

1. [**Projet Tableau de Bord Excel**](/Dashboar_FSE) – ETL avec **Power Query**, modélisation avec **Power Pivot/DAX**, et visualisation via des tableaux de bord interactifs.  
2. [**Projet d’Analyse SQL**](/SQL_FSE/) – Requêtes analytiques sous **PostgreSQL** pour calculer le MTBF et l'impact lie au remplaçement d'une pièce détachée. 

Les deux projets visent à **identifier des tendances, et soutenir la prise de décision basée sur les données**.  

### ⚠️ Note Importante  
Toutes les analyses sont réalisées sur des **données synthétiques**, créées à des fins de démonstration et d’apprentissage.

Exemple : En investiguant **l'ensemble de résultats CTE**, filtré par interventions *sur site*, nous pouvons vérifier la **même date de début d'intervention** à chaque visite pour une machine, *ce qui n'est pas un comportement commun pour un FSE*, provoquant un résultat logique égal à **0** lors de la référence au CTE dans la requête SQL pour le MTBF.

---
Ensemble de résultats CTE

<img width="1918" height="1078" alt="CTE set" src="https://github.com/user-attachments/assets/35d52ed7-a2bd-4c0c-890b-adaaad5904d4" />

---
CTE Query

```sql

WITH ordered_visits AS (
    SELECT *,
        LAG(intervention_start) OVER (
            PARTITION BY analyzer_id
            ORDER BY intervention_start
        ) AS prev_date
    FROM fse_reports_chile
    WHERE 
    intervention_type = 'On-site Visit' AND
    TRIM(analyzer_model) = 'Cobas 8000' AND
    EXTRACT(YEAR FROM intervention_start) = 2025
)

```

---
Result

<img width="500" height="272" alt="Result MTBF" src="https://github.com/user-attachments/assets/bbd661cd-c775-48e5-b611-c68f0eb12978" />

---
### 📊
Je serais très **reconnaissant et ouvert** si une organisation souhaitait collaborer en fournissant des **données réelles** afin de permettre des analyses plus approfondies et significatives.  
