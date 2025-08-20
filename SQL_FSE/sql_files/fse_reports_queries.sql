-- Create the table to store the FSE reports data

CREATE TABLE fse_reports_chile(
    source_excel TEXT,
    report_id TEXT,
    analyzer_model TEXT,
    analyzer_id TEXT,
    intervention_type TEXT,
    symptoms_reported TEXT,
    root_cause TEXT,
    actions_taken TEXT,
    spare_part_use TEXT,
    spare_part_sn TEXT,
    status_after_intervention TEXT,
    follow_up_date TEXT,
    fse_name TEXT,
    notes TEXT,
    intervention_start TIMESTAMP,
    intervention_end TIMESTAMP,
    duration TEXT,
    resolution_time_min TEXT
)

-- PostgreSQL command to set the owner of the table

ALTER TABLE fse_reports_chile
OWNER to postgres;

-- Load data from the CSV file into the table

COPY fse_reports_chile
FROM 'C:\csv_projects\dataset_fse_reports_chile\fse_reports_chile.csv'
WITH (FORMAT csv, HEADER true, DELIMITER ',', ENCODING 'UTF8');

-- Check the first 5 rows of the table to ensure data has been loaded correctly

SELECT * FROM fse_reports_chile LIMIT 5;

-- Find the top 5 spare parts that took the longest time to resolve issues 
-- For Cobas 8000 analyzers during on-site visits in 2025

SELECT 
    spare_part_use,
    SUM(CAST(resolution_time_min AS INT)/60) AS resolution_hours
FROM(
    SELECT *
    FROM fse_reports_chile
    WHERE 
        TRIM(analyzer_model) = 'Cobas 8000' AND
        intervention_type = 'On-site Visit' AND
        EXTRACT(YEAR FROM intervention_start) = 2025 AND
        spare_part_use <> 'None'
    ) AS on_site
GROUP BY
    spare_part_use
ORDER BY
    resolution_hours DESC
LIMIT 5;

-- Mean Time Between Failures (MTBF) for Cobas 8000 analyzers
-- For on-site visits in 2025

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
SELECT
    analyzer_id,
    COUNT(*) AS num_failures,
    ROUND(AVG(EXTRACT(EPOCH FROM (
        intervention_start - prev_date)) / 3600)) 
        AS MTBF
FROM ordered_visits
GROUP BY analyzer_id
ORDER BY MTBF DESC;

--