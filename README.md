📊 Professional Data Engineering Portfolio
📁 Project 1: Foundational Data Engineering Ecosystem & Environment Architecture
🏥 Project Overview

Before building production data pipelines, an engineer must establish a repeatable, isolated development environment. This project focuses on configuring a deterministic Linux-based runtime container environment (via GitHub Codespaces) configured with containerized package ecosystems, structured environmental isolation layers, and modern source control configurations.

⚙️ Architecture & Logic Flow
Runtime Sandbox Isolation: Configured an isolated development workspace using an underlying Linux development image container to abstract local operating system conflicts.
Environment Variable Security: Implemented decoupled key security using .gitignore patterns to prevent API keys and database credentials from accidentally being committed to public repositories.
Package Management Blueprinting: Created configuration files to track system-level packages, ensuring identical environments can be deployed across a team instantly.
📁 Project 2: Clinical Data ETL Pipeline (Automated Test Result Interpreter)
🏥 Project Overview

In healthcare data ecosystems, laboratory diagnostics machines generate massive streams of raw, unstructured, or inconsistent test data. This project implements a robust backend ETL (Extract, Transform, Load) Pipeline designed to ingest raw laboratory outputs, apply stringent data-quality validation rules, standardize terminology, enrich metrics with medical reference ranges, and output analytics-ready aggregates for downstream clinical systems.

While implemented in JavaScript to run efficiently within a browser runtime environment, the architectural principles mimic enterprise-grade pipeline data models.

⚙️ Pipeline Architecture & Logic Flow
Extract (Data Ingestion Layer)
Source: Simulates a real-time flat file or stream dump directly from laboratory diagnostic equipment analyzer logs.
Characteristics Handling: Ingests unstandardized inputs, handling varied string casings (HEMOGLOBIN vs Hemoglobin), missing information (null values), and differing date formats.
Transform (Data Quality, Validation & Enrichment)
This layer acts as the processing engine, applying computational logic to clean and validate incoming streams records:
Schema Standardization: Strips whitespace and forces uniform string casing across clinical biomarkers using a definitive master dictionary structure.
Data Quality Constraints: Implements an automated data validation gate. Corrupted records (e.g., missing critical numerical values like resultValue) are caught, safely logged via warning streams, and dropped to prevent pipeline crashes or database pollution.
Data Type Conversion: Casts raw payload strings safely into float/integer metrics ready for mathematical parsing.
Data Enrichment: Dynamically evaluates clinical metrics against standard biological thresholds to inject operational data flags (NORMAL, LOW, HIGH).
Load (Aggregation & Data Warehouse Readiness)
Maps the cleaned data objects into a highly structured relational matrix schema.
Aggregates real-time processing performance logs (e.g., matching operational records against critical alert volumes) to output schema health metadata for BI dashboards or data audit trails.
🛠️ Technical Stack & Framework Mapping

To showcase my adaptability across the modern data stack, the core logical operations utilized in this project translate directly to standard production data tools:

ETL Phase	Implementation Logic (JavaScript)	Enterprise Python Equivalent (Pandas/PySpark)	Enterprise Data Warehouse (SQL)	Portfolio Implementation Status
Ingestion	Array-based object storage streams	pd.read_json() / Ingesting landing bucket blobs	Staging table rows (staging_clinical_records)	Implemented (JS, Python, SQL)
String Cleaning	.toUpperCase().trim()	.str.upper().str.strip()	UPPER(TRIM(marker))	Implemented (JS, Python, SQL)
Data Quality Gate	if (resultValue === null) return;	.dropna(subset=['resultValue'])	WHERE result_value IS NOT NULL	Implemented (JS, Python, SQL)
Data Enrichment	Range-bound conditional evaluations	Vectorized array mapping (np.select)	CASE WHEN value > max THEN 'HIGH' ... END	Implemented (JS, Python, SQL)
Aggregation	.forEach() accumulator objects	.groupby().count() summary pipelines	SELECT COUNT(*), status_flag GROUP BY...	Implemented (JS, Python, SQL)
🚀 Key Engineering Skills Demonstrated
Defensive Programming & Idempotency: Designed error handling metrics that guarantee the pipeline can run continuously without crashing when encountering corrupt upstream records.
Schema Design & Data Modeling: Implemented a relational-style key-value lookup truth schema to handle complex multi-conditional lookups.
Data Integrity Checks: Programmed custom alerts to detect, isolate, and log anomalous data behavior.
📁 Project 3: Clinical Data Warehouse Analytics (SQL Layer)
📊 Project Overview

