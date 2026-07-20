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

---

## 📁 Project 4: Cloud Data Warehouse Pipeline & Predictive BI Hub (Supabase & Streamlit)

### 📊 Project Overview
To close the loop on the data architecture lifecycle, this layer implements an advanced live operational infrastructure. It migrates clinical data out of localized environments, syncs it up to a live managed cloud data warehouse, and exposes the data via an interactive business intelligence interface featuring predictive risk triage stratification.

### ⚙️ Pipeline Architecture & Dashboard Engine

1. **Cloud Data Warehouse Migration Layer (Supabase)**
   * **IPv4 Pooler Routing Integration:** Configured a high-performance transaction-mode pooler bridge (`aws-0-eu-west-1.pooler.supabase.com:6543`) to completely bypass traditional local network IPv6 handshake limitations, securing an industrial-grade, persistent connection up to a cloud PostgreSQL instance.
   * **Secure Credential Isolation:** Orchestrated decoupled structural configurations utilizing `.env` management to protect production tokens from source control exposures.

2. **Predictive Analytics & Core Transformation Engine**
   * **Algorithmic Case Allocation:** Built an inline clinical heuristic mapping engine that automatically segments incoming patient queues into *Stable*, *Elevated Warning*, and *Critical Action Required* buckets to maximize healthcare resources.
   * **Data Ingestion Cache Controls:** Applied declarative application memory caching (`@st.cache_data`) wrapped with a 3600-second TTL to reduce query overhead costs and maximize dashboard response speeds.

3. **Front-End Business Intelligence Interface (Streamlit & Plotly)**
   * **Dynamic Multi-Select Filters:** Engineered reactive control sidebars allowing real-time, multi-dimensional rendering across specific age brackets and medical facilities.
   * **Interface Layout Engineering:** Handled small-viewport formatting constraints by injecting HTML line breaks (`<br>`) straight into active data matrices to force balanced layout structures under visual bar charts.

---

### 🏃‍♂️ Running the Cloud Dashboard Locally

1. Create a `.env` file in your root folder:
   ```env
   SUPABASE_DB_PASSWORD=your_secure_password

---

## 📊 Summary: Technical Stack & Framework Mapping

To showcase my adaptability across the modern data stack, the core logical operations utilized in this portfolio translate directly to standard production data tools:

| ETL / Architecture Phase | Implementation Logic (Portfolio Engine) | Enterprise Python Equivalent (Pandas/PySpark) | Enterprise Data Warehouse / Cloud Layer (SQL / Infra) | Portfolio Implementation Status |
| :--- | :--- | :--- | :--- | :--- |
| **Ingestion** | Array-based object storage streams | `pd.read_json()` / Ingesting landing bucket blobs | Staging table rows (`staging_clinical_records`) | **Implemented (JS, Python, SQL)** |
| **String Cleaning** | `.toUpperCase().trim()` | `.str.upper().str.strip()` | `UPPER(TRIM(marker))` | **Implemented (JS, Python, SQL)** |
| **Data Quality Gate** | `if (resultValue === null) return;` | `.dropna(subset=['resultValue'])` | `WHERE result_value IS NOT NULL` | **Implemented (JS, Python, SQL)** |
| **Data Enrichment & Risk Triage** | Algorithmic range-bound evaluations | Vectorized array mapping (`np.select`) | `CASE WHEN value > max THEN 'CRITICAL' ... END` | **Implemented (JS, Python, SQL)** |
| **Aggregation** | `.forEach()` accumulator objects | `.groupby().count()` summary pipelines | `SELECT COUNT(*), status GROUP BY...` | **Implemented (JS, Python, SQL)** |
| **Cloud Data Warehouse Routing** | Connection Pooler Routing & Port Configuration | `sqlalchemy.create_engine()` with connection pooling | Supabase Managed Cloud Postgres Instance (AWS-hosted) | **Implemented (Cloud Infra)** |
| **State Caching & Performance Optimization** | Memory Cache Wrappers (`@st.cache_data`) | Memory-backed distributed caching (Redis / Memcached) | Materialized Views / Query Plan Indexes | **Implemented (Dashboard Layer)** |

---

### 🚀 Summary of Key Engineering Skills Demonstrated
* **Database & Cloud Architecture:** Live Production Data Warehousing (Supabase Cloud PostgreSQL), Connection Pooler Optimization (bypassing IPv6 limits via transactional routing proxies), and Environment Variable Decoupling (`.env` isolation).
* **Data Transformation & Analytics:** Algorithmic Clinical Case Allocation (triage predictive logic), Heuristic Cohort Segmentation, and Performance Tuning (Data Ingestion Caching Engines with TTL parameters).
* **Business Intelligence & Interfaces:** Reactive Dashboard Development (Streamlit Framework), Interactive Layout Design (Plotly Chart Matrices), and Dynamic Multi-Select Operational Sidebars.
