-- ==============================================================================
-- CLINICAL DATA WAREHOUSE: STAGING & ANALYTICAL QUERIES
-- Dialect: PostgreSQL / Standard SQL
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- STAGE 1: Database Schema Definition (DDL)
-- Creating the structured table to load our cleaned Python pipeline outputs.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS staging_clinical_records (
    record_id SERIAL PRIMARY KEY,
    patient_id VARCHAR(50) NOT NULL,
    test_date DATE NOT NULL,
    biomarker VARCHAR(100) NOT NULL,
    observed_value NUMERIC(10, 2) NOT NULL,
    measurement_unit VARCHAR(50) NOT NULL,
    range_min NUMERIC(10, 2),
    range_max NUMERIC(10, 2),
    status_flag VARCHAR(20) CHECK (status_flag IN ('NORMAL', 'LOW', 'HIGH', 'UNKNOWN_MARKER'))
);

-- Simulating loaded records from our Python pipeline execution
INSERT INTO staging_clinical_records 
    (patient_id, test_date, biomarker, observed_value, measurement_unit, range_min, range_max, status_flag)
VALUES
    ('PT-0921', '2026-07-10', 'HEMOGLOBIN', 11.20, 'g/dL', 12.00, 17.50, 'LOW'),
    ('PT-1442', '2026-07-11', 'PLATELETS', 250.00, 'x10^9/L', 150.00, 400.00, 'NORMAL'),
    ('PT-0921', '2026-07-10', 'WHITE_BLOOD_CELLS', 14.80, 'thousand/uL', 4.00, 11.00, 'HIGH'),
    ('PT-5521', '2026-07-13', 'PLATELETS', 85.00, 'x10^9/L', 150.00, 400.00, 'LOW');


-- ------------------------------------------------------------------------------
-- STAGE 2: Analytical CTEs & Window Functions
-- Scenario: Find patients who have critical (non-NORMAL) biomarkers, 
-- and rank their metrics against database averages.
-- ------------------------------------------------------------------------------
WITH biomarker_stats AS (
    -- CTE 1: Calculate global average values for each biomarker to use as a baseline
    SELECT 
        biomarker,
        ROUND(AVG(observed_value), 2) as global_average_value
    FROM staging_clinical_records
    GROUP BY biomarker
)

SELECT 
    scr.patient_id,
    scr.test_date,
    scr.biomarker,
    scr.observed_value,
    scr.status_flag,
    bs.global_average_value,
    -- Window Function: Calculate the absolute variance from the cohort average
    ROUND(scr.observed_value - bs.global_average_value, 2) AS variance_from_average
FROM staging_clinical_records scr
JOIN biomarker_stats bs ON scr.biomarker = bs.biomarker
WHERE scr.status_flag != 'NORMAL'
ORDER BY variance_from_average DESC;