To complete the end-to-end data lifecycle, this layer models the cleaned diagnostic output from our ETL pipeline into a structured relational schema. It implements enterprise-grade SQL design patterns to store, clean, and analyze clinical patient trends.

⚙️ SQL Database & Analytics Architecture
DDL Schema Definition & Data Constraints
Data Integrity: Implements robust column constraints (NOT NULL, primary keys) and strict lookup validation checks (CHECK (status_flag IN ('NORMAL', 'LOW', 'HIGH'))) to prevent invalid clinical flags from entering production tables.
Relational Mapping: Maps data types efficiently (VARCHAR for identifiers, NUMERIC with precise scale/precision for biological values) to optimize database storage and query speeds.
Advanced Analytical Engine
Common Table Expressions (CTEs): Organizes complex multi-stage calculations into highly readable, modular code structures (WITH biomarker_stats AS...).
Window Functions & Variance Analysis: Utilizes partitioned aggregations to calculate global clinical averages dynamically, computing real-time absolute variances (observed_value - global_average) for patients with critical biomarkers without expensive subqueries.
🚀 Key Engineering Skills Demonstrated
Database Modeling (DDL): Structured staging environments designed to ingest raw pipeline output.
Analytical Queries (DML & CTEs): Wrote non-trivial queries leveraging analytical window calculations to surface actionable patient insights for medical dashboards.
📁 Project 4: Postpartum Care Insights — Live Data Pipeline & Dashboard (Supabase & Streamlit)

🔴 Live dashboard: https://postpartum-care-insights.streamlit.app/ 💻 Source code: https://github.com/Folorunsho-oz-Daniel/postpartum-care-insights

📊 Project Overview

Inspired by datanerd.tech (Luke Barousse) — a live job-market data platform — this project applies the same pattern to postpartum care: aggregating commonly asked questions, tagging them by topic, tracking trends over time, and linking each category to a real, verified support resource. The goal was to build a genuinely working end-to-end pipeline, not a static demo — real data, a live cloud database, and a publicly deployed dashboard.

⚙️ Pipeline Architecture

Data layer — two sources feeding one schema:

Real data: 156 real health questions sourced from MedQuAD (Ben Abacha & Demner-Fushman, 2019) — a public, CC BY 4.0 licensed dataset of ~47,000 question-answer pairs compiled from 12 NIH health websites. A keyword-based classifier filters and categorizes the postpartum/pregnancy-relevant subset.
Synthetic data: ~4,400 generated questions across 8 categories, weighted by postpartum stage (0–2 weeks through 6–12 months) to simulate realistic topic trends over a 16-week window, used to fill out volume the real dataset alone doesn't provide.
Both sources land in the same questions table with a source_type column, so real and synthetic data are queryable side by side — and the schema supports adding more live sources later without a redesign.

Database — Supabase (managed cloud Postgres):

Schema includes a staging table for incremental ingestion (raw_reddit_posts), a watermark table (pipeline_state) to track incremental sync progress, the clean questions table, a curated resources table, and an aggregation view (category_trends) so the dashboard queries pre-aggregated data instead of scanning raw rows.
Row Level Security enabled, with a public read-only policy — the dashboard connects with a public key that can read but never write or delete.

Resources — curated, not scraped:

