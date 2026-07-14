// STAGE 1: RAW DATA INGESTION (EXTRACT)
// Simulating a raw data dump from a hospital lab analyzer machine.
// Notice the inconsistencies: missing data, varied strings, and out-of-bounds metrics.

const rawLabDump = [
    { patientId: "PT-0921", testDate: "2026-07-10", marker: "HEMOGLOBIN", resultValue: "11.2", unit: "g/dL" },
    { patientId: "PT-1442", testDate: "11/07/2026", marker: "platelets", resultValue: "250", unit: "x10^9/L" },
    { patientId: "PT-0921", testDate: "2026-07-10", marker: "WHITE_BLOOD_CELLS", resultValue: "14.8", unit: "thousand/uL" },
    { patientId: "PT-3301", testDate: "2026-07-12", marker: "Hemoglobin", resultValue: null, unit: "g/dL" }, // Corrupted Data Example
    { patientId: "PT-5521", testDate: "2026-07-13", marker: "PLATELETS", resultValue: "85", unit: "x10^9/L" }
];

console.log("🚀 Extraction Layer: Successfully ingested " + rawLabDump.length + " raw records.");

// ==========================================
// STAGE 2: DATA TRANSFORMATION & ENRICHMENT
// ==========================================

// 1. Data Schema / Reference Ranges (Our Master Truth Table)
const medicalReferenceRanges = {
    "HEMOGLOBIN":        { min: 12.0, max: 17.5, type: "float" },
    "PLATELETS":         { min: 150.0, max: 400.0, type: "int" },
    "WHITE_BLOOD_CELLS": { min: 4.0, max: 11.0, type: "float" }
};

// 2. The Transformation Function
function transformLabData(rawDataArray) {
    console.log("⚙️ Transform Layer: Processing raw pipeline batch...");
    const cleanedAndEnrichedData = [];

    rawDataArray.forEach((record) => {
        // A. Data Cleaning: Standardize marker strings to uniform UPPERCASE
        const standardizedMarker = record.marker.toUpperCase().trim();

        // B. Data Quality Validation: Drop corrupted records missing results
        if (record.resultValue === null || record.resultValue === undefined) {
            console.warn(`⚠️ Data Quality Alert: Dropped corrupted record for Patient ${record.patientId} (Reason: Missing resultValue)`);
            return; // Skip this record completely (Filter/Drop step)
        }

        // C. Data Type Conversion: Parse strings into real computational numbers
        const numericResult = parseFloat(record.resultValue);

        // D. Data Enrichment: Cross-reference with our reference range schema
        const range = medicalReferenceRanges[standardizedMarker];
        let interpretation = "NORMAL";

        if (range) {
            if (numericResult < range.min) {
                interpretation = "LOW";
            } else if (numericResult > range.max) {
                interpretation = "HIGH";
            }
        } else {
            interpretation = "UNKNOWN_MARKER";
        }

        // E. Schema Mapping: Push our structured, cleaned, and flag-enriched data forward
        cleanedAndEnrichedData.push({
            patient_id: record.patientId,
            test_date: record.testDate,
            biomarker: standardizedMarker,
            observed_value: numericResult,
            measurement_unit: record.unit,
            range_min: range ? range.min : null,
            range_max: range ? range.max : null,
            status_flag: interpretation
        });
    });

    return cleanedAndEnrichedData;
}

// Execute the Transformation Step
const cleanWarehouseData = transformLabData(rawLabDump);

console.log("📊 STAGE 3: LOAD LAYER (Structured Data Preview):");
console.table(cleanWarehouseData);
function loadAndAggregateData(processedData) {
    console.log("💾 Load Layer: Initializing data aggregation and warehouse load...");

    // We will build a compressed database summary object to track pipeline performance
    const warehouseSummary = {
        totalRecordsLoaded: processedData.length,
        criticalAlertsFlagged: 0,
        normalRecordsLoaded: 0,
        loadTimestamp: new Date().toISOString()
    };

    // Aggregate statistics across the batch dataset
    processedData.forEach(record => {
        if (record.status_flag === "LOW" || record.status_flag === "HIGH") {
            warehouseSummary.criticalAlertsFlagged++;
        } else if (record.status_flag === "NORMAL") {
            warehouseSummary.normalRecordsLoaded++;
        }
    });

    console.log("✅ Data Warehouse Load Complete! Production metrics saved.");
    return warehouseSummary;
}

// Execute the final stage
const pipelineReport = loadAndAggregateData(cleanWarehouseData);
console.log("📌 PIPELINE OPERATIONS METRICS REPORT:");
console.dir(pipelineReport);