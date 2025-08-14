CREATE TABLE error_log_ec001(
    timestamp TIMESTAMP,
    error_code TEXT,
    error_type TEXT,
    description TEXT,
    severity TEXT,
    analyzer_id TEXT,
    firmware_version FLOAT,
    temperature FLOAT,
    operator TEXT
);

--

ALTER TABLE error_log_ec001
ALTER COLUMN firmware_version TYPE TEXT;

--

COPY error_log_ec001
FROM 'C:\csv_projects\dataset_error_log_001\error_log_ec001.csv'
WITH (FORMAT csv, HEADER true, DELIMITER ',', ENCODING 'UTF8');

-- 
\copy error_log_ec001 FROM 'C:\csv_projects\dataset_error_log_001\error_log_ec001.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', ENCODING 'UTF8');
--

SELECT * FROM error_log_ec001 LIMIT 5;

