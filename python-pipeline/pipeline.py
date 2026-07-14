# ==============================================================================
# STAGE 1: RAW DATA INGESTION (EXTRACT) - PYTHON VERSION
# ==============================================================================
import datetime

# Simulating the exact same raw data dump from the hospital lab analyzer machine.
# Python uses a list [] of dictionaries {} to hold these records natively.

raw_lab_dump = [
    { "patientId": "PT-0921", "testDate": "2026-07-10", "marker": "HEMOGLOBIN", "resultValue": "11.2", "unit": "g/dL" },
    { "patientId": "PT-1442", "testDate": "11/07/2026", "marker": "platelets", "resultValue": "250", "unit": "x10^9/L" },
    { "patientId": "PT-0921", "testDate": "2026-07-10", "marker": "WHITE_BLOOD_CELLS", "resultValue": "14.8", "unit": "thousand/uL" },
    { "patientId": "PT-3301", "testDate": "2026-07-12", "marker": "Hemoglobin", "resultValue": None, "unit": "g/dL" }, # Python uses 'None' for missing/null data
    { "patientId": "PT-5521", "testDate": "2026-07-13", "marker": "PLATELETS", "resultValue": "85", "unit": "x10^9/L" }
]

# In Python, we calculate lengths using the len() function and format strings with 'f-strings'
total_records = len(raw_lab_dump)
print(f"🚀 Extraction Layer: Successfully ingested {total_records} raw records via Python.")

# ==============================================================================
# STAGE 2: DATA TRANSFORMATION & ENRICHMENT - PYTHON VERSION
# ==============================================================================

# 1. Reference Ranges (Our Master Truth Dictionary)
medical_reference_ranges = {
    "HEMOGLOBIN":        {"min": 12.0, "max": 17.5, "type": "float"},
    "PLATELETS":         {"min": 150.0, "max": 400.0, "type": "int"},
    "WHITE_BLOOD_CELLS": {"min": 4.0, "max": 11.0, "type": "float"}
}

# 2. The Transformation Function
def transform_lab_data(raw_records):
    print("⚙️ Transform Layer: Processing raw pipeline batch via Python...")
    cleaned_and_enriched_data = []

    for record in raw_records:
        # A. Data Cleaning: Standardize marker strings to uniform UPPERCASE and strip whitespace
        standardized_marker = record["marker"].upper().strip()

        # B. Data Quality Validation: Drop corrupted records missing results
        # In Python, we check for 'None' instead of 'null'
        if record["resultValue"] is None:
            print(f"⚠️ Data Quality Alert: Dropped corrupted record for Patient {record['patientId']} (Reason: Missing resultValue)")
            continue  # 'continue' skips to the next iteration of the loop (filtering the data)

        # C. Data Type Conversion: Parse strings into real floats
        numeric_result = float(record["resultValue"])

        # D. Data Enrichment: Cross-reference with our reference range dictionary
        # dict.get() safely retrieves a key without crashing if the biomarker doesn't exist
        range_info = medical_reference_ranges.get(standardized_marker)
        interpretation = "NORMAL"

        if range_info:
            if numeric_result < range_info["min"]:
                interpretation = "LOW"
            elif numeric_result > range_info["max"]:
                interpretation = "HIGH"
        else:
            interpretation = "UNKNOWN_MARKER"

        # E. Schema Mapping: Append structured and flag-enriched dictionary
        cleaned_and_enriched_data.append({
            "patient_id": record["patientId"],
            "test_date": record["testDate"],
            "biomarker": standardized_marker,
            "observed_value": numeric_result,
            "measurement_unit": record["unit"],
            "range_min": range_info["min"] if range_info else None,
            "range_max": range_info["max"] if range_info else None,
            "status_flag": interpretation
        })

    return cleaned_and_enriched_data

# Execute the Transformation Step
clean_warehouse_data = transform_lab_data(raw_lab_dump)

# Let's print out the cleaned records to inspect them
print("\n📊 STAGE 2 TRANSFORMATION COMPLETE. Preview of clean dataset:")
for record in clean_warehouse_data:
    print(record)