Each category links to one real, verified resource (NHS, Postpartum Support International, La Leche League GB, The Lullaby Trust, NHS Inform), each with a last_verified date — deliberately manual rather than automated, since accuracy matters more than automation for anything health-related.

Dashboard — Streamlit, deployed on Streamlit Community Cloud:

Live, publicly hosted (not just runnable locally) — trend chart by category over time, category breakdown, free-text search, source filter (real vs. synthetic), and a resource panel.
⚠️ Known limitations (documented honestly, not hidden)
A fully live, continuously-incrementing source (Reddit API, via an idempotent watermark-based ingestion job) was designed and built — schema, dedup logic, and ingestion script are all in the repo — but blocked by Reddit's account-verification flow during a live build session. The raw_reddit_posts and pipeline_state tables are ready for it.
MedQuAD questions don't include original ask-dates, so they're stamped with ingestion date rather than a real timestamp — visible as a single-week spike in the trend chart rather than smoothed real-world distribution.
🚀 Key Engineering Skills Demonstrated
Data sourcing & licensing awareness: chose a real, appropriately licensed public dataset (CC BY 4.0) over scraping, with proper attribution.
Schema design for incremental/idempotent pipelines: watermark tracking and natural-key deduplication, designed before the live source was blocked — the pattern is provable even though the live feed isn't running yet.
Cloud database management: Supabase/Postgres, Row Level Security policy design, aggregation views.
End-to-end deployment: GitHub → Streamlit Community Cloud, with secrets managed outside of source control.
📊 Summary: Technical Stack & Framework Mapping

To showcase my adaptability across the modern data stack, the core logical operations utilized in this portfolio translate directly to standard production data tools:

ETL / Architecture Phase	Implementation Logic (Portfolio Engine)	Enterprise Python Equivalent (Pandas/PySpark)	Enterprise Data Warehouse / Cloud Layer (SQL / Infra)	Portfolio Implementation Status
Ingestion	Array-based object storage streams	pd.read_json() / Ingesting landing bucket blobs	Staging table rows (staging_clinical_records)	Implemented (JS, Python, SQL)
String Cleaning	.toUpperCase().trim()	.str.upper().str.strip()	UPPER(TRIM(marker))	Implemented (JS, Python, SQL)
Data Quality Gate	if (resultValue === null) return;	.dropna(subset=['resultValue'])	WHERE result_value IS NOT NULL	Implemented (JS, Python, SQL)
Data Enrichment & Categorization	Range-bound / keyword-based conditional evaluations	Vectorized array mapping (np.select)	CASE WHEN value > max THEN 'HIGH' ... END	Implemented (JS, Python, SQL)
Aggregation	.forEach() accumulator objects	.groupby().count() summary pipelines	SELECT COUNT(*), status GROUP BY...	Implemented (JS, Python, SQL)
Cloud Data Warehouse & Incremental Loading	Watermark-tracked staging tables, natural-key dedup	sqlalchemy.create_engine() with connection pooling	Supabase Managed Cloud Postgres, RLS policies, aggregation views	Implemented (Cloud Infra)
State Caching & Performance Optimization	Memory Cache Wrappers (@st.cache_data)	Memory-backed distributed caching (Redis / Memcached)	Materialized Views / Query Plan Indexes	Implemented (Dashboard Layer)
🚀 Summary of Key Engineering Skills Demonstrated
Database & Cloud Architecture: Live Production Data Warehousing (Supabase Cloud PostgreSQL), Row Level Security policy design, and public/live deployment (GitHub → Streamlit Community Cloud).
Data Sourcing & Pipeline Design: Real, appropriately licensed public datasets (MedQuAD, CC BY 4.0) combined with synthetic data in a unified schema; incremental/idempotent ingestion design (watermark tracking, natural-key deduplication).
Business Intelligence & Interfaces: Reactive Dashboard Development (Streamlit Framework), Interactive Chart Design (Plotly), category filtering, and free-text search over live data.
