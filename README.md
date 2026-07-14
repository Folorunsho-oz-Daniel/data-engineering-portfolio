# My Data Engineering & Web Development Portfolio
## 📁 Project 2: Clinical Data ETL Pipeline (Automated Test Result Interpreter)

### 🏥 Project Overview
In healthcare data ecosystems, laboratory diagnostics machines generate massive streams of raw, unstructured, or inconsistent test data. This project implements a robust backend **ETL (Extract, Transform, Load) Pipeline** designed to ingest raw laboratory outputs, apply stringent data-quality validation rules, standardize terminology, enrich metrics with medical reference ranges, and output analytics-ready aggregates for downstream clinical systems.

While implemented in JavaScript to run efficiently within a browser runtime environment, the architectural principles mimic enterprise-grade pipeline data models.

---

### ⚙️ Pipeline Architecture & Logic Flow

#### 1. Extract (Data Ingestion Layer)
* **Source:** Simulates a real-time flat file or stream dump directly from laboratory diagnostic equipment analyzer logs.
* **Characteristics Handling:** Ingests unstandardized inputs, handling varied string casings (`HEMOGLOBIN` vs `Hemoglobin`), missing information (`null` values), and differing date formats.

#### 2. Transform (Data Quality, Validation & Enrichment)
This layer acts as the processing engine, applying computational logic to clean and validate incoming streams records:
* **Schema Standardization:** Strips whitespace and forces uniform string casing across clinical biomarkers using a definitive master dictionary structure.
* **Data Quality Constraints:** Implements an automated data validation gate. Corrupted records (e.g., missing critical numerical values like `resultValue`) are caught, safely logged via warning streams, and dropped to prevent pipeline crashes or database pollution.
* **Data Type Conversion:** Casts raw payload strings safely into float/integer metrics ready for mathematical parsing.
* **Data Enrichment:** Dynamically evaluates clinical metrics against standard biological thresholds to inject operational data flags (`NORMAL`, `LOW`, `HIGH`).

#### 3. Load (Aggregation & Data Warehouse Readiness)
* Maps the cleaned data objects into a highly structured relational matrix schema.
* Aggregates real-time processing performance logs (e.g., matching operational records against critical alert volumes) to output schema health metadata for BI dashboards or data audit trails.

---

### 🛠️ Technical Stack & Framework Mapping
To showcase my adaptability across the modern data stack, the core logical operations utilized in this project translate directly to standard production data tools:

| ETL Phase | Implementation Logic (JavaScript) | Enterprise Python Equivalent (Pandas/PySpark) | Enterprise Data Warehouse (SQL) | Portfolio Implementation Status |
| :--- | :--- | :--- | :--- | :--- |
| **Ingestion** | Array-based object storage streams | `pd.read_json()` / Ingesting landing bucket blobs | Staging table rows (`staging_clinical_records`) | **Implemented** (JS, Python, SQL) |
| **String Cleaning** | `.toUpperCase().trim()` | `.str.upper().str.strip()` | `UPPER(TRIM(marker))` | **Implemented** (JS, Python, SQL) |
| **Data Quality Gate**| `if (resultValue === null) return;` | `.dropna(subset=['resultValue'])` | `WHERE result_value IS NOT NULL` | **Implemented** (JS, Python, SQL) |
| **Data Enrichment** | Range-bound conditional evaluations | Vectorized array mapping (`np.select`) | `CASE WHEN value > max THEN 'HIGH' ... END` | **Implemented** (JS, Python, SQL) |
| **Aggregation** | `.forEach()` accumulator objects | `.groupby().count()` summary pipelines | `SELECT COUNT(*), status_flag GROUP BY...` | **Implemented** (JS, Python, SQL) |

---

### 🚀 Key Engineering Skills Demonstrated
* **Defensive Programming & Idempotency:** Designed error handling metrics that guarantee the pipeline can run continuously without crashing when encountering corrupt upstream records.
* **Schema Design & Data Modeling:** Implemented a relational-style key-value lookup truth schema to handle complex multi-conditional lookups.
* **Data Integrity Checks:** Programmed custom alerts to detect, isolate, and log anomalous data behavior.

---

## 📁 Project 3: Clinical Data Warehouse Analytics (SQL Layer)

### 📊 Project Overview
To complete the end-to-end data lifecycle, this layer models the cleaned diagnostic output from our ETL pipeline into a structured relational schema. It implements enterprise-grade SQL design patterns to store, clean, and analyze clinical patient trends.

### ⚙️ SQL Database & Analytics Architecture

#### 1. DDL Schema Definition & Data Constraints
* **Data Integrity:** Implements robust column constraints (`NOT NULL`, primary keys) and strict lookup validation checks (`CHECK (status_flag IN ('NORMAL', 'LOW', 'HIGH'))`) to prevent invalid clinical flags from entering production tables.
* **Relational Mapping:** Maps data types efficiently (`VARCHAR` for identifiers, `NUMERIC` with precise scale/precision for biological values) to optimize database storage and query speeds.

#### 2. Advanced Analytical Engine
* **Common Table Expressions (CTEs):** Organizes complex multi-stage calculations into highly readable, modular code structures (`WITH biomarker_stats AS...`).
* **Window Functions & Variance Analysis:** Utilizes partitioned aggregations to calculate global clinical averages dynamically, computing real-time absolute variances (`observed_value - global_average`) for patients with critical biomarkers without expensive subqueries.

---

### 🚀 Key Engineering Skills Demonstrated
* **Database Modeling (DDL):** Structured staging environments designed to ingest raw pipeline output.
* **Analytical Queries (DML & CTEs):** Wrote non-trivial queries leveraging analytical window calculations to surface actionable patient insights for medical dashboards.
