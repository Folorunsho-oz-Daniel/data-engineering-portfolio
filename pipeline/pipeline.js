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
